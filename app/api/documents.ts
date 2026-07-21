export type PortfolioDocument = {
    id: string;
    title: string;
    tags: string[];
    content: string;
};


export const documents: PortfolioDocument[] = [

{
    id: "about",

    title: "About Mahesh",

    tags: [
        "mahesh",
        "about",
        "summary",
        "experience",
        "career"
    ],

    content:
              "Mahesh Shankar is a Senior Software Engineer with over 19 years of experience designing and delivering enterprise software solutions. He specializes in backend engineering, enterprise architecture, technical leadership, and modernization of large-scale systems."

},

{
    id: "java",

    title: "Java",

    tags: [
        "java",
        "backend",
        "j2ee",
        "spring"
    ],

    content:
        "Mahesh has over 19 years of Java development experience building enterprise applications using Java, Spring Framework, Spring Boot, REST APIs, JPA, Hibernate, and distributed architectures."
},

{
    id: "microservices",

    title: "Microservices",

    tags: [
        "microservices",
        "distributed systems",
        "architecture",
        "rest"
    ],

    content:
        "Mahesh has designed and developed enterprise microservices using Spring Boot, REST APIs, Docker, Kubernetes, Kafka, and cloud-native design principles."
},

{
    id: "kafka",

    title: "Kafka",

    tags: [
        "kafka",
        "event streaming",
        "messaging",
        "producer",
        "consumer",
        "events"
    ],

    content:
        "Mahesh has implemented Kafka-based event-driven architectures, asynchronous messaging, producer-consumer systems, and enterprise event streaming across large-scale applications."
},

{
    id: "cloud",

    title: "Cloud",

    tags: [
        "aws",
        "cloud",
        "docker",
        "kubernetes",
        "ec2",
        "s3"
    ],

    content:
        "Mahesh has experience deploying enterprise applications using AWS services including EC2, S3, IAM, Docker containers, Kubernetes orchestration, and CI/CD pipelines."
},

{
    id: "leadership",

    title: "Leadership",

    tags: [
        "leadership",
        "mentor",
        "architect",
        "team"
    ],

    content:
        "Mahesh has led enterprise engineering teams, mentored developers, conducted architecture reviews, collaborated with business stakeholders, and driven Agile software delivery."
},

{
    id: "ai",

    title: "AI Engineering",

    tags: [
        "ai",
        "artificial intelligence",
        "genai",
        "generative ai",
        "generative",
        "openai",
        "rag",
        "retrieval augmented generation",
        "embeddings",
        "vector database",
        "agents",
        "mcp",
        "prompt engineering"
    ],

    content:
        "Mahesh is actively expanding into Artificial Intelligence and Generative AI Engineering by building applications using Next.js, OpenAI APIs, Prompt Engineering, Retrieval-Augmented Generation (RAG), Embeddings, Vector Databases, MCP, Tool Calling, and AI Agents."
},

{
    id: "projects",

    title: "Projects",

    tags: [
        "projects",
        "citi",
        "deloitte",
        "verizon",
        "government"
    ],

    content:
        "Mahesh has delivered enterprise software solutions for Citi, Deloitte, Verizon, and multiple state government agencies, modernizing legacy systems into cloud-native architectures."
},
{
 id: "citi",
 title: "Citi Banking Experience",
 tags:[
   "citi",
   "banking",
   "reconciliation",
   "microservices",
   "kafka",
   "java"
 ],
 content:
 "Mahesh is currently working as a Senior Solution Specialist on Citi enterprise platforms. He designs Java Spring Boot microservices, builds reconciliation frameworks, works with Kafka, Elasticsearch, GemFire, Cloudera observability, and enterprise CI/CD pipelines."
},
{
 id:"deloitte",
 title:"Deloitte Enterprise Modernization",
 tags:[
   "deloitte",
   "modernization",
   "government",
   "spring boot",
   "kubernetes"
 ],
 content:
 "At Deloitte, Mahesh contributed to large-scale government modernization initiatives including decentralized identity platforms and eligibility systems. He worked with Java, Spring Boot, Kafka, Docker, Kubernetes, Azure, Google Cloud, and legacy modernization."
},
{
 id:"modernization",
 title:"Legacy System Modernization",
 tags:[
   "mainframe",
   "modernization",
   "websphere",
   "db2"
 ],
 content:
 "Mahesh has experience modernizing legacy enterprise systems by migrating mainframe and WebSphere based applications into Java Spring Boot microservices, cloud-native architectures, and containerized deployments."
},
{
 id:"containers",
 title:"Containerization and Kubernetes",
 tags:[
   "docker",
   "kubernetes",
   "aks",
   "gke",
   "containers"
 ],
 content:
 "Mahesh has containerized enterprise applications using Docker and deployed workloads using Kubernetes platforms including Azure Kubernetes Service and Google Kubernetes Engine. He has experience with deployments, scaling, and cloud-native application patterns."
},
{
 id:"cicd",
 title:"CI/CD and DevOps",
 tags:[
   "jenkins",
   "bamboo",
   "harness",
   "pipeline",
   "devops"
 ],
 content:
 "Mahesh has implemented enterprise CI/CD pipelines using Jenkins, Bamboo, Harness, Maven, GitHub, SonarQube, Snyk, and automated quality/security checks."
},
{
 id:"frontend",
 title:"Full Stack Development",
 tags:[
   "react",
   "angular",
   "frontend",
   "full stack"
 ],
 content:
 "Mahesh has full-stack development experience building enterprise applications using React, Angular, Java Spring Boot APIs, REST services, and modern web technologies."
},
{
 id:"portfolio-ai",
 title:"AI Portfolio Assistant",
 tags:[
   "portfolio",
   "ai assistant",
   "semantic search",
   "rag"
 ],
 content:
 "Mahesh is building an AI-powered portfolio assistant using Next.js, TypeScript, semantic search, knowledge documents, retrieval concepts, and RAG architecture patterns to demonstrate practical AI engineering skills."
}
];