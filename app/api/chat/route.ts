import OpenAI from "openai";
import { NextResponse } from "next/server";
console.log("API route hit");

console.log("API Key:", process.env.OPENAI_API_KEY);
console.log("Org ID:", process.env.OPENAI_ORG_ID);
console.log("API Key length:", process.env.OPENAI_API_KEY?.length);
console.log("API Key prefix:", process.env.OPENAI_API_KEY?.substring(0, 7));

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    return NextResponse.json({ result: completion.choices[0].message });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { 
        error: "An error occurred during your request.", 
        details: error instanceof Error ? error.message : String(error) 
      }, 
      { status: 500 }
    );
  }
}
