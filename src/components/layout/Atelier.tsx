import { useState } from "react";
import { FilterPanel } from "../fragrance/FilterPanel";

const NAV_ITEMS = [
  { label: "Étagères", short: "É" },
  { label: "Favoris", short: "♡" },
  { label: "Stats", short: "S" },
  { label: "Réglages", short: "R" },
];

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

export function Atelier() {
  const [isOpen, setIsOpen] = useState(getInitialOpen);

  function open() {
    setIsOpen(true);
    saveOpen(true);
  }

  function close() {
    setIsOpen(false);
    saveOpen(false);
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
      {isOpen ? <AtelierOpen onClose={close} /> : <AtelierClosed onOpen={open} />}
    </aside>
  );
}

function AtelierOpen({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ width: 340, minWidth: 340 }}>
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
            L'Atelier
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Composez votre collection
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

      {/* Filter Atelier */}
      <div
        className="flex-1 no-scrollbar px-3 py-3"
        style={{
          overflowY: "auto",
          maskImage:
            "linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)",
        }}
      >
        <div
          className="rounded-xl p-4 flex flex-col"
          style={{
            border: "1px solid var(--border-light)",
            backgroundColor: "var(--surface-primary)",
          }}
        >
          <FilterPanel />
        </div>
      </div>

      {/* Navigation */}
      <div
        className="flex flex-col gap-1 px-2 pb-4 pt-3 shrink-0"
        style={{ borderTop: "1px solid var(--border-light)" }}
      >
        {NAV_ITEMS.map(({ label }) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left w-full"
            style={{ color: "var(--icon-secondary)" }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AtelierClosed({ onOpen }: { onOpen: () => void }) {
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
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
          style={{ color: "var(--icon-secondary)" }}
          title={label}
        >
          {short}
        </button>
      ))}
    </div>
  );
}
