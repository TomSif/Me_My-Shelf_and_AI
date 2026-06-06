import type { ReactNode } from "react";

interface ChipProps {
  active?: boolean;
  color?: string; // couleur famille — dot indicateur actif
  icon?: ReactNode;
  onClick?: () => void;
  children?: ReactNode; // absent = mode cercle icon-only
  iconPadding?: string;
  layout?: "horizontal" | "vertical";
  className?: string;
}

const BORDER_OFF = "rgba(120,100,80,.12)";
const BORDER_ON = "rgba(100,80,60,.32)";
const BG_ON = "#fdfcf8"; // blanc très légèrement teinté
const SHADOW_ON = "0 1px 3px rgba(0,0,0,.10)";
const SHADOW_OFF = "0 1px 2px rgba(0,0,0,.04)";
const STONE_OFF = "#74645a";
const STONE_CIRCLE_OFF = "#979188";
const STONE_FILTER = "drop-shadow(0 0.5px 0 rgba(255,255,255,.75))";

export function Chip({
  active,
  color,
  icon,
  onClick,
  children,
  iconPadding = "0.75rem",
  layout = "horizontal",
  className,
}: ChipProps) {
  const border = active ? BORDER_ON : BORDER_OFF;
  const shadow = active ? SHADOW_ON : SHADOW_OFF;

  const iconSpan = (
    <span
      style={{
        color: STONE_OFF,
        filter: STONE_FILTER,
        display: "flex",
        transform: active ? "scale(1.08)" : "scale(1)",
        transition: "transform .18s ease",
      }}
    >
      {icon}
    </span>
  );

  // Mode vertical
  if (layout === "vertical" && icon) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex flex-col items-center gap-1.5 px-2 py-2.5 rounded-xl transition-all duration-150 ease-out ${className ?? ""}`}
        style={{
          background: active ? BG_ON : "var(--bg-chip)",
          border: `1px solid ${border}`,
          boxShadow: shadow,
        }}
      >
        {iconSpan}
        {children && (
          <span
            className="text-[10px] leading-none capitalize"
            style={{
              color: "var(--text-secondary)",
              fontWeight: active ? 600 : 400,
            }}
          >
            {children}
          </span>
        )}
      </button>
    );
  }

  // Mode cercle (saisons) — stone inactif, couleur active (même logique que familles)
  if (icon && !children) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center justify-center rounded-full transition-all duration-150 ease-out ${className ?? ""}`}
        style={{
          background: active ? BG_ON : "var(--bg-chip)",
          border: `1px solid ${border}`,
          boxShadow: shadow,
          padding: iconPadding,
          transform: active ? "scale(1.06)" : "scale(1)",
        }}
      >
        <span
          style={{
            color: active ? (color ?? STONE_CIRCLE_OFF) : STONE_CIRCLE_OFF,
            filter: active ? undefined : STONE_FILTER,
            display: "flex",
            transition: "color .18s ease, transform .18s ease",
            transform: active ? "scale(1.08)" : "scale(1)",
          }}
        >
          {icon}
        </span>
      </button>
    );
  }

  // Mode pill horizontal (familles) — couleur famille actif, stone inactif
  return (
    <button
      type="button"
      onClick={onClick}
      className={`items-center px-4 py-3 rounded-2xl text-xs capitalize transition-all duration-150 ease-out ${className ?? ""}`}
      style={{
        display: "grid",
        gridTemplateColumns: icon ? "18px 1fr" : "1fr",
        columnGap: "0.625rem",
        background: active ? BG_ON : "var(--bg-chip)",
        border: `1px solid ${border}`,
        color: "var(--text-chip)",
        fontWeight: active ? 600 : 400,
        boxShadow: shadow,
      }}
    >
      {icon && (
        <span
          className="flex items-center justify-center"
          style={{
            color: active ? (color ?? STONE_OFF) : STONE_OFF,
            filter: active ? undefined : STONE_FILTER,
            transform: active ? "scale(1.16)" : "scale(0.95)",
            transition: "color .18s ease, transform .18s ease",
          }}
        >
          {icon}
        </span>
      )}
      <span className="text-left leading-none">{children}</span>
    </button>
  );
}
