import React from "react";

type InputProps = {
  text: string;
  loading: boolean;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: (prompt: string) => void;
  isPromptStyle?: string;
  setIsPromptStyle?: React.Dispatch<React.SetStateAction<string>>;
};

export default function Input({
  text,
  loading,
  handleTextChange,
  handleButtonClick,
  isPromptStyle,
  setIsPromptStyle,
}: InputProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex h-15 w-full items-center gap-3 rounded-[1.4rem] border border-base-300 bg-base-100/90 px-5 text-base text-base-content shadow-sm transition focus-within:border-neutral/20 focus-within:outline-none focus-within:ring-4 focus-within:ring-accent/10">
        <input
          value={text}
          onChange={handleTextChange}
          placeholder="Create a modern SaaS landing page for a payroll tool with trust-building copy"
          className="w-full bg-transparent outline-none placeholder:text-base-content/45"
        />
        <select
          className="select select-ghost w-auto min-w-44 bg-base-100 text-base-content"
          value={isPromptStyle ?? "Choose a style"}
          onChange={(e) => setIsPromptStyle?.(e.target.value)}
        >
          <option disabled={true}>Choose a style</option>
          <option>Minimalistic</option>
          <option>Maximalistic</option>
          <option>Flat Design</option>
          <option>Brutalistic</option>
          <option>Retro</option>
          <option>Abstract</option>
        </select>
      </div>

      <button
        onClick={() => handleButtonClick(text)}
        disabled={loading}
        className="btn btn-primary h-14 rounded-[1.4rem] px-7 shadow-sm"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}
