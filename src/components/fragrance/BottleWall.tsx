import { useNavigate } from "react-router-dom";
import type { Fragrance } from "../../types/fragrance";
import { FragranceBottle } from "./FragranceBottle";

interface Props {
  fragrances: Fragrance[];
  filteredIds?: Set<string>;
  selectedId?: string;
  onSelect: (fragrance: Fragrance) => void;
  onDeselect: () => void;
}

export function BottleWall({ fragrances, filteredIds, selectedId, onSelect, onDeselect }: Props) {
  const navigate = useNavigate();

  return (
    <div className="px-6 py-4" onClick={onDeselect}>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(auto-fill, 40px)" }}
      >
        {fragrances.map((f) => (
          <BottleCell
            key={f.id}
            fragrance={f}
            selected={f.id === selectedId}
            dimmed={filteredIds !== undefined && !filteredIds.has(f.id)}
            onSelect={(e) => { e.stopPropagation(); onSelect(f); }}
            onOpen={() => navigate(`/fragrance/${f.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function BottleCell({
  fragrance,
  selected,
  dimmed,
  onSelect,
  onOpen,
}: {
  fragrance: Fragrance;
  selected: boolean;
  dimmed: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onOpen: () => void;
}) {
  return (
    <div
      className="relative group cursor-pointer"
      style={{
        width: 40,
        height: 60,
        opacity: dimmed ? 0.2 : 1,
        filter: dimmed ? "saturate(0)" : "none",
        transition: `opacity var(--duration-fast) var(--ease-soft), filter var(--duration-fast) var(--ease-soft)`,
        outline: selected ? "2px solid var(--icon-active)" : "none",
        outlineOffset: 2,
        borderRadius: 4,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (e.detail >= 2) {
          onOpen();
        } else {
          onSelect(e);
        }
      }}
    >
      <FragranceBottle families={fragrance.families} />

      <div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1
                    rounded text-xs whitespace-nowrap pointer-events-none z-10
                    opacity-0 group-hover:opacity-100"
        style={{
          backgroundColor: "var(--surface-primary)",
          color: "var(--text-primary)",
          boxShadow: "var(--shadow-soft)",
          backdropFilter: "blur(var(--glass-blur))",
          transition: `opacity var(--duration-fast) var(--ease-soft)`,
        }}
      >
        {fragrance.name} · {fragrance.brand}
      </div>
    </div>
  );
}