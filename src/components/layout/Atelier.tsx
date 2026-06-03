import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterPanel } from "../fragrance/FilterPanel";
import { ShelfPanel } from "../fragrance/ShelfPanel";
import { useFragrancesStore } from "../../stores/fragrancesStore";

const NAV_ITEMS = [
  { label: "Étagères", short: "É" },
  { label: "Favoris", short: "♡" },
  { label: "Stats", short: "S" },
  { label: "Réglages", short: "R" },
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
  } catch {}
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
  } catch {}
}

export function Atelier() {
  const [isOpen, setIsOpen] = useState(getInitialOpen);
  const [section, setSection] = useState<Section>(getInitialSection);

  function open(s?: Section) {
    setIsOpen(true);
    saveOpen(true);
    if (s) { setSection(s); saveSection(s); }
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
        width: isOpen ? 340 : 48,
        transition: "width 200ms ease-out",
        borderRight: "1px solid var(--border-light)",
        backgroundColor: "var(--surface-secondary)",
      }}
    >
      {isOpen
        ? <AtelierOpen section={section} onSectionChange={changeSection} onClose={close} />
        : <AtelierClosed onOpen={open} />}
    </aside>
  );
}

function AtelierOpen({ section, onSectionChange, onClose }: {
  section: Section; onSectionChange: (s: Section) => void; onClose: () => void;
}) {
  const { activeShelfCount } = useFragrancesStore();

  const title = section === "etageres" ? "my-shelfs" : "L'Atelier";
  const subtitle = section === "etageres" ? "Gérez vos vues et sélections" : "Composez votre collection";

  return (
    <div className="flex flex-col h-full" style={{ width: 340, minWidth: 340 }}>
      {/* En-tête */}
      <div
        className="flex items-start justify-between px-4 pt-4 pb-3 shrink-0"
        style={{ borderBottom: "1px solid var(--border-light)" }}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            {title}
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {subtitle}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-sm px-2 py-1 rounded-md mt-0.5 leading-none"
          style={{ color: "var(--text-muted)" }}
          title="Fermer l'Atelier"
        >
          «
        </button>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-hidden">
        {section === "etageres" ? (
          <ShelfPanel />
        ) : (
          <div
            className="h-full no-scrollbar px-3 py-3"
            style={{
              overflowY: "auto",
              maskImage: "linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)",
            }}
          >
            <div
              className="rounded-xl p-4 flex flex-col"
              style={{ border: "1px solid var(--border-light)", backgroundColor: "var(--surface-primary)" }}
            >
              <FilterPanel />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div
        className="flex flex-col gap-1 px-2 pb-4 pt-3 shrink-0"
        style={{ borderTop: "1px solid var(--border-light)" }}
      >
        {NAV_ITEMS.map(({ label }) => {
          const isEtageres = label === "Étagères";
          const isActive = (isEtageres && section === "etageres") || (!isEtageres && section === "filtres" && label === "Filtrer");
          return (
            <button
              key={label}
              type="button"
              onClick={() => isEtageres ? onSectionChange("etageres") : onSectionChange("filtres")}
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm text-left w-full"
              style={{
                color: isActive ? "var(--icon-active)" : "var(--icon-secondary)",
                backgroundColor: isActive ? "color-mix(in srgb, var(--icon-active) 8%, transparent)" : "transparent",
              }}
            >
              <span>{label}</span>
              {isEtageres && activeShelfCount > 0 && (
                <span
                  className="h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center text-xs font-medium leading-none"
                  style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}
                >
                  {activeShelfCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AtelierClosed({ onOpen }: { onOpen: (s?: Section) => void }) {
  const navigate = useNavigate();
  const { activeShelfCount } = useFragrancesStore();
  return (
    <div
      className="flex flex-col items-center gap-4 py-4"
      style={{ width: 48, minWidth: 48 }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
        style={{ color: "var(--icon-secondary)" }}
        title="Ouvrir l'Atelier"
      >
        »
      </button>
      {NAV_ITEMS.map(({ label, short }) => (
        <button
          key={label}
          type="button"
          onClick={() => label === "Étagères" ? onOpen("etageres") : onOpen("filtres")}
          className="relative w-8 h-8 rounded-lg flex items-center justify-center text-xs"
          style={{ color: "var(--icon-secondary)" }}
          title={label}
        >
          {short}
          {label === "Étagères" && activeShelfCount > 0 && (
            <span
              className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full flex items-center justify-center text-[10px] font-medium leading-none"
              style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}
            >
              {activeShelfCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
