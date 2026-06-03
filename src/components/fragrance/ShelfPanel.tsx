import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Shelf } from "../../types/fragrance";
import { useFragrancesStore } from "../../stores/fragrancesStore";

type Tab = "selection" | "etageres" | "filtre" | "aucun";

const TABS: { id: Tab; label: string }[] = [
  { id: "selection", label: "SÉLECTION" },
  { id: "etageres", label: "ÉTAGÈRES" },
  { id: "filtre", label: "FILTRE" },
  { id: "aucun", label: "AUCUN" },
];

export function ShelfPanel() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    shelves,
    activeShelfId,
    activeShelf,
    fragrances,
    filteredFragrances,
    currentSelection,
    selectionCount,
    addToSelection,
    removeFromSelection,
    saveSelection,
    clearSelection,
    setActiveShelf,
    deleteShelf,
    renameShelf,
  } = useFragrancesStore();

  const [tab, setTab] = useState<Tab>(pathname === "/shelf" ? "etageres" : "selection");
  const [saveName, setSaveName] = useState("");
  const [saving, setSaving] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const selectionFragrances = currentSelection
    .map((id) => fragrances.find((f) => f.id === id))
    .filter(Boolean) as typeof fragrances;

  function handleSave() {
    saveSelection(saveName);
    setSaveName("");
    setSaving(false);
    setTab("etageres");
  }

  function activateShelf(id: string) {
    setActiveShelf(id);
    navigate("/shelf");
  }

  function startRename(shelf: Shelf) {
    setRenamingId(shelf.id);
    setRenameValue(shelf.name);
    setMenuOpenId(null);
  }

  function handleRename(shelfId: string) {
    if (!renameValue.trim()) return;
    renameShelf(shelfId, renameValue.trim());
    setRenamingId(null);
  }

  return (
    <div className="flex flex-col h-full">
      {menuOpenId && (
        <div className="fixed inset-0 z-40" onClick={() => setMenuOpenId(null)} />
      )}

      {/* Onglets */}
      <div
        className="flex shrink-0 px-3 pt-3 pb-2 gap-1"
        style={{ borderBottom: "1px solid var(--border-light)" }}
      >
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => { setTab(id); if (id === "aucun") setActiveShelf(null); }}
            className="flex-1 py-1 rounded text-xs font-medium transition-colors"
            style={{
              backgroundColor: tab === id ? "var(--icon-active)" : "transparent",
              color: tab === id ? "#fff" : "var(--text-muted)",
            }}
          >
            {id === "selection" && selectionCount > 0 ? `${label} ${selectionCount}` : label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">

        {/* SÉLECTION */}
        {tab === "selection" && (
          <>
            {selectionFragrances.length === 0 ? (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Aucun parfum dans la sélection. Clic droit sur un flacon ou utilisez le bouton dans la barre du bas.
              </p>
            ) : (
              <>
                {selectionFragrances.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
                    style={{ backgroundColor: "var(--surface-secondary)" }}
                  >
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                        {f.name}
                      </span>
                      <span className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                        {f.brand}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromSelection(f.id)}
                      className="text-sm shrink-0 w-5 h-5 flex items-center justify-center rounded"
                      style={{ color: "var(--text-muted)" }}
                      title="Retirer de la sélection"
                    >
                      ×
                    </button>
                  </div>
                ))}

                <div className="flex flex-col gap-2 mt-2">
                  {saving ? (
                    <div className="flex gap-1.5">
                      <input
                        autoFocus
                        type="text"
                        value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setSaving(false); }}
                        placeholder="Nom de l'étagère…"
                        className="flex-1 bg-transparent text-xs outline-none px-2 py-1 rounded-md placeholder:text-(--text-muted)"
                        style={{ border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
                      />
                      <button
                        type="button"
                        onClick={handleSave}
                        className="text-xs px-2 rounded-md shrink-0"
                        style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        onClick={() => setSaving(false)}
                        className="text-xs px-1.5 rounded-md"
                        style={{ color: "var(--text-muted)" }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSaving(true)}
                      className="text-xs py-1.5 px-3 rounded-lg text-left transition-colors w-full"
                      style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}
                    >
                      Sauvegarder cette sélection →
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="text-xs py-1 px-3 rounded-lg text-left"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Vider la sélection
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ÉTAGÈRES */}
        {tab === "etageres" && (
          <>
            {shelves.length === 0 && (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Aucune étagère sauvegardée.
              </p>
            )}
            {shelves.map((shelf) => (
              <ShelfRow
                key={shelf.id}
                shelf={shelf}
                isActive={shelf.id === activeShelfId}
                isRenaming={renamingId === shelf.id}
                renameValue={renameValue}
                menuOpen={menuOpenId === shelf.id}
                onActivate={() => activateShelf(shelf.id)}
                onRenameChange={setRenameValue}
                onRenameSubmit={() => handleRename(shelf.id)}
                onRenameCancel={() => setRenamingId(null)}
                onMenuToggle={() => setMenuOpenId(menuOpenId === shelf.id ? null : shelf.id)}
                onStartRename={() => startRename(shelf)}
                onDelete={() => { deleteShelf(shelf.id); setMenuOpenId(null); }}
              />
            ))}
          </>
        )}

        {/* FILTRE */}
        {tab === "filtre" && (
          <div className="flex flex-col gap-3">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Vue basée sur les filtres actifs
            </p>
            <div
              className="rounded-lg px-3 py-2 text-xs"
              style={{ backgroundColor: "var(--surface-secondary)", color: "var(--text-secondary)" }}
            >
              {filteredFragrances.length} parfum{filteredFragrances.length > 1 ? "s" : ""} correspondent aux filtres actifs
            </div>
            <button
              type="button"
              onClick={() => {
                filteredFragrances.forEach((f) => addToSelection(f.id));
                setTab("selection");
              }}
              className="text-xs py-1.5 px-3 rounded-lg text-left transition-colors"
              style={{ color: "var(--icon-active)", backgroundColor: "var(--surface-secondary)" }}
            >
              + Ajouter à la sélection
            </button>
          </div>
        )}

        {/* AUCUN */}
        {tab === "aucun" && (
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Aucune étagère active. La collection s'affiche sans filtre d'étagère.
          </p>
        )}
      </div>
    </div>
  );
}

