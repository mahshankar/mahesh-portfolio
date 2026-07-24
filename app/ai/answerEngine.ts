import type { PortfolioDocument } from "./documents";
import {
    COMPANY_KEYS,
    detectCompanyLabel,
    normalizeForMatching,
} from "./companyMetadata";

const MAX_DOCUMENTS_IN_ANSWER = 3;
const MAX_TOPICS = 8;
const MAX_CONTEXT_TOPICS = 4;



const GENERIC_TOPICS = new Set([
    "project",
    "projects",
    "profile",
    "skill",
    "skills",
    "experience",
    "about mahesh",
    "mahesh",
    "about",
    "summary",
    "career",
    "enterprise",
    "banking",
]);

export function generateAIResponse(
    question: string,
    documents: PortfolioDocument[]
): string {
    if (documents.length === 0) {
        return `I couldn't find enough relevant information about "${question}" in Mahesh's portfolio.

Try asking about Java, Spring Boot, Kafka, microservices, cloud, leadership, projects, or AI engineering.`;
    }

    /*
     * Remove duplicate documents.
     */
    const deduplicatedDocuments = Array.from(
        new Map(
            documents.map((document) => [
                document.id,
                document,
            ])
        ).values()
    );

    const normalizedQuestion = question.toLowerCase();

    /*
     * Only include the generic Projects document when
     * the user explicitly asks about projects.
     */
    const asksAboutProjects =
        /\bprojects?\b/.test(normalizedQuestion);

    const specificDocuments = asksAboutProjects
        ? deduplicatedDocuments
        : deduplicatedDocuments.filter(
              (document) =>
                  document.id.toLowerCase() !== "projects" &&
                  document.title.toLowerCase() !== "projects"
          );

    const uniqueDocuments = (
        specificDocuments.length > 0
            ? specificDocuments
            : deduplicatedDocuments
    ).slice(0, MAX_DOCUMENTS_IN_ANSWER);

    const primaryDocument = uniqueDocuments[0];
    const supportingDocuments = uniqueDocuments.slice(1);

    /*
     * Generate a direct opening sentence based on
     * the company and technology mentioned in the question.
     */
    const directAnswer = buildDirectAnswer(
        question,
        primaryDocument,
        uniqueDocuments
    );

    const relatedTopics = buildRelatedTopics(uniqueDocuments);

    let answer = `Summary

${directAnswer}

${primaryDocument.content}`;

    if (supportingDocuments.length > 0) {
        answer += `

Supporting Experience`;

        supportingDocuments.forEach((document) => {
            answer += `

• ${document.title}
${document.content}`;
        });
    }

    if (relatedTopics.length > 0) {
        answer += `

Relevant Skills and Topics

${relatedTopics
    .map((topic) => `• ${topic}`)
    .join("\n")}`;
    }

    answer += `

You can ask a follow-up question about a specific technology, project, company, or leadership responsibility.`;

    return answer;
}

/*
 * Creates a question-aware opening sentence.
 */
function buildDirectAnswer(
    question: string,
    primaryDocument: PortfolioDocument,
    documents: PortfolioDocument[]
): string {
    const requestedCompany = detectRequestedCompany(question);

    const requestedTopic = detectRequestedTopic(
        question,
        documents
    );

    const contextTopics = getContextTopics(
        primaryDocument,
        requestedCompany,
        requestedTopic
    );

    const contextPhrase = joinNaturalList(contextTopics);

    if (requestedCompany && requestedTopic) {
        if (contextPhrase) {
            return `Mahesh's portfolio shows that he used ${requestedTopic} at ${requestedCompany} alongside ${contextPhrase} in enterprise application work.`;
        }

        return `Mahesh's portfolio shows hands-on experience using ${requestedTopic} at ${requestedCompany}.`;
    }

    if (requestedCompany) {
        if (contextPhrase) {
            return `Mahesh's work at ${requestedCompany} includes ${contextPhrase}.`;
        }

        return `Mahesh has enterprise application experience at ${requestedCompany}.`;
    }

    if (requestedTopic) {
        if (contextPhrase) {
            return `Mahesh's portfolio shows experience with ${requestedTopic}, including work involving ${contextPhrase}.`;
        }

        return `Mahesh has hands-on enterprise experience with ${requestedTopic}.`;
    }

    if (contextPhrase) {
        return `The portfolio information most relevant to this question covers ${contextPhrase}.`;
    }

    return `The strongest portfolio match for this question is ${primaryDocument.title}.`;
}

/*
 * Detect a company explicitly mentioned in the question.
 */
function detectRequestedCompany(
    question: string
): string | undefined {
    return detectCompanyLabel(question);
}

/*
 * Detect the main technology or topic mentioned
 * in the question using retrieved document metadata.
 */
