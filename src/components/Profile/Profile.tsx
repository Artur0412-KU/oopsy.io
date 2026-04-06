import { useMemo } from "react";
import Button from "../Button/Button";

type PromptUsageEntry = {
  prompt: string;
  promptLength: number;
  style: string;
  createdAt: string;
};

type ProfileProps = {
  avatarUrl?: string;
  username?: string;
  email: string;
  promptUsageHistory?: PromptUsageEntry[];
  signOut?: () => void;
};

const DAYS_TO_SHOW = 7;

function formatShortDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
  });
}

export default function Profile({
  avatarUrl,
  username,
  email,
  promptUsageHistory = [],
  signOut,
}: ProfileProps) {
  const usageSummary = useMemo(() => {
    const today = new Date();
    const dailyUsage = Array.from({ length: DAYS_TO_SHOW }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (DAYS_TO_SHOW - index - 1));
      const key = date.toISOString().slice(0, 10);

      return {
        key,
        label: formatShortDate(date),
        count: 0,
      };
    });

    const dayIndexMap = new Map(
      dailyUsage.map((entry, index) => [entry.key, index] as const),
    );
    const styleUsageMap = new Map<string, number>();

    let totalCharacters = 0;
    let longestPrompt = 0;

    for (const entry of promptUsageHistory) {
      totalCharacters += entry.promptLength;
      longestPrompt = Math.max(longestPrompt, entry.promptLength);

      const dayKey = entry.createdAt.slice(0, 10);
      const dayIndex = dayIndexMap.get(dayKey);
      if (dayIndex !== undefined) {
        dailyUsage[dayIndex].count += 1;
      }

      const styleLabel =
        entry.style && entry.style !== "Choose a style"
          ? entry.style
          : "No style";
      styleUsageMap.set(styleLabel, (styleUsageMap.get(styleLabel) ?? 0) + 1);
    }

    const styleUsage = [...styleUsageMap.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((left, right) => right.count - left.count)
      .slice(0, 4);

    const totalPrompts = promptUsageHistory.length;
    const averagePromptLength = totalPrompts
      ? Math.round(totalCharacters / totalPrompts)
      : 0;
    const peakDay = dailyUsage.reduce((peak, current) =>
      current.count > peak.count ? current : peak,
    );
    const maxDailyCount = Math.max(
      ...dailyUsage.map((entry) => entry.count),
      1,
    );

    return {
      averagePromptLength,
      dailyUsage,
      longestPrompt,
      maxDailyCount,
      peakDay,
      styleUsage,
      totalCharacters,
      totalPrompts,
    };
  }, [promptUsageHistory]);

  return (
    <dialog id="profile_modal" className="modal">
      <div className="modal-box max-w-4xl rounded-[2rem] border border-base-300/70 bg-base-100/95 p-0 shadow-[0_24px_90px_rgba(15,23,42,0.18)] backdrop-blur">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
            ✕
          </button>
        </form>

        <div className="grid gap-0 lg:grid-cols-[280px,minmax(0,1fr)]">
          <div className="flex flex-col items-center gap-4 border-b border-base-300/70 bg-base-200/40 px-6 py-8 text-center lg:border-b-0 lg:border-r">
            <img
              src={avatarUrl}
              alt="avatar"
              className="h-24 w-24 rounded-full border border-base-300 object-cover"
            />
            <div className="space-y-1">
              <h2 className="text-xl font-bold">
                {username || "Anonymous user"}
              </h2>
              <p className="text-sm text-base-content/60">{email}</p>
            </div>

            <div className="grid w-full gap-3">
              <div className="rounded-[1.25rem] border border-base-300/80 bg-base-100/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45">
                  Total prompts
                </p>
                <p className="mt-2 text-3xl font-black">
                  {usageSummary.totalPrompts}
                </p>
              </div>

              <div className="rounded-[1.25rem] border border-base-300/80 bg-base-100/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/45">
                  Avg length
                </p>
                <p className="mt-2 text-3xl font-black">
                  {usageSummary.averagePromptLength}
                </p>
                <p className="mt-1 text-xs text-base-content/55">characters</p>
              </div>
            </div>

            <Button
              text="Sign Out"
              onClick={() => {
                (
                  document.getElementById(
                    "profile_modal",
                  ) as HTMLDialogElement | null
                )?.close();
                signOut?.();
              }}
              viewMode="code"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </dialog>
  );
}
