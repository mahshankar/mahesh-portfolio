import {
    documents,
    type PortfolioDocument,
} from "./documents";

import { generateEmbedding } from "./embeddingModel";

export type EmbeddedPortfolioDocument = {
    document: PortfolioDocument;
    embedding: number[];
};

/*
 * Cache the promise so document embeddings are generated
 * only once during the browser session.
 */
let documentEmbeddingsPromise:
    | Promise<EmbeddedPortfolioDocument[]>
    | null = null;

/*
 * Combines the document metadata and content into one
 * meaningful text representation for embedding.
 */
function buildEmbeddingText(
    document: PortfolioDocument
): string {
    return [
        `Title: ${document.title}`,
        `Tags: ${document.tags.join(", ")}`,
        `Content: ${document.content}`,
    ].join("\n");
}

async function createDocumentEmbeddings():
    Promise<EmbeddedPortfolioDocument[]> {
    console.log(
        `Generating embeddings for ${documents.length} portfolio documents...`
    );

    const embeddedDocuments:
        EmbeddedPortfolioDocument[] = [];

    /*
     * Generate sequentially to avoid running many model
     * requests concurrently in the browser.
     */
    for (const document of documents) {
        const embeddingText =
            buildEmbeddingText(document);

        const embedding =
            await generateEmbedding(embeddingText);

        embeddedDocuments.push({
            document,
            embedding,
        });

        console.log(
            `Embedded: ${document.title}`,
            `Dimensions: ${embedding.length}`
        );
    }

    console.log(
        "Portfolio document embeddings generated successfully."
    );

    return embeddedDocuments;
}

export function getDocumentEmbeddings():
    Promise<EmbeddedPortfolioDocument[]> {
    if (!documentEmbeddingsPromise) {
        documentEmbeddingsPromise =
            createDocumentEmbeddings().catch((error) => {
                /*
                 * Reset the cache after failure so the application
                 * can retry on the next request.
                 */
                documentEmbeddingsPromise = null;
                throw error;
            });
    }

    return documentEmbeddingsPromise;
}