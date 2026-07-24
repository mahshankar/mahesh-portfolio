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
    top1Hit: boolean;
    top3Hit: boolean;
    firstRelevantRank: number | null;
    reciprocalRank: number;
    coverageAt3: number;
    correctRejection: boolean;
    passed: boolean;
};

export type EvaluationCaseResult = {
    id: string;
    category: string;
    question: string;
    expectedTitles: string[];
    expectNoResults: boolean;

    keyword: RankingEvaluation;
    vector: RankingEvaluation;
    hybrid: RankingEvaluation;
};

export type RetrievalModeSummary = {
    mode: RetrievalMode;
    inDomainCases: number;
    outOfDomainCases: number;
    top1Accuracy: number;
    top3Accuracy: number;
    meanReciprocalRank: number;
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
     * Run sequentially so the local transformer model
     * does not process many embedding requests at once.
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
         * Apply the same thresholds used by the normal
         * keyword and vector search modes.
         */
        const keywordResults = keywordAll
            .filter(
                ({ score }) =>
                    score >=
                    DEFAULT_MIN_KEYWORD_SCORE
            )
            .slice(0, MAX_EVALUATION_RESULTS);

        const vectorResults = vectorAll
            .filter(
                ({ score }) =>
                    score >=
                    DEFAULT_MIN_VECTOR_SIMILARITY
            )
            .slice(0, MAX_EVALUATION_RESULTS);

        /*
         * Reuse the already generated keyword and vector
         * scores rather than embedding this question again.
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
            expectedTitles:
                evaluationCase.expectedTitles,
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

    if (expectNoResults) {
        const correctRejection =
            resultTitles.length === 0;

        return {
            resultTitles,
            top1Hit: false,
            top3Hit: false,
            firstRelevantRank: null,
            reciprocalRank: 0,
            coverageAt3: 0,
            correctRejection,
            passed: correctRejection,
        };
    }

    const expectedTitles = new Set(
        evaluationCase.expectedTitles
    );

    const firstRelevantIndex =
        resultTitles.findIndex((title) =>
            expectedTitles.has(title)
        );

    const firstRelevantRank =
        firstRelevantIndex >= 0
            ? firstRelevantIndex + 1
            : null;

    const top1Title = resultTitles[0];

    const top1Hit =
        Boolean(top1Title) &&
        expectedTitles.has(top1Title);

    const top3Titles =
        resultTitles.slice(0, 3);

    const relevantTop3Titles =
        new Set(
            top3Titles.filter((title) =>
                expectedTitles.has(title)
            )
        );

    const top3Hit =
        relevantTop3Titles.size > 0;

    const maximumPossibleCoverage =
        Math.min(
            evaluationCase.expectedTitles.length,
            3
        );

    const coverageAt3 =
        maximumPossibleCoverage > 0
            ? relevantTop3Titles.size /
              maximumPossibleCoverage
            : 0;

    const reciprocalRank =
        firstRelevantRank
            ? 1 / firstRelevantRank
            : 0;

    return {
        resultTitles,
        top1Hit,
        top3Hit,
        firstRelevantRank,
        reciprocalRank,
        coverageAt3,
        correctRejection: false,

        /*
         * For an in-domain question, the case passes when
         * a relevant document appears in the Top 3.
         */
        passed: top3Hit,
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

    const modeResults =
        inDomainCases.map(
            (result) => result[mode]
        );

    const outOfDomainModeResults =
        outOfDomainCases.map(
            (result) => result[mode]
        );

    const top1Accuracy =
        calculateAverage(
            modeResults.map((result) =>
                result.top1Hit ? 1 : 0
            )
        );

    const top3Accuracy =
        calculateAverage(
            modeResults.map((result) =>
                result.top3Hit ? 1 : 0
            )
        );

    const meanReciprocalRank =
        calculateAverage(
            modeResults.map(
                (result) =>
                    result.reciprocalRank
            )
        );

    const averageCoverageAt3 =
        calculateAverage(
            modeResults.map(
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
        top1Accuracy,
        top3Accuracy,
        meanReciprocalRank,
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
        "Sprint 25 — Retrieval Evaluation"
    );

    console.table(
        cases.map((result) => ({
            test: result.id,
            expected:
                result.expectNoResults
                    ? "NO RESULTS"
                    : result.expectedTitles.join(
                          " | "
                      ),

            keywordTop3:
                result.keyword.resultTitles
                    .slice(0, 3)
                    .join(" | "),
            keywordPass:
                result.keyword.passed,

            vectorTop3:
                result.vector.resultTitles
                    .slice(0, 3)
                    .join(" | "),
            vectorPass:
                result.vector.passed,

            hybridTop3:
                result.hybrid.resultTitles
                    .slice(0, 3)
                    .join(" | "),
            hybridPass:
                result.hybrid.passed,
        }))
    );

    console.table(
        summaries.map((summary) => ({
            mode: summary.mode,
            top1Accuracy:
                formatPercentage(
                    summary.top1Accuracy
                ),
            top3Accuracy:
                formatPercentage(
                    summary.top3Accuracy
                ),
            MRR:
                summary.meanReciprocalRank.toFixed(
                    3
                ),
            coverageAt3:
                formatPercentage(
                    summary.averageCoverageAt3
                ),
            rejectionAccuracy:
                formatPercentage(
                    summary.rejectionAccuracy
                ),
            passed:
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