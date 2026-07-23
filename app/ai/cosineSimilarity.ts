export function calculateCosineSimilarity(
    vectorA: number[],
    vectorB: number[]
): number {
    if (vectorA.length === 0 || vectorB.length === 0) {
        throw new Error(
            "Cosine similarity requires non-empty vectors."
        );
    }

    if (vectorA.length !== vectorB.length) {
        throw new Error(
            `Vector dimensions must match. Received ${vectorA.length} and ${vectorB.length}.`
        );
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let index = 0; index < vectorA.length; index++) {
        const valueA = vectorA[index];
        const valueB = vectorB[index];

        dotProduct += valueA * valueB;
        magnitudeA += valueA * valueA;
        magnitudeB += valueB * valueB;
    }

    const denominator =
        Math.sqrt(magnitudeA) *
        Math.sqrt(magnitudeB);

    if (denominator === 0) {
        return 0;
    }

    const similarity = dotProduct / denominator;

    // Protect against tiny floating-point errors.
    return Math.max(-1, Math.min(1, similarity));
}