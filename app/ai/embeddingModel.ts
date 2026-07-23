const EMBEDDING_MODEL =
    "Xenova/all-MiniLM-L6-v2";

/*
 * Importing Transformers.js dynamically prevents the model
 * library from being loaded with the initial page bundle.
 */
async function createEmbeddingPipeline() {
    const { pipeline } = await import(
        "@huggingface/transformers"
    );

    console.log(
        `Loading embedding model: ${EMBEDDING_MODEL}`
    );

    return pipeline(
        "feature-extraction",
        EMBEDDING_MODEL
    );
}

/*
 * Store the pipeline promise at module level.
 *
 * This ensures that the model is initialized once and reused
 * instead of being downloaded and loaded for every question.
 */
let embeddingPipelinePromise:
    | ReturnType<typeof createEmbeddingPipeline>
    | null = null;

async function getEmbeddingPipeline() {
    if (!embeddingPipelinePromise) {
        embeddingPipelinePromise =
            createEmbeddingPipeline();
    }

    return embeddingPipelinePromise;
}

/*
 * Converts one text value into one normalized embedding vector.
 */
export async function generateEmbedding(
    text: string
): Promise<number[]> {
    const normalizedText = text.trim();

    if (!normalizedText) {
        throw new Error(
            "Cannot generate an embedding for empty text."
        );
    }

    const extractor =
        await getEmbeddingPipeline();

    /*
     * Pass an array containing one string.
     *
     * This guarantees that tolist() returns:
     * number[][]
     *
     * [
     *   [0.01, -0.02, ...384 values]
     * ]
     */
    const output = await extractor(
        [normalizedText],
        {
            pooling: "mean",
            normalize: true,
        }
    );

    const vectors =
        output.tolist() as number[][];

    const embedding = vectors[0];

    if (!embedding || embedding.length === 0) {
        throw new Error(
            "The embedding model returned an empty vector."
        );
    }

    const containsInvalidValue =
        embedding.some(
            (value) => !Number.isFinite(value)
        );

    if (containsInvalidValue) {
        throw new Error(
            "The embedding contains an invalid numeric value."
        );
    }

    return embedding;
}

export function getEmbeddingModelName(): string {
    return EMBEDDING_MODEL;
}