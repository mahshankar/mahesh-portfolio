import { PortfolioDocument } from "./documents";

export function calculateSimilarity(
    question: string,
    document: PortfolioDocument
): number {

    const stopWords = [
        "what",
        "has",
        "have",
        "does",
        "do",
        "tell",
        "about",
        "worked",
        "experience",
        "mahesh"
    ];

    const questionWords = question
        .toLowerCase()
        .split(/\W+/)
        .filter(
            word =>
                word.length >= 2 &&
                !stopWords.includes(word)
        );

    let score = 0;

    for (const word of questionWords) {

        // Strong signal
        if (document.title.toLowerCase().includes(word)) {
            score += 20;
        }

        // Strong signal
        if (
            document.tags.some(tag =>
                tag.toLowerCase().includes(word)
            )
        ) {
            score += 15;
        }

        // Weak signal
        if (
            document.content.toLowerCase().includes(word)
        ) {
            score += 2;
        }
        console.log(
            "Searching:",
            questionWords,
            "Document:",
            document.title,
            "Score:",
            score
        );
    }

    return score;
}