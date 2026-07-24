import { normalizeForMatching } from "./companyMetadata";

const GENERIC_QUERY_WORDS = new Set([
    "a",
    "an",
    "and",
    "about",
    "at",
    "describe",
    "did",
    "do",
    "does",
    "explain",
    "experience",
    "experiences",
    "for",
    "had",
    "has",
    "have",
    "his",
    "how",
    "in",
    "mahesh",
    "me",
    "of",
    "on",
    "please",
    "s",
    "tell",
    "the",
    "to",
    "use",
    "used",
    "using",
    "what",
    "which",
    "with",
    "work",
    "worked",
    "working",
]);

/**
 * Removes conversational framing while retaining the
 * meaningful technology, company, and domain concepts.
 */
export function buildEmbeddingQuery(
    question: string
): string {
    const normalizedQuestion =
        normalizeForMatching(question);

    const meaningfulWords = normalizedQuestion
        .split(" ")
        .filter(
            (word) =>
                word.length >= 2 &&
                !GENERIC_QUERY_WORDS.has(word)
        );

    const semanticQuery = meaningfulWords.join(" ");

    // Use the original normalized text only when every
    // word was removed.
    return semanticQuery || normalizedQuestion;
}