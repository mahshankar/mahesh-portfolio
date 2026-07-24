import type { PortfolioDocument } from "./documents";

import { generateEmbedding } from "./embeddingModel";

import {
    getDocumentEmbeddings,
} from "./documentEmbeddingStore";

import {
    calculateCosineSimilarity,
} from "./cosineSimilarity";

import {buildEmbeddingQuery} from "./queryPreprocessor";

export const DEFAULT_MIN_VECTOR_SIMILARITY = 0.3;
export const DEFAULT_MAX_VECTOR_RESULTS = 5;

export type VectorSearchResult = {
    document: PortfolioDocument;
    score: number;
};

export type VectorSearchOptions = {
    minSimilarity?: number;
    maxResults?: number;
};

export async function vectorSearchWithScores(
    question: string,
    options: VectorSearchOptions = {}
): Promise<VectorSearchResult[]> {
    const normalizedQuestion = question.trim();

    if (!normalizedQuestion) {
        return [];
    }

    const minSimilarity =
        options.minSimilarity ??
        DEFAULT_MIN_VECTOR_SIMILARITY;

    const maxResults =
        options.maxResults ??
        DEFAULT_MAX_VECTOR_RESULTS;

  const embeddingQuery =
      buildEmbeddingQuery(normalizedQuestion);

  console.log(
      "Embedding query:",
      embeddingQuery
  );

  const questionEmbedding =
      await generateEmbedding(embeddingQuery);

    const embeddedDocuments =
        await getDocumentEmbeddings();

    const rankedDocuments = embeddedDocuments
        .map(({ document, embedding }) => ({
            document,
            score: calculateCosineSimilarity(
                questionEmbedding,
                embedding
            ),
        }))
        .sort((a, b) => b.score - a.score);


        if (process.env.NODE_ENV === "development") {
            console.table(
                rankedDocuments.map(({ document, score }) => ({
                    title: document.title,
                    vectorScore: Number(score.toFixed(4)),
                }))
            );
        }
    return rankedDocuments
        .filter(
            ({ score }) =>
                score >= minSimilarity
        )
        .slice(0, maxResults);
}

export async function vectorSearch(
    question: string
): Promise<PortfolioDocument[]> {
    const results =
        await vectorSearchWithScores(question);

    return results.map(({ document }) => document);
}