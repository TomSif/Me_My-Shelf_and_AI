import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronsUpDown } from "lucide-react";
import type { SortCriterion, SortDirection } from "../../types/fragrance";
import { useFragrancesStore } from "../../stores/fragrancesStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

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
  { criterion: "alphabetic",    label: "Alphabétique",          directions: { asc: "A → Z",                  desc: "Z → A" } },
  { criterion: "createdAt",     label: "Date d'ajout",          directions: { asc: "Ancien → récent",         desc: "Récent → ancien" } },
  { criterion: "rating",        label: "Note",                  directions: { asc: "Moins bon → meilleur",    desc: "Meilleur → moins bon" } },
  { criterion: "purchaseDate",  label: "Date d'achat",          directions: { asc: "Ancien → récent",         desc: "Récent → ancien" } },
  { criterion: "lastUsed",      label: "Dernière utilisation",  directions: { asc: "Ancien → récent",         desc: "Récent → ancien" } },
  { criterion: "purchasePrice", label: "Prix",                  directions: { asc: "Moins cher → plus cher",  desc: "Plus cher → moins cher" } },
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

  const isDefaultSort = sortState.criterion === "none";

  function select(criterion: SortCriterion, direction: SortDirection = "asc") {
    setSortState({ criterion, direction });
  }

  return (
    <header
      className="flex items-center gap-4 px-6 py-3 shrink-0"
      style={{
        backgroundColor: "var(--header-bg)",
        borderBottom: "1px solid var(--header-border)",
        backdropFilter: "blur(var(--glass-blur))",
        position: "relative",
        zIndex: 100,
      }}
    >
      <Link
        to="/"
        className="text-sm font-medium tracking-wide shrink-0"
        style={{ color: "var(--text-primary)", textDecoration: "none" }}
      >
        my-shelf and AI
      </Link>

      {/* Recherche */}
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

      {/* Dropdown tri */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1.5 h-7 px-2.5 rounded-full text-xs transition-colors"
            style={{
              backgroundColor: !isDefaultSort ? "var(--icon-active)" : "var(--search-bg)",
              color: !isDefaultSort ? "#fff" : "var(--text-muted)",
            }}
          >
            <ChevronsUpDown size={12} />
            <span>{isDefaultSort ? "Trier" : getSortLabel(sortState.criterion, sortState.direction)}</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Trier par</DropdownMenuLabel>

          <DropdownMenuItem
            onSelect={() => select("none")}
            data-active={sortState.criterion === "none" || undefined}
            className="data-active:text-(--icon-active)"
          >
            Aucun tri
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {SORT_OPTIONS.map((opt) => (
            <DropdownMenuSub key={opt.criterion}>
              <DropdownMenuSubTrigger
                data-active={sortState.criterion === opt.criterion || undefined}
                className="data-active:text-(--icon-active)"
              >
                {opt.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={sortState.criterion === opt.criterion ? sortState.direction : ""}
                >
                  <DropdownMenuRadioItem
                    value="asc"
                    onSelect={() => select(opt.criterion, "asc")}
                  >
                    {opt.directions!.asc}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="desc"
                    onSelect={() => select(opt.criterion, "desc")}
                  >
                    {opt.directions!.desc}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => select("random")}
            data-active={sortState.criterion === "random" || undefined}
            className="data-active:text-(--icon-active)"
          >
            Aléatoire
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Droite */}
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
            style={{ backgroundColor: "var(--icon-active)", color: "#fff", opacity: 0.85 }}
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
            style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}
            title="Ajout rapide"
          >
            +
          </button>
        )}
      </div>
    </header>
  );
}
