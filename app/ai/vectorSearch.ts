import type { PortfolioDocument } from "./documents";

import { generateEmbedding } from "./embeddingModel";

import {
    getDocumentEmbeddings,
} from "./documentEmbeddingStore";

import {
    calculateCosineSimilarity,
} from "./cosineSimilarity";

const MIN_VECTOR_SIMILARITY = 0.3;
const MAX_VECTOR_RESULTS = 5;

export type VectorSearchResult = {
    document: PortfolioDocument;
    score: number;
};

export async function vectorSearchWithScores(
    question: string
): Promise<VectorSearchResult[]> {
    const normalizedQuestion = question.trim();

    if (!normalizedQuestion) {
        return [];
    }

    const questionEmbedding =
        await generateEmbedding(normalizedQuestion);

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

    console.table(
        rankedDocuments.map(({ document, score }) => ({
            title: document.title,
            score: Number(score.toFixed(4)),
        }))
    );

    return rankedDocuments
        .filter(
            ({ score }) =>
                score >= MIN_VECTOR_SIMILARITY
        )
        .slice(0, MAX_VECTOR_RESULTS);
}

export async function vectorSearch(
    question: string
): Promise<PortfolioDocument[]> {
    const results =
        await vectorSearchWithScores(question);

    return results.map(
        ({ document }) => document
    );
}