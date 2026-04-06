import { useRef, useState } from "react";
import { PanelTop, Code, Copy } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Input from "../components/Input/Input";
import Profile from "../components/Profile/Profile";
import Register from "../components/Register/Register";
import WebView from "../components/WebView/WebView";
import { useGenerator } from "../hooks/useGenerator";
import { usePromptHistory } from "../hooks/usePromptHistory";
import { useTrial } from "../hooks/useTrial";
import { useUser } from "../hooks/useUser";
import { getPageThemeClasses } from "../services/theme/themes";

type MainProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

function openDialog(dialogId: string) {
  (document.getElementById(dialogId) as HTMLDialogElement | null)?.showModal();
}

export default function Main({ theme, onToggleTheme }: MainProps) {
  const generatorSectionRef = useRef<HTMLElement | null>(null);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const { mainBackground, ambientGlow } = getPageThemeClasses(theme);
  const { user, isUserLoggedIn, signOut } = useUser();
  const { history, addPrompt } = usePromptHistory();
  const { canGenerate, incrementTrial } = useTrial();
  const {
    text,
    setText,
    loading,
    htmlPage,
    promptStyle,
    setPromptStyle,
    generate,
  } = useGenerator({
    addPrompt,
    canGenerate,
    incrementTrial,
    isUserLoggedIn,
    onGenerateSuccess: () => setViewMode("preview"),
    onTrialLimitReached: () => {
      toast("Please sign in to continue generating pages.", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: theme === "dark" ? "#18181b" : "#fffdf7",
          color: theme === "dark" ? "#f8fafc" : "#111827",
          border: `1px solid ${theme === "dark" ? "#3f3f46" : "#e5e7eb"}`,
        },
      });
    },
  });

  const previewHtml = htmlPage.trim();
  const hasGeneratedPage = htmlPage.trim().length > 0;

  return (
    <main
      className={`min-h-screen overflow-hidden text-base-content ${mainBackground}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-10 ${ambientGlow}`}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10 lg:py-10">
        <Header
          theme={theme}
          onToggleTheme={onToggleTheme}
          actions={
            <div className="flex gap-2">
              {isUserLoggedIn ? (
                <div
                  className="cursor-pointer"
                  onClick={() => openDialog("profile_modal")}
                >
                  <img
                    src={user?.avatar_url}
                    referrerPolicy="no-referrer"
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                  />
                </div>
              ) : (
                <>
                  <Button
                    text="Sign In"
                    mode="code"
                    onClick={() => openDialog("my_modal_1")}
                  />
                  <Button
                    text="Sign Up"
                    onClick={() => openDialog("my_modal_1")}
                  />
                </>
              )}
            </div>
          }
        />

        <section
          id="generator"
          ref={generatorSectionRef}
          className="grid gap-6"
        >
          <div className="rounded-[2rem] border border-base-300/70 bg-base-100/82 p-6 shadow-[0_24px_90px_rgba(148,163,184,0.14)] backdrop-blur xl:p-7">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/45">
                Generator
              </p>
              <h2 className="mt-2 text-3xl font-black">
                Describe the page you want
              </h2>
              <p className="mt-3 leading-7 text-base-content/68">
                Start with a product, audience, and tone. Oopsyy will generate a
                landing page draft you can preview instantly and export as HTML.
              </p>
            </div>

            <Input
              text={text}
              loading={loading}
              isPromptStyle={promptStyle}
              setIsPromptStyle={setPromptStyle}
              handleTextChange={(event) => setText(event.target.value)}
              handleButtonClick={(prompt) => {
                void generate(prompt);
              }}
            />
          </div>

          <section
            id="demo"
            className="rounded-[2rem] border border-base-300/70 bg-base-100/82 p-6 shadow-[0_24px_90px_rgba(148,163,184,0.14)] backdrop-blur xl:p-7"
          >
            <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-base-content/45">
                  Demo
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  {hasGeneratedPage
                    ? "Review your generated result"
                    : "See how the generated page will look"}
                </h2>
                <p className="mt-3 text-base-content/68">
                  {hasGeneratedPage
                    ? "Switch between the live preview and raw HTML whenever you want to inspect the result."
                    : "The demo below shows an example landing page until you generate your own output."}
                </p>
              </div>

              <div className="flex gap-3 self-start rounded-[1.2rem] bg-base-200/80 p-2">
                <Button
                  mode="preview"
                  viewMode={viewMode}
                  onClick={() => setViewMode("preview")}
                  icon={<PanelTop />}
                />
                <Button
                  mode="code"
                  viewMode={viewMode}
                  onClick={() => setViewMode("code")}
                  icon={<Code />}
                />
                <Button
                  viewMode={viewMode}
                  onClick={() => {
                    void navigator.clipboard.writeText(previewHtml);
                    toast("HTML code copied to clipboard!", {
                      icon: "✅",
                      style: {
                        borderRadius: "10px",
                        background: theme === "dark" ? "#18181b" : "#fffdf7",
                        color: theme === "dark" ? "#f8fafc" : "#111827",
                        border: `1px solid ${theme === "dark" ? "#3f3f46" : "#e5e7eb"}`,
                      },
                    });
                  }}
                  icon={<Copy />}
                />
              </div>
            </div>

            <WebView htmlPage={previewHtml} viewMode={viewMode} />
          </section>
        </section>
      </div>

      <Toaster position="top-right" reverseOrder={true} />
      <Register />
      <Profile
        email={user?.email ?? ""}
        avatarUrl={user?.avatar_url}
        username={user?.name}
        promptUsageHistory={history}
        signOut={() => {
          void signOut();
        }}
      />
    </main>
  );
}
