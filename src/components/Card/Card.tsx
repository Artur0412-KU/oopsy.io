import { Check, Sparkles } from "lucide-react";

type CardProps = {
  title?: string;
  price?: string;
  description?: string;
  badge?: string;
  features?: string[];
  buttonText?: string;
  onClick?: () => void;
};

const defaultFeatures = [
  "Generate more landing pages without trial limits",
  "Keep your workflow moving with faster iteration",
  "Unlock a smoother experience for repeated launches",
  "Continue exporting production-ready HTML drafts",
];

export default function Card({
  title = "Pro Subscription",
  price = "$12",
  description = "Best for makers and small teams who want more room to generate, refine, and launch pages faster.",
  badge = "Most Popular",
  features = defaultFeatures,
  buttonText = "Upgrade Plan",
  onClick,
}: CardProps) {
  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-base-300/70 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),transparent_72%)] p-6 text-base-content shadow-[0_28px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-24 rounded-b-[2rem] " />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-info/20 bg-info/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-info">
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
          </div>
          <h2 className="mt-4 text-3xl font-black leading-tight">{title}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-base-content/70">
            {description}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-base-300/70 bg-base-100/70 px-4 py-3 text-right shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/45">
            Monthly
          </p>
          <div className="mt-2 flex items-end justify-end gap-1">
            <span className="text-4xl font-black leading-none">{price}</span>
            <span className="pb-1 text-sm text-base-content/60">/mo</span>
          </div>
        </div>
      </div>

      <div className="relative mt-6 rounded-[1.75rem] border border-base-300/70 bg-base-100/60 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-base-content/55">
          Included in the plan
        </p>

        <div className="mt-4 space-y-3">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                <Check className="h-3.5 w-3.5" />
              </div>
              <p className="text-sm leading-6 text-base-content/80">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-6 text-base-content/60">
          Upgrade when you are ready to keep generating without interruptions.
        </p>
        <button
          onClick={onClick}
          className="btn rounded-[1.2rem] border-none bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] px-6 text-white shadow-[0_18px_50px_rgba(29,78,216,0.28)] hover:opacity-95"
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
}
