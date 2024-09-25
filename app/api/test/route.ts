import { NextResponse } from "next/server";

export async function GET() {
  console.log("Test API route hit");
  console.log("API Key:", process.env.OPENAI_API_KEY);
  return NextResponse.json({ message: "Test API route hit successfully" });
}
