import { useEffect, useState } from "react";

export type PromptUsageEntry = {
  prompt: string;
  promptLength: number;
  style: string;
  createdAt: string;
};

const PROMPT_USAGE_STORAGE_KEY = "promptUsageHistory";

function isPromptUsageEntry(value: unknown): value is PromptUsageEntry {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const entry = value as Record<string, unknown>;

  return (
    typeof entry.prompt === "string" &&
    typeof entry.promptLength === "number" &&
    typeof entry.style === "string" &&
    typeof entry.createdAt === "string"
  );
}

function readPromptHistory(): PromptUsageEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedHistory = window.localStorage.getItem(PROMPT_USAGE_STORAGE_KEY);

    if (!storedHistory) {
      return [];
    }

    const parsedHistory: unknown = JSON.parse(storedHistory);

    return Array.isArray(parsedHistory)
      ? parsedHistory.filter(isPromptUsageEntry)
      : [];
  } catch {
    return [];
  }
}

export function usePromptHistory() {
  const [history, setHistory] = useState<PromptUsageEntry[]>(readPromptHistory);

  useEffect(() => {
    window.localStorage.setItem(
      PROMPT_USAGE_STORAGE_KEY,
      JSON.stringify(history),
    );
  }, [history]);

  const addPrompt = (prompt: string, style: string) => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    setHistory((currentHistory) => [
      ...currentHistory,
      {
        prompt: trimmedPrompt,
        promptLength: trimmedPrompt.length,
        style,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return {
    history,
    addPrompt,
  };
}
