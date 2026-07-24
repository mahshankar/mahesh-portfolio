import { documents } from "./documents";

import {
    evaluationQuestions,
    type RetrievalEvaluationCase,
} from "./evaluationQuestions";

import {
    keywordSearchWithScores,
    DEFAULT_MIN_KEYWORD_SCORE,
} from "./semanticSearch";

import {
    vectorSearchWithScores,
    DEFAULT_MIN_VECTOR_SIMILARITY,
} from "./vectorSearch";

import {
    combineHybridResults,
    hasSufficientHybridEvidence,
} from "./hybridSearch";

const MAX_EVALUATION_RESULTS = 5;

export type RetrievalMode =
    | "keyword"
    | "vector"
    | "hybrid";

export type RankingEvaluation = {
    resultTitles: string[];

    /*
     * Did the ideal primary document rank first?
     */
    strictTop1Hit: boolean;

    /*
     * Did the ideal primary document appear in Top 3?
     */
    primaryTop3Hit: boolean;

    /*
     * Did any relevant document appear in Top 3?
     */
    top3RelevantHit: boolean;

    /*
     * Position of the primary expected document.
     */
    primaryRank: number | null;

    /*
     * Reciprocal rank of the primary document.
     */
    primaryReciprocalRank: number;

    /*
     * Percentage of expected relevant documents
     * found within Top 3.
     */
    coverageAt3: number;

    correctRejection: boolean;
    passed: boolean;
};

export type EvaluationCaseResult = {
    id: string;
    category: string;
    question: string;

    primaryExpectedTitle?: string;
    relevantTitles: string[];
    expectNoResults: boolean;

    keyword: RankingEvaluation;
    vector: RankingEvaluation;
    hybrid: RankingEvaluation;
};

export type RetrievalModeSummary = {
    mode: RetrievalMode;

    inDomainCases: number;
    outOfDomainCases: number;

    strictTop1Accuracy: number;
    primaryTop3Accuracy: number;
    top3RelevantAccuracy: number;

    meanPrimaryReciprocalRank: number;
    averageCoverageAt3: number;
    rejectionAccuracy: number;

    passedCases: number;
    totalCases: number;
};

export type RetrievalEvaluationReport = {
    cases: EvaluationCaseResult[];
    summaries: RetrievalModeSummary[];
    processingTimeMs: number;
};

export async function runRetrievalEvaluation():
    Promise<RetrievalEvaluationReport> {
    const startTime = performance.now();

    const caseResults:
        EvaluationCaseResult[] = [];

    /*
     * Run sequentially to avoid sending many simultaneous
     * requests through the local embedding model.
     */
    for (const evaluationCase of evaluationQuestions) {
        const keywordAll =
            keywordSearchWithScores(
                evaluationCase.question,
                {
                    minScore: 0,
                    maxResults: documents.length,
                    debug: false,
                }
            );

        const vectorAll =
            await vectorSearchWithScores(
                evaluationCase.question,
                {
                    minSimilarity: -1,
                    maxResults: documents.length,
                    debug: false,
                }
            );

        /*
         * Apply normal keyword retrieval thresholds.
         */
        const keywordResults = keywordAll
            .filter(
                ({ score }) =>
                    score >=
                    DEFAULT_MIN_KEYWORD_SCORE
            )
            .slice(0, MAX_EVALUATION_RESULTS);

        /*
         * Apply normal vector retrieval thresholds.
         */
        const vectorResults = vectorAll
            .filter(
                ({ score }) =>
                    score >=
                    DEFAULT_MIN_VECTOR_SIMILARITY
            )
            .slice(0, MAX_EVALUATION_RESULTS);

        /*
         * Reuse existing keyword and vector scores so the
         * question does not need to be embedded again.
         */
        const hybridResults =
            hasSufficientHybridEvidence(
                keywordAll,
                vectorAll
            )
                ? combineHybridResults(
                      evaluationCase.question,
                      keywordAll,
                      vectorAll,
                      MAX_EVALUATION_RESULTS
                  )
                : [];

        caseResults.push({
            id: evaluationCase.id,
            category: evaluationCase.category,
            question: evaluationCase.question,

            primaryExpectedTitle:
                evaluationCase.primaryExpectedTitle,

            relevantTitles:
                evaluationCase.relevantTitles,

            expectNoResults:
                evaluationCase.expectNoResults ??
                false,

            keyword: evaluateRanking(
                keywordResults.map(
                    ({ document }) =>
                        document.title
                ),
                evaluationCase
            ),

            vector: evaluateRanking(
                vectorResults.map(
                    ({ document }) =>
                        document.title
                ),
                evaluationCase
            ),

            hybrid: evaluateRanking(
                hybridResults.map(
                    ({ document }) =>
                        document.title
                ),
                evaluationCase
            ),
        });
    }

    const summaries: RetrievalModeSummary[] = [
        summarizeMode("keyword", caseResults),
        summarizeMode("vector", caseResults),
        summarizeMode("hybrid", caseResults),
    ];

    const processingTimeMs =
        performance.now() - startTime;

    printEvaluationReport(
        caseResults,
        summaries,
        processingTimeMs
    );

    return {
        cases: caseResults,
        summaries,
        processingTimeMs,
    };
}

