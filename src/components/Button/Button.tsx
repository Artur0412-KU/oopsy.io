type ButtonProps = {
  mode?: "preview" | "code";
  viewMode?: "preview" | "code";
  onClick: () => void;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
};

export default function Button({
  mode,
  viewMode,
  onClick,
  text,
  icon,
  className,
}: ButtonProps) {
  const currentViewMode = viewMode ?? mode ?? "preview";
  const isActive = currentViewMode === mode;

  return (
    <button
      onClick={onClick}
      className={`btn rounded-[1rem] px-5 ${
        isActive
          ? "btn-neutral border-neutral text-neutral-content shadow-sm"
          : "border border-base-300 bg-base-100 text-base-content/75 shadow-sm hover:bg-base-200"
      } ${className}`}
    >
      {text}
      {icon}
    </button>
  );
}
