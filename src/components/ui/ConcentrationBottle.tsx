import type { Concentration } from "../../types/fragrance";

const LIQUID_HEIGHT: Record<Concentration, number> = {
  cologne: 4,
  "eau de toilette": 10,
  "eau de parfum": 17,
  parfum: 24,
  extrait: 30,
};

// bottom edge de l'intérieur du corps (rect y=20 height=34 → y=54, moins stroke)
const BODY_BOTTOM = 53;

const AMBER = "#f0c373";
const STONE = "#cccccc"; // warm stone — neutre, pas de couleur

interface Props {
  concentration: Concentration;
  size?: number;
  active?: boolean;
}

export function ConcentrationBottle({
  concentration,
  size = 1,
  active = false,
}: Props) {
  const w = 40 * size;
  const h = 60 * size;

  const liqH = LIQUID_HEIGHT[concentration];
  const liqY = BODY_BOTTOM - liqH;
  const liqColor = active ? AMBER : STONE;
  const liqOpacity = active ? 0.75 : 0.35;

  const showNeckLiquid =
    concentration === "parfum" || concentration === "extrait";

  // ID unique par concentration — safe pour les 5 valeurs distinctes du FilterPanel
  const clipId = `bb-${concentration.replace(/\s/g, "-")}`;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="10" y="20" width="20" height="34" rx="3" />
        </clipPath>
      </defs>

      {/* Bouchon */}
      <rect
        x="14"
        y="3"
        width="12"
        height="7"
        rx="2"
        fill="var(--bottle-glass)"
        fillOpacity={0.9}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Col — liquide visible seulement pour parfum / extrait */}
      <rect
        x="16"
        y="9"
        width="8"
        height="8"
        rx="1.5"
        fill={showNeckLiquid ? liqColor : "var(--bottle-glass)"}
        fillOpacity={showNeckLiquid ? liqOpacity * 0.6 : 0.6}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Épaules */}
      <path
        d="M14 17 Q12 18 11 20 L29 20 Q28 18 26 17 Z"
        fill="var(--bottle-glass)"
        fillOpacity={0.6}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Corps — fond verre */}
      <rect
        x="10"
        y="20"
        width="20"
        height="34"
        rx="3"
        fill="var(--bottle-glass)"
        fillOpacity={0.4}
        stroke="var(--bottle-outline)"
        strokeWidth="0.8"
      />

      {/* Liquide — hauteur variable, clippé dans le corps pour respecter le rx */}
      <rect
        x="10"
        y={liqY}
        width="20"
        height={liqH}
        fill={liqColor}
        fillOpacity={liqOpacity}
        clipPath={`url(#${clipId})`}
      />

      {/* Reflet */}
      <rect
        x="12"
        y="22"
        width="4"
        height="18"
        rx="2"
        fill="var(--bottle-highlight)"
        opacity={0.9}
      />
    </svg>
  );
}
