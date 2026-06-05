import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Filter,
  BookMarked,
  Sparkles,
  Heart,
  BarChart2,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { FilterPanel } from "../fragrance/FilterPanel";
import { ShelfPanel } from "../fragrance/ShelfPanel";
import { useFragrancesStore } from "../../stores/fragrancesStore";

const NAV_ITEMS = [
  {
    label: "Étagères",
    icon: BookMarked,
    section: "etageres" as Section | null,
  },
  { label: "IA", icon: Sparkles, section: null },
  { label: "Favoris", icon: Heart, section: null },
  { label: "Stats", icon: BarChart2, section: null },
  { label: "Réglages", icon: Settings, section: null },
];

type Section = "filtres" | "etageres";

function getInitialOpen(): boolean {
  try {
    return localStorage.getItem("atelier-open") === "true";
  } catch {
    return false;
  }
}

function saveOpen(value: boolean) {
  try {
    localStorage.setItem("atelier-open", String(value));
  } catch { /* ignore */ }
}

function getInitialSection(): Section {
  try {
    const v = localStorage.getItem("atelier-section");
    return v === "etageres" ? "etageres" : "filtres";
  } catch {
    return "filtres";
  }
}

function saveSection(value: Section) {
  try {
    localStorage.setItem("atelier-section", value);
  } catch { /* ignore */ }
}

export function Atelier() {
  const [isOpen, setIsOpen] = useState(getInitialOpen);
  const [section, setSection] = useState<Section>(getInitialSection);

  function open(s?: Section) {
    setIsOpen(true);
    saveOpen(true);
    if (s) {
      setSection(s);
      saveSection(s);
    }
  }

  function close() {
    setIsOpen(false);
    saveOpen(false);
  }

  function changeSection(s: Section) {
    setSection(s);
    saveSection(s);
  }

  return (
    <aside
      className="flex flex-col shrink-0 overflow-hidden"
      style={{
        width: isOpen ? 300 : 48,
        transition: "width 200ms ease-out",
        borderRight: "1px solid var(--border-light)",
        backgroundColor: "var(--surface-secondary)",
      }}
    >
      {isOpen ? (
        <AtelierOpen
          section={section}
          onSectionChange={changeSection}
          onClose={close}
        />
      ) : (
        <AtelierClosed onOpen={open} />
      )}
    </aside>
  );
}

function AtelierOpen({
  section,
  onSectionChange,
  onClose,
}: {
  section: Section;
  onSectionChange: (s: Section) => void;
  onClose: () => void;
}) {
  const { selectionCount } = useFragrancesStore();

  const title = section === "etageres" ? "my-shelfs" : "L'Atelier";
  const subtitle =
    section === "etageres"
      ? "Gérez vos vues et sélections"
      : "Composez votre collection";

  return (
    <div className="flex flex-col h-full" style={{ width: 300, minWidth: 300 }}>
      {/* En-tête */}
      <div
        className="flex items-start justify-between px-4 pt-4 pb-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border-light)" }}
      >
        <div className="flex flex-col gap-0.5">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {subtitle}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 rounded-md flex items-center justify-center mt-0.5"
          style={{ color: "var(--text-muted)" }}
          title="Fermer l'Atelier"
        >
          <ChevronLeft size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-hidden">
        {section === "etageres" ? (
          <ShelfPanel />
        ) : (
          <div
            className="h-full no-scrollbar px-4 py-2"
            style={{ overflowY: "auto" }}
          >
            <FilterPanel />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div
        className="flex flex-col gap-0.5 px-2 pb-4 pt-2 shrink-0"
        style={{ borderTop: "1px solid rgba(29,27,25,0.06)" }}
      >
        {NAV_ITEMS.map(({ label, icon: Icon, section: itemSection }) => {
          const isActive = itemSection !== null && itemSection === section;
          return (
            <button
              key={label}
              type="button"
              onClick={() =>
                itemSection ? onSectionChange(itemSection) : undefined
              }
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs text-left w-full"
              style={{
                color: isActive
                  ? "var(--icon-active)"
                  : "var(--icon-secondary)",
                backgroundColor: isActive
                  ? "color-mix(in srgb, var(--icon-active) 10%, transparent)"
                  : "transparent",
                opacity: itemSection ? 1 : 0.45,
              }}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={14} strokeWidth={1.5} />
                <span>{label}</span>
              </div>
              {label === "Étagères" && selectionCount > 0 && (
                <span
                  className="h-4 min-w-4 px-1 rounded-full flex items-center justify-center text-[10px] font-medium leading-none"
                  style={{
                    backgroundColor: "var(--icon-active)",
                    color: "#fff",
                  }}
                >
                  {selectionCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NavIcon({
  icon: Icon,
  title,
  onClick,
  active = false,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  onClick: () => void;
  active?: boolean;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
      style={{
        color: active ? "var(--icon-active)" : "var(--icon-secondary)",
        backgroundColor: active
          ? "color-mix(in srgb, var(--icon-active) 12%, transparent)"
          : "transparent",
      }}
      title={title}
    >
      <Icon size={24} strokeWidth={1.8} />
      {badge !== undefined && badge > 0 && (
        <span
          className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full flex items-center justify-center text-[10px] font-medium leading-none"
          style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function AtelierClosed({ onOpen }: { onOpen: (s?: Section) => void }) {
  const routerNavigate = useNavigate();
  const { selectionCount } = useFragrancesStore();

  return (
    <div
      className="flex flex-col items-center gap-2 py-4"
      style={{ width: 48, minWidth: 48 }}
    >
      <NavIcon
        icon={Home}
        title="Collection"
        onClick={() => routerNavigate("/")}
      />
      <NavIcon
        icon={Filter}
        title="Filtrer"
        onClick={() => onOpen("filtres")}
      />

      <div
        className="w-5 my-1"
        style={{ height: 1, backgroundColor: "var(--border-chip)" }}
      />

      {NAV_ITEMS.map(({ label, icon: Icon, section: itemSection }) => (
        <NavIcon
          key={label}
          icon={Icon}
          title={label}
          onClick={() => (itemSection ? onOpen(itemSection) : undefined)}
          badge={label === "Étagères" ? selectionCount : undefined}
        />
      ))}
    </div>
  );
}
