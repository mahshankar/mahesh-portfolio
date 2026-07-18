"use client";

import { useState } from "react";
import { useRef } from "react";
import Button from "../ui/Button";
import { aiQuestions } from "../../data/aiQuestions";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};



const AIAssistant = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [message, setMessage] = useState("");
    //Temporary state to hold the AI assistant's reply
   const [reply, setReply] = useState(`👋 Welcome!

   I'm Mahesh's AI Career Assistant.

   I can answer questions about:

   • 19+ years of Java experience
   • Spring Boot & Microservices
   • Kafka Event Streaming
   • AWS Cloud
   • Enterprise Architecture
   • Technical Leadership
   • Current AI Engineering Journey

   Try one of the suggested questions below or ask anything about Mahesh's experience.`);
    const [loading, setLoading] = useState(false);
   const askQuestion = (question: string) => {
      setMessage(question);
      setTimeout(() => {
          formRef.current?.requestSubmit();
      }, 100);
  };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!message.trim()) {
            return;
        }
        setLoading(true);
      try{
        /* const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        }); */

    await new Promise(resolve => setTimeout(resolve, 1200));

        const lower = message.toLowerCase();

        let mockReply = "";

        if (lower.includes("kafka")) {
            mockReply = `Mahesh has implemented Kafka-based event-driven microservices across enterprise projects at Citi, Deloitte, and Verizon.

    Highlights:

    • Event-driven architecture
    • Producer / Consumer patterns
    • High-throughput messaging
    • Distributed systems
    • Spring Kafka integration`;
        }

        else if (lower.includes("spring")) {
            mockReply = `Mahesh has over 19 years of Java development experience with extensive use of Spring Boot.

    Key experience:

    • REST APIs
    • Spring Security
    • Spring Data JPA
    • Microservices
    • Enterprise modernization`;
        }

        else if (lower.includes("cloud")) {
            mockReply = `Mahesh has hands-on cloud experience with AWS.

    Technologies include:

    • EC2
    • S3
    • IAM
    • Lambda
    • Docker
    • Kubernetes
    • CI/CD pipelines`;
        }

        else if (lower.includes("lead")) {
            mockReply = `Mahesh has led multiple enterprise engineering teams, mentoring developers, conducting architecture reviews, driving Agile delivery, and collaborating with stakeholders across large modernization initiatives.`;
        }

        else if (lower.includes("ai")) {
            mockReply = `Mahesh is actively expanding into AI Engineering by building applications with OpenAI APIs, Prompt Engineering, Retrieval-Augmented Generation (RAG), Vector Databases, MCP, AI Agents, and orchestration frameworks. This portfolio is part of that journey.`;
        }

        else {
              mockReply = `Mahesh has over 19 years of experience delivering enterprise software solutions.

                  Highlights include:

                  • Java & Spring Boot
                  • Kafka Event Streaming
                  • Microservices Architecture
                  • AWS Cloud
                  • CI/CD & DevOps
                  • Technical Leadership

                  Current focus:

                  Building AI-powered applications using OpenAI, Next.js, Retrieval-Augmented Generation (RAG), Vector Databases, MCP, and AI Agents.`;
            }

      /*  if (!response.ok) {
            setReply("Error: Unable to get a response from the AI assistant.");

            return;
        }
    const data = await response.json();
            setReply(data.reply); */

            setReply(mockReply);
            setMessage ("");


    }catch (error) {
            setReply("Error: Unable to get a response from the AI assistant.");

            return;
        }finally {
            setLoading(false);
        }

    };

    return (
        <section
            id="ai"
            className="bg-slate-950 text-white py-24"
        >
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-700">

            <h2 className="text-4xl font-bold">
                🤖 AI Career Assistant
            </h2>

            <p className="text-slate-300 mt-3">
                Instead of reading my resume,
                have a conversation with it.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">

                <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300">
                    Next.js
                </span>

                <span className="px-3 py-1 rounded-full bg-green-600/20 text-green-300">
                    OpenAI SDK
                </span>

                <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300">
                    TypeScript
                </span>

                <span className="px-3 py-1 rounded-full bg-orange-600/20 text-orange-300">
                    Prompt Engineering
                </span>

            </div>
            <div className="p-6 border-b border-slate-700">

            <h3 className="font-semibold mb-4">
            Popular Questions
            </h3>

            <div className="flex flex-wrap gap-3">

            {aiQuestions.map((question) => (

            <button
                key={question}
                onClick={() => askQuestion(question)}
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-blue-700 transition"
            >
                {question}
            </button>

            ))}

            </div>

            </div>

        </div>
        <div className="m-6 rounded-2xl bg-slate-800 border border-slate-700 p-6 shadow-xl min-h-[320px] max-h-[420px] overflow-y-auto">

            <div className="flex items-center gap-2 mb-4">

                <div className="text-2xl">
                    🤖
                </div>

                <div>

                    <h3 className="font-semibold">
                        AI Assistant
                    </h3>

                    <p className="text-sm text-slate-400">
                        Powered by OpenAI
                    </p>

                </div>

            </div>

            <p className="whitespace-pre-wrap leading-8 text-slate-200">

                {reply}

            </p>

        </div>
        {loading && (
            <div className="px-6 pb-2">
                <p className="text-blue-400 animate-pulse">
                    🤖 AI is thinking...
                </p>
            </div>
        )}


            <div className="border-t border-slate-700 p-6">

            <form
            ref={formRef}
            id="ask-ai-form"
                onSubmit={handleSubmit}
                className="flex gap-4 items-center"
            >

                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                   placeholder="Ask me about Java, Kafka, AWS, AI, Leadership..."
                      className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                <Button
                    type="submit"
                    text={loading ? "Thinking..." : "Ask AI"}
                    disabled={loading}
                />

            </form>
            </div>

        </div>
        </section>
    );
};

export default AIAssistant;