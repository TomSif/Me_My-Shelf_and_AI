import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFragrancesStore } from "../../stores/fragrancesStore";
import { FamilyChips } from "./FamilyChips";
import type { OlfactoryFamily } from "../../types/fragrance";

interface Props {
  onClose: () => void;
}

export function QuickAddModal({ onClose }: Props) {
  const navigate = useNavigate();
  const add = useFragrancesStore((s) => s.add);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [families, setFamilies] = useState<OlfactoryFamily[]>([]);

  const canSave = name.trim().length > 0 && brand.trim().length > 0;

  function handleSave(andComplete: boolean) {
    const fragrance = add({
      name: name.trim(),
      brand: brand.trim(),
      families,
      concentration: "eau de parfum",
      isSample: false,
      volumeMl: 0,
      remainingMl: 0,
      seasons: [],
      tags: [],
      pyramid: { top: [], heart: [], base: [] },
    });
    if (andComplete && fragrance) {
      navigate(`/fragrance/${fragrance}`);
    }
    onClose();
  }

  const inputStyle = {
    backgroundColor: "var(--surface-secondary)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-light)",
  };

  const labelStyle = {
    color: "var(--text-muted)",
    fontSize: "0.7rem",
    fontWeight: 500 as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(29, 27, 25, 0.32)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed z-50 flex flex-col gap-4 p-6 rounded-2xl"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(480px, 92vw)",
          backgroundColor: "var(--bg-elevated)",
          border: "1px solid var(--border-soft)",
          boxShadow: "var(--shadow-elevated)",
          backdropFilter: "blur(var(--glass-blur))",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            Ajout rapide
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-lg leading-none"
            style={{ color: "var(--text-muted)" }}
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label style={labelStyle}>Nom du parfum</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sauvage"
              autoFocus
              className="px-3 py-2 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label style={labelStyle}>Marque</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Dior"
              className="px-3 py-2 rounded-lg text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label style={labelStyle}>Familles (optionnel)</label>
            <FamilyChips value={families} onChange={setFamilies} />
          </div>
        </div>

        <p className="text-xs" style={{ color: "var(--text-ghost)" }}>
          Ce parfum sera incomplet — tu pourras le compléter depuis sa fiche.
        </p>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: "var(--surface-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-light)",
            }}
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={() => handleSave(false)}
            className="px-4 py-2 rounded-lg text-sm transition-opacity"
            style={{
              backgroundColor: canSave ? "var(--surface-primary)" : "var(--state-disabled)",
              color: canSave ? "var(--text-primary)" : "var(--text-ghost)",
              border: "1px solid var(--border-soft)",
              cursor: canSave ? "pointer" : "not-allowed",
            }}
          >
            Enregistrer
          </button>
          <button
            type="button"
            disabled={!canSave}
            onClick={() => handleSave(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity"
            style={{
              backgroundColor: canSave ? "var(--icon-active)" : "var(--state-disabled)",
              color: canSave ? "#fff" : "var(--text-ghost)",
              cursor: canSave ? "pointer" : "not-allowed",
            }}
          >
            Enregistrer & compléter →
          </button>
        </div>
      </div>
    </>
  );
}