import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Shelf } from "../../types/fragrance";
import { useFragrancesStore } from "../../stores/fragrancesStore";

type Tab = "vues" | "historique" | "filtre" | "aucun";

const TABS: { id: Tab; label: string }[] = [
  { id: "vues", label: "VUES" },
  { id: "historique", label: "HISTORIQUE" },
  { id: "filtre", label: "FILTRE" },
  { id: "aucun", label: "AUCUN" },
];

export function ShelfPanel() {
  const navigate = useNavigate();
  const {
    shelves,
    activeShelfId,
    activeShelf,
    filteredFragrances,
    setActiveShelf,
    createShelf,
    renameShelf,
    deleteShelf,
  } = useFragrancesStore();

  const [tab, setTab] = useState<Tab>("vues");
  const [newShelfName, setNewShelfName] = useState("");
  const [creatingNew, setCreatingNew] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const allByDate = [...shelves].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  function handleCreate() {
    const name = newShelfName.trim();
    if (!name) return;
    createShelf(name);
    setNewShelfName("");
    setCreatingNew(false);
    setTab("vues");
  }

  function handleRename(shelfId: string) {
    const name = renameValue.trim();
    if (!name) return;
    renameShelf(shelfId, name);
    setRenamingId(null);
    setRenameValue("");
  }

  function startRename(shelf: Shelf) {
    setRenamingId(shelf.id);
    setRenameValue(shelf.name);
    setMenuOpenId(null);
  }

  const listedShelves =
    tab === "vues" ? shelves :
    tab === "historique" ? allByDate : [];

  function activateShelf(id: string) {
    setActiveShelf(id);
    navigate("/shelf");
  }

  return (
    <div className="flex flex-col h-full">
      {/* Overlay ferme le ⋮ */}
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
            onClick={() => {
              setTab(id);
              if (id === "aucun") setActiveShelf(null);
            }}
            className="flex-1 py-1 rounded text-xs font-medium transition-colors"
            style={{
              backgroundColor: tab === id ? "var(--icon-active)" : "transparent",
              color: tab === id ? "#fff" : "var(--text-muted)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">

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
                createShelf(`Filtre · ${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" })}`);
                setTab("vues");
              }}
              className="text-xs py-1.5 px-3 rounded-lg text-left transition-colors"
              style={{ color: "var(--icon-active)", backgroundColor: "var(--surface-secondary)" }}
            >
              + Sauvegarder comme étagère
            </button>
          </div>
        )}

        {/* AUCUN */}
        {tab === "aucun" && (
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Aucune étagère active. La collection s'affiche sans filtre d'étagère.
          </p>
        )}

        {/* VUES ou HISTORIQUE */}
        {(tab === "vues" || tab === "historique") && (
          <>
            {listedShelves.length === 0 && (
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {tab === "vues" ? "Aucune étagère sauvegardée." : "Aucune sélection dans l'historique."}
              </p>
            )}
            {listedShelves.map((shelf) => (
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
      </div>

      {/* Section Actions */}
      <div
        className="shrink-0 flex flex-col gap-1 px-3 py-3"
        style={{ borderTop: "1px solid var(--border-light)" }}
      >
        <p className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
          ACTIONS
        </p>

        {/* Sauvegarder */}
        {creatingNew ? (
          <div className="flex gap-1.5">
            <input
              autoFocus
              type="text"
              value={newShelfName}
              onChange={(e) => setNewShelfName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); if (e.key === "Escape") setCreatingNew(false); }}
              placeholder="Nom de l'étagère…"
              className="flex-1 bg-transparent text-xs outline-none px-2 py-1 rounded-md placeholder:text-(--text-muted)"
              style={{ border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
            />
            <button type="button" onClick={handleCreate} className="text-xs px-2 rounded-md" style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}>OK</button>
            <button type="button" onClick={() => setCreatingNew(false)} className="text-xs px-1.5 rounded-md" style={{ color: "var(--text-muted)" }}>×</button>
          </div>
        ) : (
          <ActionRow
            icon="+"
            label="Sauvegarder la sélection actuelle"
            sub="Enregistrer comme nouvelle étagère"
            onClick={() => setCreatingNew(true)}
          />
        )}

        {/* Renommer l'étagère active */}
        {activeShelf && renamingId === activeShelf.id ? (
          <div className="flex gap-1.5">
            <input
              autoFocus
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleRename(activeShelf.id); if (e.key === "Escape") setRenamingId(null); }}
              placeholder="Nouveau nom…"
              className="flex-1 bg-transparent text-xs outline-none px-2 py-1 rounded-md placeholder:text-(--text-muted)"
              style={{ border: "1px solid var(--border-light)", color: "var(--text-primary)" }}
            />
            <button type="button" onClick={() => handleRename(activeShelf.id)} className="text-xs px-2 rounded-md" style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}>OK</button>
            <button type="button" onClick={() => setRenamingId(null)} className="text-xs px-1.5 rounded-md" style={{ color: "var(--text-muted)" }}>×</button>
          </div>
        ) : (
          <ActionRow
            icon="✎"
            label="Renommer la sélection actuelle"
            sub="Modifier le nom de cette étagère"
            onClick={() => activeShelf && startRename(activeShelf)}
            disabled={!activeShelf}
          />
        )}

        <ActionRow
          icon="⌫"
          label="Supprimer la sélection actuelle"
          sub="Retirer cette étagère"
          onClick={() => activeShelf && deleteShelf(activeShelf.id)}
          disabled={!activeShelf}
          danger
        />

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
  return (
    <div
      className="relative flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer"
      style={{
        backgroundColor: isActive ? "color-mix(in srgb, var(--icon-active) 10%, transparent)" : "transparent",
        border: isActive ? "1px solid color-mix(in srgb, var(--icon-active) 25%, transparent)" : "1px solid transparent",
      }}
      onClick={onActivate}
    >
      <span style={{ color: "var(--icon-active)", fontSize: 14 }}>🔖</span>

      {isRenaming ? (
        <input
          autoFocus
          type="text"
          value={renameValue}
          onChange={(e) => onRenameChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") onRenameSubmit(); if (e.key === "Escape") onRenameCancel(); }}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-(--text-muted)"
          style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border-light)" }}
        />
      ) : (
        <span className="flex-1 text-xs truncate" style={{ color: "var(--text-primary)" }}>
          {shelf.name}
        </span>
      )}

      <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
        {shelf.fragranceIds.length}
      </span>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onMenuToggle(); }}
        className="text-xs w-5 h-5 flex items-center justify-center rounded shrink-0"
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

function ActionRow({
  icon, label, sub, onClick, disabled, danger,
}: {
  icon: string; label: string; sub: string;
  onClick: () => void; disabled?: boolean; danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-3 px-2 py-1.5 rounded-lg text-left w-full transition-colors"
      style={{ opacity: disabled ? 0.4 : 1 }}
    >
      <span
        className="w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0"
        style={{ backgroundColor: "var(--surface-secondary)", color: danger ? "var(--color-destructive, #e53e3e)" : "var(--text-secondary)" }}
      >
        {icon}
      </span>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs" style={{ color: danger ? "var(--color-destructive, #e53e3e)" : "var(--text-primary)" }}>
          {label}
        </span>
        <span className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
          {sub}
        </span>
      </div>
    </button>
  );
}
