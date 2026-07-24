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
     * These titles represent documents that would be
     * considered relevant for this question.
     *
     * The evaluator does not require every title to appear.
     * It checks whether the ranking contains relevant
     * evidence in Top 1 and Top 3.
     */
    expectedTitles: string[];

    /*
     * True when retrieval should return no documents.
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
            expectedTitles: [
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
            expectedTitles: [
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
            expectedTitles: [
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
            expectedTitles: [
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
            expectedTitles: [
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
            expectedTitles: [
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
            expectedTitles: [
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
            expectedTitles: [
                "Leadership",
            ],
        },
        {
            id: "ai-general",
            category: "skill",
            question:
                "What AI engineering work has Mahesh completed?",
            expectedTitles: [
                "AI Engineering",
                "AI Portfolio Assistant",
            ],
        },
        {
            id: "projects-general",
            category: "project",
            question:
                "Tell me about Mahesh's enterprise projects.",
            expectedTitles: [
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
            expectedTitles: [],
            expectNoResults: true,
        },
    ];