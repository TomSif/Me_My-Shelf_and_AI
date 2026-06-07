import { useRef } from "react";
import type { ElementType } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookMarked,
  Heart,
  BarChart2,
  Sparkles,
  Settings,
} from "lucide-react";
import { useFragrancesStore } from "../../stores/fragrancesStore";

interface Props {
  count?: number;
  incompleteCount?: number;
  onQuickAdd?: () => void;
  onIncompleteBadgeClick?: () => void;
}

const NAV_DESTINATIONS: { label: string; icon: ElementType; path: string | null }[] = [
  { label: "Collection", icon: Home, path: "/" },
  { label: "Shelf", icon: BookMarked, path: "/shelf" },
  { label: "Favoris", icon: Heart, path: null },
  { label: "Stats", icon: BarChart2, path: null },
  { label: "IA", icon: Sparkles, path: null },
  { label: "Réglages", icon: Settings, path: null },
];

export function AppHeader({ count, incompleteCount, onQuickAdd, onIncompleteBadgeClick }: Props) {
  const { searchQuery, setSearchQuery } = useFragrancesStore();
  const { pathname } = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);

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

      {/* Recherche — collée au logo */}
      <div
        className="w-64 shrink-0 h-7 rounded-full px-3 flex items-center gap-1.5"
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

      {/* Navigation — destinations, collées à droite */}
      <nav className="ml-auto flex items-center gap-1">
        {NAV_DESTINATIONS.map(({ label, icon, path }) => (
          <NavTab
            key={label}
            label={label}
            icon={icon}
            path={path}
            active={path !== null && pathname === path}
          />
        ))}
      </nav>

      {/* Droite */}
      <div className="flex items-center gap-3">
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

function NavTab({
  label,
  icon: Icon,
  path,
  active,
}: {
  label: string;
  icon: ElementType;
  path: string | null;
  active: boolean;
}) {
  const className =
    "flex items-center gap-1.5 h-7 px-3 rounded-full text-xs transition-colors";

  // Pas encore de page derrière — visible mais inerte (work in progress)
  if (!path) {
    return (
      <span
        className={`${className} cursor-default select-none`}
        style={{ color: "var(--text-ghost)" }}
        title={`${label} — à venir`}
      >
        <Icon size={15} strokeWidth={1.6} />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <Link
      to={path}
      className={className}
      style={{
        backgroundColor: active ? "var(--icon-active)" : "transparent",
        color: active ? "#fff" : "var(--text-muted)",
      }}
    >
      <Icon size={15} strokeWidth={1.6} />
      <span>{label}</span>
    </Link>
  );
}
