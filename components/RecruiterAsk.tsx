"use client";

import { useState } from "react";
import { ClipLoader } from "react-spinners";
import ReusableButton from "./ReusableButton";
import ReusableCard from "./ReusableCard";
import Image from "next/image";
export default function RecruiterAsk() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAnswer(null);
    setPending(true);

    try {
      const res = await fetch("/api/recruiter-qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question.trim() }),
      });
      const data = (await res.json()) as { answer?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setAnswer(data.answer ?? null);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setPending(false);
    }
  };

  return (
   
      <div className="space-y-4">
        <div className="text-xl tracking-tighter font-extrabold text-foreground/50">
          Ask About Kenny's Experience
        </div>
        <p className="text-sm text-foreground/80 max-w-[70ch]">
          Ask factual questions sourced from this portfolio—for example years of
          experience, main tech stack, recent employers, or project highlights.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            placeholder="e.g. What is Kenny&apos;s main tech stack? Where has he worked most recently?"
            className="w-full border border-mysterious-green p-3 rounded focus:outline-none min-h-[6rem] text-sm resize-y bg-transparent"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={600}
            required
            disabled={pending}
            rows={10}
            aria-label="Question for hiring assistant"
          />
          <div className="flex flex-wrap items-center gap-3">
            <ReusableButton
              type="submit"
              title="Get answer"
              disabled={pending}
            />
            {pending && <ClipLoader size={22} />}
          </div>
        </form>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {answer && (
          <div className="rounded border border-mysterious-green/50 p-3 text-sm whitespace-pre-wrap leading-relaxed">
            {answer}
          </div>
        )}
      </div>

  );
}
