import {documents,
    type PortfolioDocument,
} from "./documents";

import {keywordSearchWithScores,
    DEFAULT_MIN_KEYWORD_SCORE,
    type KeywordSearchResult,
} from "./semanticSearch";

import {vectorSearchWithScores,
    DEFAULT_MIN_VECTOR_SIMILARITY,
    type VectorSearchResult,
} from "./vectorSearch";

const KEYWORD_WEIGHT = 0.45;
const VECTOR_WEIGHT = 0.55;

const DEFAULT_MAX_HYBRID_RESULTS = 5;
const MIN_STRONG_VECTOR_SCORE = 0.42;

export type HybridSearchResult = {
    document: PortfolioDocument;

    keywordScore: number;
    normalizedKeywordScore: number;

    vectorScore: number;
    normalizedVectorScore: number;

    hybridScore: number;
};

/*
 * Combines existing keyword and vector results.
 *
 * This is separate from hybridSearchWithScores so
 * Sprint 25 can evaluate all retrieval modes without
 * generating the same question embedding twice.
 */
export function combineHybridResults(
    question: string,
    keywordResults: KeywordSearchResult[],
    vectorResults: VectorSearchResult[],
    maxResults = DEFAULT_MAX_HYBRID_RESULTS
): HybridSearchResult[] {

    const normalizedQuestion = question.toLowerCase();

    const asksAboutProjects =
        /\bprojects?\b/.test(normalizedQuestion);

    const keywordScoreMap = new Map(
        keywordResults.map(({ document, score }) => [
            document.id,
            score,
        ])
    );

    const vectorScoreMap = new Map(
        vectorResults.map(({ document, score }) => [
            document.id,
            score,
        ])
    );

    const highestKeywordScore = Math.max(
        0,
        ...keywordResults.map(({ score }) => score)
    );

    /*
     * Do not amplify weak keyword matches.
     *
     * For example, if the highest keyword score is only 2,
     * dividing by 2 would incorrectly turn that weak signal
     * into a normalized score of 1.
     */
    const hasMeaningfulKeywordSignal =
        highestKeywordScore >=
        DEFAULT_MIN_KEYWORD_SCORE;

    const combinedResults = documents
        .map((document) => {
            const keywordScore =
                keywordScoreMap.get(document.id) ?? 0;

            const vectorScore =
                vectorScoreMap.get(document.id) ?? 0;

            const normalizedKeywordScore =
                hasMeaningfulKeywordSignal &&
                highestKeywordScore > 0
                    ? keywordScore /
                      highestKeywordScore
                    : 0;

            const normalizedVectorScore =
                clampScore(vectorScore);

            const hybridScore =
                normalizedKeywordScore *
                    KEYWORD_WEIGHT +
                normalizedVectorScore *
                    VECTOR_WEIGHT;

            return {
                document,
                keywordScore,
                normalizedKeywordScore,
                vectorScore,
                normalizedVectorScore,
                hybridScore,
            };
        })
        /*
         * A document must have meaningful evidence from at
         * least one retrieval method.
         */
        .filter(
            ({ keywordScore, vectorScore }) =>
                keywordScore >=
                    DEFAULT_MIN_KEYWORD_SCORE ||
                vectorScore >=
                    DEFAULT_MIN_VECTOR_SIMILARITY
        )
        .filter(({ document }) => {
                if (asksAboutProjects) {
                    return true;
                }

                return (
                    document.id.toLowerCase() !== "projects" &&
                    document.title.toLowerCase() !== "projects"
                );
            })
        .sort((a, b) => {
            if (b.hybridScore !== a.hybridScore) {
                return b.hybridScore - a.hybridScore;
            }

            return b.vectorScore - a.vectorScore;
        })
        .slice(0, maxResults);

    return combinedResults;
}

export async function hybridSearchWithScores(
    question: string
): Promise<HybridSearchResult[]> {
    const normalizedQuestion = question.trim();

    if (!normalizedQuestion) {
        return [];
    }

    /*
     * Retrieve every document score before combining.
     */
    const keywordResults =
        keywordSearchWithScores(
            normalizedQuestion,
            {
                minScore: 0,
                maxResults: documents.length,
            }
        );

    const vectorResults =
        await vectorSearchWithScores(
            normalizedQuestion,
            {
                minSimilarity: -1,
                maxResults: documents.length,
            }
        );
    const highestKeywordScore =
        keywordResults[0]?.score ?? 0;

    const highestVectorScore =
        vectorResults[0]?.score ?? 0;

    const hasMeaningfulKeywordSignal =
        highestKeywordScore >=
        DEFAULT_MIN_KEYWORD_SCORE;

    const hasMeaningfulVectorSignal =
        highestVectorScore >=
        MIN_STRONG_VECTOR_SCORE;

    /*
     * Reject questions that have neither a meaningful
     * keyword match nor a sufficiently strong semantic match.
     */
    if (
        !hasMeaningfulKeywordSignal &&
        !hasMeaningfulVectorSignal
    ) {
        console.info(
            "Hybrid search rejected an out-of-domain query:",
            {
                question: normalizedQuestion,
                highestKeywordScore,
                highestVectorScore,
            }
        );

        return [];
    }
    const hybridResults = combineHybridResults(
        normalizedQuestion,
        keywordResults,
        vectorResults
    );
if (process.env.NODE_ENV === "development") {
    console.table(
        hybridResults.map((result) => ({
            title: result.document.title,

            keyword: Number(
                result.normalizedKeywordScore.toFixed(4)
            ),

            vector: Number(
                result.normalizedVectorScore.toFixed(4)
            ),

            hybrid: Number(
                result.hybridScore.toFixed(4)
            ),
        }))
    );
}

    return hybridResults;
}

export async function hybridSearch(
    question: string
): Promise<PortfolioDocument[]> {
    const results =
        await hybridSearchWithScores(question);

    return results.map(({ document }) => document);
}

function clampScore(score: number): number {
    return Math.max(0, Math.min(1, score));
}