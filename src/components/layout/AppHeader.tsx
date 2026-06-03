import { useState, useRef, useEffect } from "react";
import type { SortCriterion, SortDirection } from "../../types/fragrance";
import { useFragrancesStore } from "../../stores/fragrancesStore";

interface Props {
  count?: number;
  incompleteCount?: number;
  onQuickAdd?: () => void;
  onIncompleteBadgeClick?: () => void;
}

type SortOption = {
  criterion: SortCriterion;
  label: string;
  directions?: { asc: string; desc: string };
};

const SORT_OPTIONS: SortOption[] = [
  { criterion: "none",         label: "Aucun tri" },
  { criterion: "alphabetic",   label: "Alphabétique",        directions: { asc: "A → Z",             desc: "Z → A" } },
  { criterion: "createdAt",    label: "Date d'ajout",        directions: { asc: "Ancien → récent",    desc: "Récent → ancien" } },
  { criterion: "rating",       label: "Note",                directions: { asc: "Moins bon → meilleur", desc: "Meilleur → moins bon" } },
  { criterion: "purchaseDate", label: "Date d'achat",        directions: { asc: "Ancien → récent",    desc: "Récent → ancien" } },
  { criterion: "lastUsed",     label: "Dernière utilisation",directions: { asc: "Ancien → récent",    desc: "Récent → ancien" } },
  { criterion: "purchasePrice",label: "Prix",                directions: { asc: "Moins cher → plus cher", desc: "Plus cher → moins cher" } },
  { criterion: "random",       label: "Aléatoire" },
];

function getSortLabel(criterion: SortCriterion, direction: SortDirection): string {
  const opt = SORT_OPTIONS.find((o) => o.criterion === criterion);
  if (!opt) return "Trier";
  if (!opt.directions) return opt.label;
  return `${opt.label} · ${opt.directions[direction]}`;
}

