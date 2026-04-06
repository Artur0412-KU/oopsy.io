import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import { getPageThemeClasses } from "../services/theme/themes";
import DemoGIF from "../assets/cdcc5c28ceb8fa917448ccc908b21d65.gif";

type LandingProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export default function Landing({ theme, onToggleTheme }: LandingProps) {
  const { mainBackground, ambientGlow } = getPageThemeClasses(theme);

  return (
    <main
      className={`min-h-screen overflow-hidden text-base-content ${mainBackground}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-10 ${ambientGlow}`}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-8 lg:px-10 lg:py-10">
        <Header
          theme={theme}
          onToggleTheme={onToggleTheme}
          actions={
            <Link to="/main" className="btn btn-outline rounded-full px-6">
              Get Started
            </Link>
          }
        />

        <section className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.96] tracking-tight md:text-6xl">
              Generate a polished 404 page from a single prompt.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-base-content/72">
              Oopsyy.io turns a simple idea into a custom 404 page with clear
              messaging, visual direction, and ready-to-preview output. Try the
              demo, review the result, and open the app when you are ready.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link to="/main" className="btn btn-primary rounded-full px-7">
                Get Started
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={DemoGIF} alt="gif" className="rounded-xl " />
          </div>
        </section>

        <section className="rounded-[2rem] bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] px-8 py-12 text-neutral-content shadow-[0_28px_100px_rgba(15,23,42,0.26)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-content/70">
            Start now
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight text-neutral-content">
            Try the app demo and start generating your own 404 pages.
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-neutral-content/78">
            Go from idea to preview in seconds, then open the app and create a
            branded 404 page for your product.
          </p>

          <div className="mt-8">
            <Link
              to="/main"
              className="btn btn-accent rounded-full px-7 text-accent-content"
            >
              Get Started
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
