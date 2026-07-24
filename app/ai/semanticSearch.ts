import {
    documents,
    type PortfolioDocument,
} from "./documents";

import { calculateSimilarity } from "./similarity";

export const DEFAULT_MIN_KEYWORD_SCORE = 20;
export const DEFAULT_MAX_KEYWORD_RESULTS = 5;

export type KeywordSearchResult = {
    document: PortfolioDocument;
    score: number;
};

export type KeywordSearchOptions = {
    minScore?: number;
    maxResults?: number;
};

export function keywordSearchWithScores(
    question: string,
    options: KeywordSearchOptions = {}
): KeywordSearchResult[] {
    const normalizedQuestion = question.trim();

    if (!normalizedQuestion) {
        return [];
    }

    const minScore =
        options.minScore ??
        DEFAULT_MIN_KEYWORD_SCORE;

    const maxResults =
        options.maxResults ??
        DEFAULT_MAX_KEYWORD_RESULTS;

    const rankedDocuments = documents
        .map((document) => ({
            document,
            score: calculateSimilarity(
                normalizedQuestion,
                document
            ),
        }))
        .sort((a, b) => b.score - a.score);

    console.table(
        rankedDocuments.map(({ document, score }) => ({
            title: document.title,
            keywordScore: score,
        }))
    );

    return rankedDocuments
        .filter(({ score }) => score >= minScore)
        .slice(0, maxResults);
}

/*
 * Preserve the existing function so older code
 * can continue retrieving documents without scores.
 */
export function semanticSearch(
    question: string
): PortfolioDocument[] {
    return keywordSearchWithScores(question).map(
        ({ document }) => document
    );
}