function evaluateRanking(
    resultTitles: string[],
    evaluationCase: RetrievalEvaluationCase
): RankingEvaluation {
    const expectNoResults =
        evaluationCase.expectNoResults ?? false;

    /*
     * Out-of-domain evaluation.
     */
    if (expectNoResults) {
        const correctRejection =
            resultTitles.length === 0;

        return {
            resultTitles,
            strictTop1Hit: false,
            primaryTop3Hit: false,
            top3RelevantHit: false,
            primaryRank: null,
            primaryReciprocalRank: 0,
            coverageAt3: 0,
            correctRejection,
            passed: correctRejection,
        };
    }

    const primaryExpectedTitle =
        evaluationCase.primaryExpectedTitle;

    if (!primaryExpectedTitle) {
        throw new Error(
            `Evaluation case "${evaluationCase.id}" is missing primaryExpectedTitle.`
        );
    }

    /*
     * Ensure the primary document is also considered
     * part of the relevant-document set.
     */
    const relevantTitles = new Set([
        primaryExpectedTitle,
        ...evaluationCase.relevantTitles,
    ]);

    const primaryIndex =
        resultTitles.indexOf(
            primaryExpectedTitle
        );

    const primaryRank =
        primaryIndex >= 0
            ? primaryIndex + 1
            : null;

    const strictTop1Hit =
        resultTitles[0] ===
        primaryExpectedTitle;

    const primaryTop3Hit =
        primaryRank !== null &&
        primaryRank <= 3;

    const top3Titles =
        resultTitles.slice(0, 3);

    const relevantTop3Titles =
        new Set(
            top3Titles.filter((title) =>
                relevantTitles.has(title)
            )
        );

    const top3RelevantHit =
        relevantTop3Titles.size > 0;

    const maximumPossibleCoverage =
        Math.min(
            relevantTitles.size,
            3
        );

    const coverageAt3 =
        maximumPossibleCoverage > 0
            ? relevantTop3Titles.size /
              maximumPossibleCoverage
            : 0;

    const primaryReciprocalRank =
        primaryRank
            ? 1 / primaryRank
            : 0;

    return {
        resultTitles,
        strictTop1Hit,
        primaryTop3Hit,
        top3RelevantHit,
        primaryRank,
        primaryReciprocalRank,
        coverageAt3,
        correctRejection: false,

        /*
         * Sprint 25.1 uses strict Top-1 as the pass
         * requirement for an in-domain case.
         */
        passed: strictTop1Hit,
    };
}

