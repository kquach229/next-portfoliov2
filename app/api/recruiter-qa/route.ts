import { NextResponse } from "next/server";
import { RECRUITER_KNOWLEDGE_BASE } from "@/app/utils/recruiterContext";

const MODEL = "gemini-flash-latest";
const MAX_QUESTION_CHARS = 600;

function geminiAnswerText(data: GeminiGenerateContentResponse): string | null {
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts?.length) return null;
  return parts.map((p) => p.text ?? "").join("").trim() || null;
}

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }>; role?: string };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; code?: number };
};

export async function POST(req: Request) {
  const apiKey =
    process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The hiring assistant is not configured. Add GEMINI_API_KEY (free key from Google AI Studio) on the server.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const question =
    typeof body === "object" &&
    body !== null &&
    "question" in body &&
    typeof (body as { question: unknown }).question === "string"
      ? (body as { question: string }).question.trim()
      : "";

  if (!question || question.length > MAX_QUESTION_CHARS) {
    return NextResponse.json(
      {
        error: `Please enter a question (1–${MAX_QUESTION_CHARS} characters).`,
      },
      { status: 400 },
    );
  }

  const systemPrompt = `You help recruiters and hiring managers learn about Kenny Quach (software engineer).

Rules:
- Answer only from the knowledge base below. Do not invent employers, dates, technologies, certifications, metrics, or contact details not present there.
- If the knowledge base does not contain enough to answer, say so briefly and suggest using the portfolio contact section, LinkedIn, GitHub, or the resume PDF.
- Tone: concise, factual, friendly, professional—suitable for hiring conversations.
- No markdown headings needed unless the answer is long; plain paragraphs are fine.

Knowledge base:
${RECRUITER_KNOWLEDGE_BASE}`;

  const url = new URL(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
  );
  url.searchParams.set("key", apiKey);

  let upstream: Response;
  try {
    upstream = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: question }],
          },
        ],
        generationConfig: {
          temperature: 0.25,
          maxOutputTokens: 600,
        },
      }),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not reach the assistant. Try again shortly." },
      { status: 502 },
    );
  }

  const raw = await upstream.text();
  let data: GeminiGenerateContentResponse;
  try {
    data = JSON.parse(raw) as GeminiGenerateContentResponse;
  } catch {
    console.error(raw);
    return NextResponse.json(
      { error: "Could not generate an answer. Try again shortly." },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    console.error(raw);
    const msg = data.error?.message ?? "Request failed.";
    return NextResponse.json(
      {
        error: `Could not generate an answer (${msg}). Check your API key and model access.`,
      },
      { status: 502 },
    );
  }

  if (data.promptFeedback?.blockReason) {
    return NextResponse.json(
      {
        error:
          "Your question could not be processed. Try rephrasing a neutral hiring-related question.",
      },
      { status: 422 },
    );
  }

  const answer = geminiAnswerText(data);
  if (!answer) {
    console.error(raw);
    return NextResponse.json(
      { error: "Empty assistant response." },
      { status: 502 },
    );
  }

  return NextResponse.json({ answer });
}
