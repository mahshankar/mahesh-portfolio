import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import {portfolioKnowledge} from "@/app/ai/portfolioKnowledge";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    try {
        // Read request
        const { message } = await req.json();

        // Validate request
        if (!message || !message.trim()) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // Call OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: portfolioKnowledge,
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        // Extract response
        const reply =
            response.choices[0].message.content ??
            "Sorry, I couldn't generate a response.";

        // Return JSON
        return NextResponse.json({ reply });

    } catch (error) {
        console.error("Chat API Error:", error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}
