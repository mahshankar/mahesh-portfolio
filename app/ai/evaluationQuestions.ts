export type EvaluationCategory =
    | "exact-match"
    | "semantic-paraphrase"
    | "company-context"
    | "skill"
    | "project"
    | "out-of-domain";

export type RetrievalEvaluationCase = {
    id: string;
    category: EvaluationCategory;
    question: string;

    /*
     * The single best document that should rank first.
     * It is omitted for out-of-domain questions.
     */
    primaryExpectedTitle?: string;

    /*
     * All documents considered relevant to the question,
     * including the primary result and supporting results.
     */
    relevantTitles: string[];

    /*
     * True when no portfolio document should be returned.
     */
    expectNoResults?: boolean;
};

export const evaluationQuestions:
    RetrievalEvaluationCase[] = [
        {
            id: "citi-kafka-exact",
            category: "exact-match",
            question:
                "How did Mahesh use Kafka at Citi?",
            primaryExpectedTitle:
                "Citi Banking Experience",
            relevantTitles: [
                "Citi Banking Experience",
                "Kafka",
                "Microservices",
            ],
        },
        {
            id: "citi-streaming-paraphrase",
            category: "semantic-paraphrase",
            question:
                "Describe Mahesh's event-streaming work for the banking client.",
            primaryExpectedTitle:
                "Citi Banking Experience",
            relevantTitles: [
                "Citi Banking Experience",
                "Kafka",
                "Microservices",
            ],
        },
        {
            id: "legacy-modernization-paraphrase",
            category: "semantic-paraphrase",
            question:
                "What experience does Mahesh have modernizing old enterprise applications?",
            primaryExpectedTitle:
                "Legacy System Modernization",
            relevantTitles: [
                "Legacy System Modernization",
                "Deloitte Enterprise Modernization",
                "Java",
            ],
        },
        {
            id: "deloitte-spring-boot",
            category: "company-context",
            question:
                "How did Mahesh use Spring Boot at Deloitte?",
            primaryExpectedTitle:
                "Deloitte Enterprise Modernization",
            relevantTitles: [
                "Deloitte Enterprise Modernization",
                "Legacy System Modernization",
                "Java",
            ],
        },
        {
            id: "kafka-general",
            category: "skill",
            question:
                "What Kafka experience does Mahesh have?",
            primaryExpectedTitle: "Kafka",
            relevantTitles: [
                "Kafka",
                "Citi Banking Experience",
                "Microservices",
            ],
        },
        {
            id: "microservices-general",
            category: "skill",
            question:
                "What experience does Mahesh have designing distributed services?",
            primaryExpectedTitle: "Microservices",
            relevantTitles: [
                "Microservices",
                "Java",
                "Citi Banking Experience",
            ],
        },
        {
            id: "cloud-general",
            category: "skill",
            question:
                "What cloud and container technologies has Mahesh used?",
            primaryExpectedTitle: "Cloud",
            relevantTitles: [
                "Cloud",
                "Containerization and Kubernetes",
                "CI/CD and DevOps",
            ],
        },
        {
            id: "leadership-general",
            category: "skill",
            question:
                "Describe Mahesh's technical leadership experience.",
            primaryExpectedTitle: "Leadership",
            relevantTitles: [
                "Leadership",
            ],
        },
        {
            id: "ai-general",
            category: "skill",
            question:
                "What AI engineering work has Mahesh completed?",
            primaryExpectedTitle: "AI Engineering",
            relevantTitles: [
                "AI Engineering",
                "AI Portfolio Assistant",
            ],
        },
        {
            id: "projects-general",
            category: "project",
            question:
                "Tell me about Mahesh's enterprise projects.",
            primaryExpectedTitle: "Projects",
            relevantTitles: [
                "Projects",
                "Citi Banking Experience",
                "Deloitte Enterprise Modernization",
            ],
        },
        {
            id: "marine-biology-out-of-domain",
            category: "out-of-domain",
            question:
                "What experience does Mahesh have in marine biology?",
            relevantTitles: [],
            expectNoResults: true,
        },
    ];