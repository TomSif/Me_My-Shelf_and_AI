import { useState } from "react";
import type { ElementType } from "react";
import {
  Filter,
  BookMarked,
  ChevronLeft,
} from "lucide-react";
import { FilterPanel } from "../fragrance/FilterPanel";
import { ShelfPanel } from "../fragrance/ShelfPanel";
import { useFragrancesStore } from "../../stores/fragrancesStore";

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
  const { selectionCount } = useFragrancesStore();

  function open(s: Section) {
    setIsOpen(true);
    saveOpen(true);
    setSection(s);
    saveSection(s);
  }

  function close() {
    setIsOpen(false);
    saveOpen(false);
  }

  function toggle(s: Section) {
    if (isOpen && section === s) close();
    else open(s);
  }

  return (
    <>
      {/* Nav permanente — toujours visible, jamais masquée par le panel */}
      <div
        className="flex flex-col items-center justify-center gap-2 shrink-0"
        style={{
          width: 72,
          minWidth: 72,
          borderRight: "1px solid var(--border-light)",
          backgroundColor: "var(--surface-secondary)",
        }}
      >
        <NavIcon
          icon={Filter}
          title="Filtrer"
          active={isOpen && section === "filtres"}
          onClick={() => toggle("filtres")}
        />
        <NavIcon
          icon={BookMarked}
          title="Étagères"
          active={isOpen && section === "etageres"}
          onClick={() => toggle("etageres")}
          badge={selectionCount}
        />
      </div>

      {/* Panel coulissant — sort à droite de la nav */}
      <div
        className="flex flex-col shrink-0 overflow-hidden"
        style={{
          width: isOpen ? 300 : 0,
          transition: "width 200ms ease-out",
          borderRight: isOpen ? "1px solid var(--border-light)" : "none",
          backgroundColor: "var(--surface-secondary)",
        }}
      >
        <div className="flex flex-col h-full" style={{ width: 300, minWidth: 300 }}>
          <AtelierOpen
            section={section}
            onClose={close}
          />
        </div>
      </div>
    </>
  );
}

function AtelierOpen({
  section,
  onClose,
}: {
  section: Section;
  onClose: () => void;
}) {

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
  icon: ElementType;
  title: string;
  onClick: () => void;
  active?: boolean;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`nav-icon relative flex flex-col items-center gap-1 w-12 py-3 rounded-xl transition-all${active ? " is-active" : ""}`}
    >
      <span style={{ color: active ? "var(--icon-active)" : "var(--icon-secondary)" }}>
        <Icon size={28} strokeWidth={1.6} />
      </span>
      <span
        className="leading-none select-none"
        style={{ fontSize: 9, color: "var(--text-muted)" }}
      >
        {title}
      </span>
      {badge !== undefined && badge > 0 && (
        <span
          className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full flex items-center justify-center text-[10px] font-medium leading-none"
          style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