function summarizeMode(
    mode: RetrievalMode,
    caseResults: EvaluationCaseResult[]
): RetrievalModeSummary {
    const inDomainCases =
        caseResults.filter(
            (result) => !result.expectNoResults
        );

    const outOfDomainCases =
        caseResults.filter(
            (result) => result.expectNoResults
        );

    const inDomainModeResults =
        inDomainCases.map(
            (result) => result[mode]
        );

    const outOfDomainModeResults =
        outOfDomainCases.map(
            (result) => result[mode]
        );

    const strictTop1Accuracy =
        calculateAverage(
            inDomainModeResults.map(
                (result) =>
                    result.strictTop1Hit
                        ? 1
                        : 0
            )
        );

    const primaryTop3Accuracy =
        calculateAverage(
            inDomainModeResults.map(
                (result) =>
                    result.primaryTop3Hit
                        ? 1
                        : 0
            )
        );

    const top3RelevantAccuracy =
        calculateAverage(
            inDomainModeResults.map(
                (result) =>
                    result.top3RelevantHit
                        ? 1
                        : 0
            )
        );

    const meanPrimaryReciprocalRank =
        calculateAverage(
            inDomainModeResults.map(
                (result) =>
                    result.primaryReciprocalRank
            )
        );

    const averageCoverageAt3 =
        calculateAverage(
            inDomainModeResults.map(
                (result) =>
                    result.coverageAt3
            )
        );

    const rejectionAccuracy =
        calculateAverage(
            outOfDomainModeResults.map(
                (result) =>
                    result.correctRejection
                        ? 1
                        : 0
            )
        );

    const allModeResults =
        caseResults.map(
            (result) => result[mode]
        );

    return {
        mode,
        inDomainCases: inDomainCases.length,
        outOfDomainCases:
            outOfDomainCases.length,

        strictTop1Accuracy,
        primaryTop3Accuracy,
        top3RelevantAccuracy,

        meanPrimaryReciprocalRank,
        averageCoverageAt3,
        rejectionAccuracy,

        passedCases:
            allModeResults.filter(
                (result) => result.passed
            ).length,

        totalCases: caseResults.length,
    };
}

function calculateAverage(
    values: number[]
): number {
    if (values.length === 0) {
        return 0;
    }

    return (
        values.reduce(
            (sum, value) => sum + value,
            0
        ) / values.length
    );
}

function printEvaluationReport(
    cases: EvaluationCaseResult[],
    summaries: RetrievalModeSummary[],
    processingTimeMs: number
): void {
    console.group(
        "Sprint 25.1 — Strict Retrieval Evaluation"
    );

    console.table(
        cases.map((result) => ({
            test: result.id,

            primary:
                result.expectNoResults
                    ? "NO RESULTS"
                    : result.primaryExpectedTitle,

            keywordTop1:
                result.keyword.resultTitles[0] ??
                "NO RESULT",

            keywordPrimaryRank:
                result.keyword.primaryRank ??
                "-",

            keywordStrictPass:
                result.keyword.passed,

            vectorTop1:
                result.vector.resultTitles[0] ??
                "NO RESULT",

            vectorPrimaryRank:
                result.vector.primaryRank ??
                "-",

            vectorStrictPass:
                result.vector.passed,

            hybridTop1:
                result.hybrid.resultTitles[0] ??
                "NO RESULT",

            hybridPrimaryRank:
                result.hybrid.primaryRank ??
                "-",

            hybridStrictPass:
                result.hybrid.passed,
        }))
    );

    console.table(
        summaries.map((summary) => ({
            mode: summary.mode,

            strictTop1:
                formatPercentage(
                    summary.strictTop1Accuracy
                ),

            primaryTop3:
                formatPercentage(
                    summary.primaryTop3Accuracy
                ),

            anyRelevantTop3:
                formatPercentage(
                    summary.top3RelevantAccuracy
                ),

            primaryMRR:
                summary
                    .meanPrimaryReciprocalRank
                    .toFixed(3),

            coverageAt3:
                formatPercentage(
                    summary.averageCoverageAt3
                ),

            rejection:
                formatPercentage(
                    summary.rejectionAccuracy
                ),

            strictPass:
                `${summary.passedCases}/${summary.totalCases}`,
        }))
    );

    console.log(
        "Evaluation processing time:",
        `${processingTimeMs.toFixed(0)} ms`
    );

    console.groupEnd();
}

function formatPercentage(
    value: number
): string {
    return `${(value * 100).toFixed(1)}%`;
}