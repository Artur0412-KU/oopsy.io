import type { ReactNode } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

type AppHeaderProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  subtitle?: string;
  actions?: ReactNode;
};

export default function Header({
  theme,
  onToggleTheme,
  subtitle,
  actions,
}: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <p className="text-2xl font-black tracking-tight">Oopsyy.io</p>
        <p className="text-sm text-base-content/65">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        {actions}
      </div>
    </header>
  );
}
