import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Fragrance } from "../../types/fragrance";
import { useFragrancesStore, isWornToday } from "../../stores/fragrancesStore";
import { FragranceBottle } from "./FragranceBottle";

interface Props {
  fragrances: Fragrance[];
  filteredIds?: Set<string>;
  selectedId?: string;
  onSelect: (fragrance: Fragrance) => void;
  onDeselect: () => void;
}

type ContextMenu = { x: number; y: number; fragrance: Fragrance };

export function BottleWall({ fragrances, filteredIds, selectedId, onSelect, onDeselect }: Props) {
  const navigate = useNavigate();
  const { wearToday, unwearToday } = useFragrancesStore();
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);

  useEffect(() => {
    if (!contextMenu) return;
    function close() { setContextMenu(null); }
    window.addEventListener("click", close);
    window.addEventListener("keydown", (e) => e.key === "Escape" && close());
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", close as unknown as EventListener);
    };
  }, [contextMenu]);

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
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setContextMenu({ x: e.clientX, y: e.clientY, fragrance: f });
            }}
          />
        ))}
      </div>

      {/* Menu contextuel clic droit */}
      {contextMenu && (
        <div
          className="fixed z-50 rounded-lg py-1 text-xs"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "var(--surface-primary)",
            boxShadow: "var(--shadow-soft)",
            border: "1px solid var(--border-light)",
            minWidth: 160,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {(() => {
            const worn = isWornToday(contextMenu.fragrance);
            return (
              <button
                type="button"
                className="w-full text-left px-3 py-1.5 transition-colors"
                style={{ color: worn ? "var(--text-muted)" : "var(--text-primary)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--search-bg)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                onClick={() => {
                  worn
                    ? unwearToday(contextMenu.fragrance.id)
                    : wearToday(contextMenu.fragrance.id);
                  setContextMenu(null);
                }}
              >
                {worn ? "Porté aujourd'hui ✓" : "Porter aujourd'hui"}
              </button>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function BottleCell({
  fragrance,
  selected,
  dimmed,
  onSelect,
  onOpen,
  onContextMenu,
}: {
  fragrance: Fragrance;
  selected: boolean;
  dimmed: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onOpen: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
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
      onContextMenu={onContextMenu}
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