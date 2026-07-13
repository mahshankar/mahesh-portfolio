export type Project = {
    id: number;

    company: string;

    category: string;

    project: string;

    role: string;

    duration: string;

    description: string;

    businessProblem: string;

    responsibilities: string[];

    technologies: string[];

    architecture: string[];

    achievements: string[];

};




export const projects = [

    {
        id: 1,

        company: "Citi",

        category: "Banking/Financial Services",

        project: "Olympus Platform",

        role: "Principal Engineer",

        duration: "Sep 2025 - Present",

        description: "Enterprise reconciliation platform built using microservices and event-driven architecture.",

        businessProblem: "Designed and modernized an enterprise reconciliation platform capable of processing large-scale financial transactions while improving scalability and resiliency.",

        responsibilities: [
                "Designed RESTful APIs",
                "Led microservice development",
                "Reviewed architecture",
                "Mentored developers"
        ],

        technologies: [
               "Java 17",
               "Spring Boot",
               "Kafka",
               "Kubernetes",
               "Oracle",
               "Azure"
        ],

        architecture: [
                          "REST APIs",
                          "Kafka",
                          "Microservices",
                          "Oracle",
                          "Elasticsearch"
                      ],

        achievements: [
                          "Modernized legacy applications",
                          "Improved scalability",
                          "Reduced manual reconciliation effort",
                          "Delivered enterprise APIs"
                      ],

    },

    {
        id: 2,

        company: "Deloitte",

        category: "Consulting/Government",

        project: "Illinois IES",

        role: "Senior Engineer",

        duration: "Mar 2021 - Sep 2023",

        description: "Modernized eligibility processing platform serving millions of citizens.",

        businessProblem: "Outdated eligibility processing system leading to delays and errors.",

        responsibilities: [
            "Developed and maintained microservices using Spring Boot.",
            "Implemented RESTful APIs for seamless integration.",
            "Optimized database queries for improved performance."
        ],

        technologies: [
            "Java",
            "Spring Boot",
            "Oracle",
            "REST APIs"
        ],

        architecture: [
            "Microservices",
            "API Gateway"
        ],

        achievements: [
            "Reduced eligibility processing time by 60%.",
            "Improved system scalability and reliability."
        ],

    },


{
        id: 3,

        company: "Florida DEP",

        category: "Government",

        project: "ESSA",

        role: "Senior Engineer",

        duration: "Mar 2017 - Dec 2021",

        description: "Enterprise authorization platform implementing secure authentication and role-based access.",

        businessProblem: "Outdated eligibility processing system leading to delays and errors.",

        responsibilities: [
            "Designed and implemented enterprise REST and SOAP services supporting statewide permitting workflows.",
            "Developed Spring Boot and Java applications for permit processing and business rule execution.",
            "Integrated multiple enterprise systems using REST APIs, SOAP services, and JMS messaging.",
            "Collaborated with business analysts and environmental program teams to translate complex regulatory requirements into scalable software solutions.",
            "Modernized legacy J2EE components and improved maintainability through modular service-oriented architecture.",
            "Optimized SQL queries and backend processing for high-volume permit transactions.",
            "Participated in Agile development, production support, code reviews, and release planning."
        ],

        technologies: [
            "Java 8",
            "Spring Boot",
            "Spring MVC",
            "Hibernate",
            "JPA",
            "REST APIs",
            "SOAP",
            "Oracle",
            "JMS",
            "Maven",
            "Jenkins",
            "Git",
            "AWS",
            "Docker"
        ],

        architecture: [
            "Contributed to the modernization of Florida DEP enterprise permitting platform.",
            "Developed scalable backend services supporting multiple environmental regulatory programs.",
            "Improved integration between permitting applications and enterprise systems.",
            "Enhanced maintainability through modular service-oriented design.",
            "Delivered secure and reliable solutions supporting statewide environmental compliance initiatives."
        ],

        achievements: [
            "Contributed to the modernization of Florida DEPs enterprise permitting platform.",
            "Developed scalable backend services supporting multiple environmental regulatory programs.",
            "Improved integration between permitting applications and enterprise systems.",
            "Enhanced maintainability through modular service-oriented design.",
            "Delivered secure and reliable solutions supporting statewide environmental compliance initiatives."
        ],

    },


];