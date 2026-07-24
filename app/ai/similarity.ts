import type { PortfolioDocument } from "./documents";
import {COMPANY_KEYS,detectCompanyKey,normalizeForMatching,} from "./companyMetadata";

const COMPANIES = [
    "citi",
    "deloitte",
    "verizon",
    "florida dep",
    "ohio dfs",
    "washington dshs",
    "illinois dhs",
];

const PROJECT_KEYWORDS = [
    "client",
    "project",
];

const STOP_WORDS = new Set([
    "what",
    "has",
    "have",
    "does",
    "do",
    "did",
    "tell",
    "about",
    "worked",
    "experience",
    "mahesh",
    "how",
    "using",
    "use",
    "used",
    "with",
    "the",
    "and",
    "technology",
    "technologies",
    "at",
    "in",
    "on",
    "for",
    "to",
    "of",
]);

export function calculateSimilarity(
    question: string,
    document: PortfolioDocument
): number {
    const normalizedQuestion = question.toLowerCase();
    const normalizedTitle = document.title.toLowerCase();
    const normalizedContent = document.content.toLowerCase();
    const normalizedTags = document.tags.map((tag) =>
        tag.toLowerCase()
    );

    const searchableDocument = [
        normalizedTitle,
        normalizedContent,
        ...normalizedTags,
    ].join(" ");

    const questionWords = Array.from(
        new Set(
            normalizedQuestion
                .split(/\W+/)
                .filter(
                    (word) =>
                        word.length >= 2 &&
                        !STOP_WORDS.has(word)
                )
        )
    );

    let score = 0;

    /*
     * Score individual query words.
     */
    for (const word of questionWords) {
        // Strong title match
        if (normalizedTitle.includes(word)) {
            score += 20;
        }

        // Strong tag match
        if (
            normalizedTags.some((tag) =>
                tag.includes(word)
            )
        ) {
            if (
                ["citi", "deloitte", "verizon", "project"]
                    .includes(word)
            ) {
                score += 30;
            } else {
                score += 15;
            }
        }

        // Weaker content match
        if (normalizedContent.includes(word)) {
            score += 2;
        }
    }

    /*
     * Phrase bonuses must be outside the word loop,
     * otherwise they are added repeatedly.
     */
    if (
        normalizedQuestion.includes("spring boot") &&
        searchableDocument.includes("spring boot")
    ) {
        score += 10;
    }

    /*
     * Detect whether the question requests a company.
     */
    const requestedCompany =  detectCompanyKey(normalizedQuestion);

    if (requestedCompany) {
        const matchesRequestedCompany =
            searchableDocument.includes(requestedCompany);

        const containsDifferentCompany =
            COMPANY_KEYS.some(
                (company) =>
                    company !== requestedCompany &&
                    searchableDocument.includes(company)
            );

        if (matchesRequestedCompany) {
            // Strongly reward the requested company.
            score += 100;
        } else if (containsDifferentCompany) {
            // Penalize documents about another company.
            score -= 50;
        }

        /*
         * Generic skill documents such as Kafka are not
         * penalized because they may still provide useful
         * supporting information.
         */
    }

    /*
     * Project-intent bonus, applied only once.
     */
    const isProjectQuestion =
        Boolean(requestedCompany) ||
        PROJECT_KEYWORDS.some((keyword) =>
            normalizedQuestion.includes(keyword)
        );

    if (
        isProjectQuestion &&
        document.type === "project"
    ) {
        score += 25;
    }

 /*    console.log(
        "Searching:",
        questionWords,
        "Document:",
        document.title,
        "Score:",
        score
    ); */

    return Math.max(score, 0);
}