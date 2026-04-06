export type AppTheme = "light" | "dark";

export function getPageThemeClasses(theme: AppTheme) {
  return {
    mainBackground:
      theme === "dark"
        ? "bg-[linear-gradient(180deg,#09090b_0%,#111827_46%,#09090b_100%)]"
        : "bg-[linear-gradient(180deg,#fffdf7_0%,#f6f9fc_46%,#ffffff_100%)]",
    ambientGlow:
      theme === "dark"
        ? "bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(250,204,21,0.1),_transparent_24%)]"
        : "bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(245,158,11,0.14),_transparent_24%)]",
  };
}
