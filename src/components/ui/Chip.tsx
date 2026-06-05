import type { ReactNode } from "react";

interface ChipProps {
  active?: boolean;
  color?: string; // couleur famille — utilisée en variant "color"
  icon?: ReactNode;
  onClick?: () => void;
  children?: ReactNode; // absent = mode cercle icon-only
  iconPadding?: string;
  layout?: "horizontal" | "vertical";
  variant?: "color" | "stone"; // "stone" = gravure monochrome, "color" = couleur famille
  className?: string;
}

const BORDER_OFF = "rgba(120,100,80,.12)";
const BORDER_ON = "#e3aa3a";
const BG_ON = "linear-gradient(45deg, #f8f5f1 5%)";
const SHADOW_ON =
  "2px 1px 5px rgba(232,178,61,0.08), 0 1px 2px rgba(0,0,0,.08)";
const SHADOW_OFF = "0 1px 2px rgba(0,0,0,.04)";

// Stone : ton neutre proche du fond + drop-shadow qui simule la gravure
const STONE_COLOR_OFF = "#74645a";
const STONE_COLOR_ON = "#E8B23D";
// Lumière en bas, ombre légère en haut = illusion de relief creusé
const STONE_FILTER = "drop-shadow(0 0.5px 0 rgba(255,255,255,.75))";

export function Chip({
  active,
  color,
  icon,
  onClick,
  children,
  iconPadding = "0.75rem",
  layout = "horizontal",
  variant = "color",
  className,
}: ChipProps) {
  const border = active ? BORDER_ON : BORDER_OFF;
  const shadow = active ? SHADOW_ON : SHADOW_OFF;

  // Couleur et filtre de l'icône selon le variant
  const iconColor =
    variant === "stone"
      ? active
        ? STONE_COLOR_ON
        : STONE_COLOR_OFF
      : (color ?? "#8D8177");
  const iconFilter = variant === "stone" ? STONE_FILTER : undefined;

  const iconSpan = (
    <span
      style={{
        color: iconColor,
        filter: iconFilter,
        display: "flex",
        transform: active ? "scale(1.15)" : "scale(1)",
        transition: "color .18s ease, transform .18s ease",
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

  // Mode cercle
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
          transform: active ? "scale(1.02)" : "scale(1)",
        }}
      >
        {iconSpan}
      </button>
    );
  }

  // Mode pill horizontal
  return (
    <button
      type="button"
      onClick={onClick}
      className={`items-center px-4 py-3 rounded-2xl text-xs capitalize transition-all duration-150 ease-out ${className ?? ""}`}
      style={{
        display: "grid",
        gridTemplateColumns: icon ? "14px 1fr" : "1fr",
        columnGap: "0.625rem",
        background: active ? BG_ON : "var(--bg-chip)",
        border: `1px solid ${border}`,
        color: "var(--text-chip)",
        fontWeight: active ? 600 : 400,
        boxShadow: shadow,
      }}
    >
      {icon && (
        <span className="flex items-center justify-center">{iconSpan}</span>
      )}
      <span className="text-left leading-none">{children}</span>
    </button>
  );
}
