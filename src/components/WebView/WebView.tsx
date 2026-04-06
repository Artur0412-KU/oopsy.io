import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

type WebViewProps = {
  htmlPage: string;
  viewMode: "preview" | "code";
};

export default function WebView({ htmlPage, viewMode }: WebViewProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
      {viewMode === "preview" ? (
        <iframe
          title="Generated page preview"
          width="100%"
          height="700px"
          srcDoc={htmlPage}
          className="bg-base-100"
        />
      ) : (
        <SyntaxHighlighter
          className="h-[700px] !m-0 bg-slate-950 !p-6 text-sm"
          language="html"
        >
          {htmlPage}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
