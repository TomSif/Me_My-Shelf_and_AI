import { useState } from "react";
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

const hoverHandlers = (set: (v: boolean) => void) => ({
  onMouseEnter: () => set(true),
  onMouseLeave: () => set(false),
});

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
  const [hovered, setHovered] = useState(false);
  const elevated = active || hovered;

  const border = elevated ? BORDER_ON : BORDER_OFF;
  const shadow = elevated ? SHADOW_ON : SHADOW_OFF;
  const bg = elevated ? BG_ON : "var(--bg-chip)";
  const scale = elevated ? "scale(1.02)" : "scale(1)";

  // Mode vertical
  if (layout === "vertical" && icon) {
    return (
      <button
        type="button"
        onClick={onClick}
        {...hoverHandlers(setHovered)}
        className={`flex flex-col items-center gap-1.5 px-2 py-2.5 rounded-xl transition-all duration-150 ease-out ${className ?? ""}`}
        style={{
          background: bg,
          border: `1px solid ${border}`,
          boxShadow: shadow,
          transform: scale,
        }}
      >
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
        {children && (
          <span
            className="text-[10px] capitalize flex items-center justify-center"
            style={{
              color: "var(--text-secondary)",
              fontWeight: active ? 600 : 400,
              lineHeight: 1,
              height: "1.2em",
            }}
          >
            {children}
          </span>
        )}
      </button>
    );
  }

  // Mode cercle (saisons) — stone inactif, couleur active
  if (icon && !children) {
    return (
      <button
        type="button"
        onClick={onClick}
        {...hoverHandlers(setHovered)}
        className={`flex items-center justify-center rounded-full transition-all duration-150 ease-out ${className ?? ""}`}
        style={{
          background: bg,
          border: `1px solid ${border}`,
          boxShadow: shadow,
          padding: iconPadding,
          transform: scale,
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
      {...hoverHandlers(setHovered)}
      className={`items-center px-4 py-3 rounded-2xl text-xs capitalize transition-all duration-150 ease-out ${className ?? ""}`}
      style={{
        display: "grid",
        gridTemplateColumns: icon ? "18px 1fr" : "1fr",
        columnGap: "0.625rem",
        background: bg,
        border: `1px solid ${border}`,
        color: "var(--text-chip)",
        fontWeight: active ? 600 : 400,
        boxShadow: shadow,
        transform: scale,
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
