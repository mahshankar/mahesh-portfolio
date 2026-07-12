export type Certification = {
    id: number;
    title: string;
    issuer: string;
    year: string;
    description: string;
    skills: string[];
    credentialUrl?: string;
};

export const certifications: Certification[] = [

    {
        id: 1,
        title: "Oracle Certified Professional: Java SE 17 Developer",
        issuer: "Oracle",
        year: "2025",
        description:
            "Earned this certification to validate expertise in modern Java development, including Java SE 17 language features, functional programming, streams, concurrency, modules, and enterprise application development.",
        skills: [
            "Java 17",
            "Streams",
            "Concurrency",
            "Modules",
            "OOP"
        ]
    },

    {
        id: 2,
        title: "Sun Certified Java Programmer (SCJP 5.0)",
        issuer: "Sun Microsystems",
        year: "2007",
        description:
            "Validated strong knowledge of Core Java, object-oriented programming, collections, exception handling, and multithreading fundamentals.",
        skills: [
            "Core Java",
            "Collections",
            "OOP",
            "Multithreading"
        ]
    },

    {
        id: 3,
        title: "Oracle PL/SQL Developer Certified Associate",
        issuer: "Oracle",
        year: "2007",
        description:
            "Certified in Oracle SQL and PL/SQL programming, including stored procedures, packages, functions, triggers, cursors, and database programming techniques.",
        skills: [
            "Oracle SQL",
            "PL/SQL",
            "Stored Procedures",
            "Database Programming"
        ]
    }

];