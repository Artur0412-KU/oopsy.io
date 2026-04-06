import { useEffect, useState } from "react";
import { promptInit } from "../services/ai/ai";
import { getPromptInstruction } from "../services/ai/instruction";

const LAST_GENERATED_HTML_STORAGE_KEY = "lastGeneratedHTML";
const DEFAULT_PROMPT_STYLE = "Choose a style";

type Message = {
  role: string;
  content: string;
};

type UseGeneratorOptions = {
  addPrompt: (prompt: string, style: string) => void;
  canGenerate: (isLoggedIn: boolean) => boolean;
  incrementTrial: () => void;
  isUserLoggedIn: boolean;
  onGenerateSuccess?: () => void;
  onTrialLimitReached?: () => void;
};

function readLastGeneratedHtml() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(LAST_GENERATED_HTML_STORAGE_KEY) ?? "";
}

function extractHTMLFromCodeBlock(aiResponse: string) {
  const match = aiResponse.match(/```html\s*([\s\S]*?)```/i);

  if (match?.[1]) {
    return match[1].trim();
  }

  return aiResponse;
}

function createSystemMessage(promptStyle: string): Message {
  return {
    role: "system",
    content: getPromptInstruction(promptStyle),
  };
}

export function useGenerator({
  addPrompt,
  canGenerate,
  incrementTrial,
  isUserLoggedIn,
  onGenerateSuccess,
  onTrialLimitReached,
}: UseGeneratorOptions) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [htmlPage, setHtmlPage] = useState(readLastGeneratedHtml);
  const [promptStyle, setPromptStyle] = useState(DEFAULT_PROMPT_STYLE);
  const [messages, setMessages] = useState<Message[]>([
    createSystemMessage(DEFAULT_PROMPT_STYLE),
  ]);

  useEffect(() => {
    window.localStorage.setItem(LAST_GENERATED_HTML_STORAGE_KEY, htmlPage);
  }, [htmlPage]);

  useEffect(() => {
    const systemMessage = createSystemMessage(promptStyle);

    setMessages((currentMessages) => {
      if (currentMessages[0]?.role === "system") {
        return [systemMessage, ...currentMessages.slice(1)];
      }

      return [systemMessage, ...currentMessages];
    });
  }, [promptStyle]);

  const generate = async (prompt: string) => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    if (!canGenerate(isUserLoggedIn)) {
      onTrialLimitReached?.();
      return;
    }

    try {
      setLoading(true);

      const result = await promptInit(trimmedPrompt);

      if (!result) {
        return;
      }

      const parsedResult = extractHTMLFromCodeBlock(result);

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "user", content: trimmedPrompt },
        { role: "assistant", content: result },
      ]);
      setHtmlPage(parsedResult);
      addPrompt(trimmedPrompt, promptStyle);
      incrementTrial();
      setText("");
      onGenerateSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    text,
    setText,
    loading,
    htmlPage,
    messages,
    promptStyle,
    setPromptStyle,
    generate,
  };
}