function detectRequestedTopic(
    question: string,
    documents: PortfolioDocument[]
): string | undefined {
    const normalizedQuestion =
        normalizeForMatching(question);

    const candidates = Array.from(
        new Map(
            documents
                .flatMap((document) => [
                    document.title,
                    ...document.tags,
                ])
                .map((topic) => topic.trim())
                .filter(Boolean)
                .filter((topic) => {
                    const normalizedTopic =
                        normalizeForMatching(topic);

                    const isGeneric =
                        GENERIC_TOPICS.has(
                            normalizedTopic
                        );

                    const isCompanyTopic =
                        COMPANY_KEYS.some((company) =>
                            normalizedTopic.includes(
                                company
                            )
                        );

                    return (
                        !isGeneric &&
                        !isCompanyTopic
                    );
                })
                .map((topic) => [
                    normalizeForMatching(topic),
                    topic,
                ])
        ).values()
    ).sort(
        (a, b) =>
            normalizeForMatching(b).length -
            normalizeForMatching(a).length
    );

    const matchedTopic = candidates.find(
        (topic) =>
            normalizedQuestion.includes(
                normalizeForMatching(topic)
            )
    );

    return matchedTopic
        ? formatTopic(matchedTopic)
        : undefined;
}

/*
 * Select useful supporting topics from the primary document.
 */
function getContextTopics(
    document: PortfolioDocument,
    requestedCompany?: string,
    requestedTopic?: string
): string[] {
    const normalizedCompany = requestedCompany
        ? normalizeForMatching(requestedCompany)
        : undefined;

    const normalizedRequestedTopic = requestedTopic
        ? normalizeForMatching(requestedTopic)
        : undefined;

    const topicMap = new Map<string, string>();

    document.tags.forEach((tag) => {
        const cleanedTag = tag.trim();
        const normalizedTag =
            normalizeForMatching(cleanedTag);

        if (!cleanedTag) {
            return;
        }

        if (GENERIC_TOPICS.has(normalizedTag)) {
            return;
        }

        // Do not repeat the requested company.
        if (
            normalizedCompany &&
            normalizedTag === normalizedCompany
        ) {
            return;
        }

        // Do not repeat the requested technology/topic.
        if (
            normalizedRequestedTopic &&
            normalizedTag === normalizedRequestedTopic
        ) {
            return;
        }

        // Exclude other standalone company names.
        if (
            COMPANY_KEYS.some(
                (companyKey) =>
                    normalizedTag ===
                    normalizeForMatching(companyKey)
            )
        ) {
            return;
        }

        if (!topicMap.has(normalizedTag)) {
            topicMap.set(
                normalizedTag,
                formatTopic(cleanedTag)
            );
        }
    });

    return removeOverlappingTopics(
        Array.from(topicMap.values())
    ).slice(0, MAX_CONTEXT_TOPICS);
}

/*
 * Builds the Relevant Skills and Topics section.
 */
function buildRelatedTopics(
    documents: PortfolioDocument[]
): string[] {
    const topicMap = new Map<string, string>();

    documents.forEach((document) => {
        const topics = [
            document.title,
            ...document.tags,
        ];

        topics.forEach((topic) => {
            const cleanedTopic = topic.trim();

            if (!cleanedTopic) {
                return;
            }

            const normalizedTopic =
                cleanedTopic.toLowerCase();

            if (!topicMap.has(normalizedTopic)) {
                topicMap.set(
                    normalizedTopic,
                    formatTopic(cleanedTopic)
                );
            }
        });
    });

    return Array.from(topicMap.values()).slice(
        0,
        MAX_TOPICS
    );
}

/*
 * Prevents both "Spring" and "Spring Boot"
 * from appearing in the same generated sentence.
 */
function removeOverlappingTopics(
    topics: string[]
): string[] {
    const sortedTopics = [...topics].sort(
        (a, b) => b.length - a.length
    );

    const selectedTopics: string[] = [];

    sortedTopics.forEach((topic) => {
        const normalizedTopic = topic.toLowerCase();

        const alreadyCovered = selectedTopics.some(
            (selectedTopic) =>
                selectedTopic
                    .toLowerCase()
                    .includes(normalizedTopic)
        );

        if (!alreadyCovered) {
            selectedTopics.push(topic);
        }
    });

    return selectedTopics;
}

/*
 * Converts an array into natural English:
 * Java, Spring Boot, and Microservices
 */
function joinNaturalList(items: string[]): string {
    if (items.length === 0) {
        return "";
    }

    if (items.length === 1) {
        return items[0];
    }

    if (items.length === 2) {
        return `${items[0]} and ${items[1]}`;
    }

    return `${items.slice(0, -1).join(", ")}, and ${
        items[items.length - 1]
    }`;
}

function formatTopic(topic: string): string {
    const uppercaseTerms = new Set([
        "ai",
        "api",
        "aws",
        "ci/cd",
        "gcp",
        "jms",
        "jwt",
        "oauth",
        "rag",
        "sql",
    ]);

    const normalizedTopic = topic.toLowerCase();

    if (uppercaseTerms.has(normalizedTopic)) {
        return normalizedTopic.toUpperCase();
    }

    return topic
        .split(" ")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase()
        )
        .join(" ");
}