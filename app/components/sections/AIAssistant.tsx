"use client";

import { useState } from "react";
import { useRef } from "react";
import Button from "../ui/Button";
import { aiQuestions } from "../../data/aiQuestions";
import  {semanticSearch} from "../../api/semanticSearch";


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

    //await new Promise(resolve => setTimeout(resolve, 1200));

       const matchedDocument = semanticSearch(message);

       if (matchedDocument) {
           setReply(matchedDocument.content);
       } else {
           setReply(
               "Sorry, I couldn't find anything relevant in Mahesh's knowledge base."
           );
       }

       setMessage("")


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
                    AI Retrieval/OpenAI SDK
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
                    autoComplete="off"
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