export function AppHeader({ count, incompleteCount, onQuickAdd, onIncompleteBadgeClick }: Props) {
  const { sortState, setSortState, searchQuery, setSearchQuery } = useFragrancesStore();
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  // subMenuCriterion : quel sous-menu est affiché — verrouillé sur le dernier critère survolé
  // Ne se réinitialise PAS quand la souris quitte un bouton individuel (fix diagonal cursor)
  const [subMenuCriterion, setSubMenuCriterion] = useState<SortCriterion>(sortState.criterion);
  const [highlightedCriterion, setHighlightedCriterion] = useState<SortCriterion | null>(null);
  const [highlightedDir, setHighlightedDir] = useState<SortDirection | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setSubMenuCriterion(sortState.criterion);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function handleSelect(criterion: SortCriterion, direction?: SortDirection) {
    if (criterion === "random") {
      setSortState({ criterion: "random", direction: "asc" });
    } else {
      setSortState({ criterion, direction: direction! });
    }
    setOpen(false);
  }

  const activeOption = SORT_OPTIONS.find((o) => o.criterion === subMenuCriterion);
  const isDefaultSort = sortState.criterion === "none";

  return (
    <header
      className="flex items-center gap-4 px-6 py-3 shrink-0"
      style={{
        backgroundColor: "var(--header-bg)",
        borderBottom: "1px solid var(--header-border)",
        backdropFilter: "blur(var(--glass-blur))",
      }}
    >
      <span
        className="text-sm font-medium tracking-wide shrink-0"
        style={{ color: "var(--text-primary)" }}
      >
        my-shelf and AI
      </span>

      <div
        className="flex-1 max-w-xs h-7 rounded-full px-3 flex items-center gap-1.5"
        style={{ backgroundColor: "var(--search-bg)" }}
      >
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un parfum…"
          className="flex-1 bg-transparent text-xs outline-none min-w-0 placeholder:text-(--text-muted)"
          style={{ color: "var(--text-primary)" }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => { setSearchQuery(""); searchRef.current?.focus(); }}
            className="shrink-0 text-xs leading-none"
            style={{ color: "var(--text-muted)" }}
            aria-label="Effacer la recherche"
          >
            ×
          </button>
        )}
      </div>

      {/* Sort dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-full text-xs transition-colors"
          style={{
            backgroundColor: open || !isDefaultSort ? "var(--icon-active)" : "var(--search-bg)",
            color: open || !isDefaultSort ? "#fff" : "var(--text-muted)",
          }}
        >
          <span>↕</span>
          <span>{isDefaultSort ? "Trier" : getSortLabel(sortState.criterion, sortState.direction)}</span>
        </button>

        {open && (
          <div
            className="absolute top-full mt-1.5 left-0 z-50 flex rounded-lg overflow-hidden text-xs"
            style={{
              backgroundColor: "var(--surface-primary)",
              boxShadow: "var(--shadow-soft)",
              border: "1px solid var(--header-border)",
              minWidth: 160,
            }}
          >
            {/* Colonne critères */}
            <div className="flex flex-col py-1" style={{ minWidth: 160 }}>
              {SORT_OPTIONS.map((opt) => {
                const isActive = sortState.criterion === opt.criterion;
                const isHighlighted = highlightedCriterion === opt.criterion;
                return (
                  <button
                    key={opt.criterion}
                    type="button"
                    className="flex items-center justify-between gap-2 px-3 py-1.5 text-left transition-colors"
                    style={{
                      color: isActive ? "var(--icon-active)" : "var(--text-primary)",
                      backgroundColor: isHighlighted ? "var(--search-bg)" : "transparent",
                    }}
                    onMouseEnter={() => {
                      setHighlightedCriterion(opt.criterion);
                      setSubMenuCriterion(opt.criterion);
                    }}
                    onMouseLeave={() => setHighlightedCriterion(null)}
                    onClick={() => {
                      if (opt.criterion === "none") handleSelect("none");
                      else if (opt.criterion === "random") handleSelect("random");
                    }}
                  >
                    <span>{opt.label}</span>
                    {opt.directions && <span style={{ color: "var(--text-muted)" }}>›</span>}
                    {!opt.directions && isActive && <span style={{ color: "var(--icon-active)" }}>✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Colonne sous-menu directions */}
            {activeOption?.directions && (
              <div
                className="flex flex-col py-1 border-l"
                style={{ borderColor: "var(--header-border)", minWidth: 180 }}
              >
                {(["asc", "desc"] as SortDirection[]).map((dir) => {
                  const isActive = sortState.criterion === subMenuCriterion && sortState.direction === dir;
                  const isHighlighted = highlightedDir === dir;
                  return (
                    <button
                      key={dir}
                      type="button"
                      className="flex items-center justify-between gap-2 px-3 py-1.5 text-left transition-colors focus:outline-none"
                      style={{
                        color: isActive ? "var(--icon-active)" : "var(--text-primary)",
                        backgroundColor: isHighlighted ? "var(--search-bg)" : "transparent",
                      }}
                      onMouseEnter={() => setHighlightedDir(dir)}
                      onMouseLeave={() => setHighlightedDir(null)}
                      onFocus={() => setHighlightedDir(dir)}
                      onBlur={() => setHighlightedDir(null)}
                      onClick={() => handleSelect(subMenuCriterion, dir)}
                    >
                      <span>{activeOption.directions![dir]}</span>
                      {isActive && <span style={{ color: "var(--icon-active)" }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">
        {count !== undefined && (
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {count} parfum{count > 1 ? "s" : ""}
          </span>
        )}
        {incompleteCount !== undefined && incompleteCount > 0 && (
          <button
            type="button"
            onClick={onIncompleteBadgeClick}
            className="h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center text-xs font-medium leading-none transition-opacity"
            style={{
              backgroundColor: "var(--icon-active)",
              color: "#fff",
              opacity: 0.85,
            }}
            title={`${incompleteCount} parfum${incompleteCount > 1 ? "s" : ""} incomplet${incompleteCount > 1 ? "s" : ""}`}
          >
            {incompleteCount}
          </button>
        )}
        {onQuickAdd && (
          <button
            type="button"
            onClick={onQuickAdd}
            className="w-7 h-7 rounded-full flex items-center justify-center text-base leading-none transition-colors"
            style={{
              backgroundColor: "var(--icon-active)",
              color: "#fff",
            }}
            title="Ajout rapide"
          >
            +
          </button>
        )}
      </div>
    </header>
  );
}