function ShelfRow({
  shelf, isActive, isRenaming, renameValue, menuOpen,
  onActivate, onRenameChange, onRenameSubmit, onRenameCancel,
  onMenuToggle, onStartRename, onDelete,
}: {
  shelf: Shelf; isActive: boolean; isRenaming: boolean;
  renameValue: string; menuOpen: boolean;
  onActivate: () => void; onRenameChange: (v: string) => void;
  onRenameSubmit: () => void; onRenameCancel: () => void;
  onMenuToggle: () => void; onStartRename: () => void; onDelete: () => void;
}) {
  const date = new Date(shelf.createdAt).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div
      className="relative flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer"
      style={{
        backgroundColor: isActive ? "color-mix(in srgb, var(--icon-active) 10%, transparent)" : "transparent",
        border: isActive ? "1px solid color-mix(in srgb, var(--icon-active) 25%, transparent)" : "1px solid transparent",
      }}
      onClick={onActivate}
    >
      <span style={{ color: "var(--icon-active)", fontSize: 13 }}>🔖</span>

      <div className="flex flex-col flex-1 min-w-0">
        {isRenaming ? (
          <input
            autoFocus
            type="text"
            value={renameValue}
            onChange={(e) => onRenameChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onRenameSubmit(); if (e.key === "Escape") onRenameCancel(); }}
            onClick={(e) => e.stopPropagation()}
            className="bg-transparent text-xs outline-none w-full"
            style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border-light)" }}
          />
        ) : (
          <>
            <span className="text-xs truncate" style={{ color: "var(--text-primary)" }}>{shelf.name}</span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {shelf.fragranceIds.length} parfum{shelf.fragranceIds.length > 1 ? "s" : ""} · {date}
            </span>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onMenuToggle(); }}
        className="text-xs w-5 h-5 flex items-center justify-center rounded shrink-0 z-50"
        style={{ color: "var(--text-muted)" }}
      >
        ⋮
      </button>

      {menuOpen && (
        <div
          className="absolute right-0 top-full mt-1 z-50 rounded-lg py-1 text-xs"
          style={{
            backgroundColor: "var(--surface-primary)",
            boxShadow: "var(--shadow-soft)",
            border: "1px solid var(--border-light)",
            minWidth: 140,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="w-full text-left px-3 py-1.5"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--search-bg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            onClick={onStartRename}
          >
            Renommer
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-1.5"
            style={{ color: "var(--color-destructive, #e53e3e)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--search-bg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
            onClick={onDelete}
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  );
}
