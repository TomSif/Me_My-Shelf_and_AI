import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFragrancesStore } from "../stores/fragrancesStore";
import { getSectionCompletion } from "../utils/fragrance";
import { AppLayout } from "../components/layout/AppLayout";
import { FragranceBottle } from "../components/fragrance/FragranceBottle";
import { ConcentrationPicker } from "../components/fragrance/ConcentrationPicker";
import { FamilyChips } from "../components/fragrance/FamilyChips";
import { GenreSlider } from "../components/fragrance/GenreSlider";
import { TagsInput } from "../components/fragrance/TagsInput";
import { PyramidInput } from "../components/fragrance/PyramidInput";
import { RatingPicker } from "../components/fragrance/RatingPicker";
import type {
  Concentration,
  GenreOlfactif,
  OlfactoryFamily,
  OlfactoryPyramid,
} from "../types/fragrance";
import type { BottleState } from "../components/fragrance/FragranceBottle";

type Mode = "create" | "view";

interface Props {
  mode: Mode;
}

interface FormState {
  name: string;
  brand: string;
  perfumer: string;
  concentration?: Concentration;
  isSample: boolean;
  volumeMl: number;
  remainingMl: number;
  families: OlfactoryFamily[];
  pyramid: OlfactoryPyramid;
  seasons: never[];
  genre?: GenreOlfactif;
  tags: string[];
  rating?: 1 | 2 | 3 | 4 | 5;
  purchaseDate: string;
  purchasePrice: string;
  lastUsed: string;
  comment: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  brand: "",
  perfumer: "",
  concentration: undefined,
  isSample: false,
  volumeMl: 0,
  remainingMl: 0,
  families: [],
  pyramid: { top: [], heart: [], base: [] },
  seasons: [],
  genre: undefined,
  tags: [],
  rating: undefined,
  purchaseDate: "",
  purchasePrice: "",
  lastUsed: "",
  comment: "",
};

function deriveBottleState(form: FormState): BottleState {
  const s = getSectionCompletion({
    ...form,
    id: "",
    createdAt: "",
    concentration: form.concentration ?? "eau de parfum",
    purchasePrice: form.purchasePrice ? parseFloat(form.purchasePrice) : undefined,
    seasons: [],
  });
  if (s.identity && s.physical && s.olfactive) return "complete";
  if (s.identity && s.olfactive) return "olfactive";
  if (s.identity && s.physical) return "physical";
  if (s.identity) return "identity";
  return "empty";
}

function calcCompletion(form: FormState): number {
  const checks = [
    form.name.trim().length > 0,
    form.brand.trim().length > 0,
    form.concentration !== undefined,
    form.volumeMl > 0,
    form.families.length > 0,
    form.rating !== undefined,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export function FragrancePage({ mode }: Props) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fragrances, add, update } = useFragrancesStore();

  const [form, setForm] = useState<FormState>(() => {
    if (mode === "view" && id) {
      const f = fragrances.find((x) => x.id === id);
      if (f) {
        return {
          name: f.name,
          brand: f.brand,
          perfumer: f.perfumer ?? "",
          concentration: f.concentration,
          isSample: f.isSample,
          volumeMl: f.volumeMl,
          remainingMl: f.remainingMl,
          families: f.families,
          pyramid: f.pyramid ?? { top: [], heart: [], base: [] },
          seasons: [],
          genre: f.genre,
          tags: f.tags,
          rating: f.rating,
          purchaseDate: f.purchaseDate ?? "",
          purchasePrice: f.purchasePrice?.toString() ?? "",
          lastUsed: f.lastUsed ?? "",
          comment: f.comment ?? "",
        };
      }
    }
    return EMPTY_FORM;
  });

  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  const completion = getSectionCompletion({
    ...form,
    id: "",
    createdAt: "",
    concentration: form.concentration ?? "eau de parfum",
    purchasePrice: form.purchasePrice ? parseFloat(form.purchasePrice) : undefined,
    seasons: [],
  });

  const bottleState = deriveBottleState(form);
  const completionPct = calcCompletion(form);
  const canSave = completion.identity;

  // Focus guidé en mode create
  useEffect(() => {
    if (mode !== "create") return;
    if (completion.identity && !completion.physical) {
      section2Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (completion.physical && !completion.olfactive) {
      section3Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (completion.olfactive && !completion.memory) {
      section4Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [completion.identity, completion.physical, completion.olfactive, mode]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    if (!canSave) return;
    const data = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      perfumer: form.perfumer.trim() || undefined,
      concentration: form.concentration ?? "eau de parfum" as Concentration,
      isSample: form.isSample,
      volumeMl: form.volumeMl,
      remainingMl: form.remainingMl,
      families: form.families,
      pyramid: form.pyramid,
      seasons: [],
      genre: form.genre,
      tags: form.tags,
      rating: form.rating,
      purchaseDate: form.purchaseDate || undefined,
      purchasePrice: form.purchasePrice ? parseFloat(form.purchasePrice) : undefined,
      lastUsed: form.lastUsed || undefined,
      comment: form.comment.trim() || undefined,
    };
    if (mode === "create") {
      add(data);
    } else if (id) {
      update(id, data);
    }
    navigate("/");
  }

  const inputStyle = {
    backgroundColor: "var(--surface-secondary)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-light)",
  };

  const labelStyle = {
    color: "var(--text-muted)",
    fontSize: "0.7rem",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  };

  const sectionStyle = {
    backgroundColor: "var(--surface-primary)",
    border: "1px solid var(--border-soft)",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  };

  return (
    <AppLayout>
      {/* Header contextuel */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: "var(--border-light)" }}
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          ← Retour à la collection
        </button>
        <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          {mode === "create" ? "Nouveau parfum" : form.name || "Parfum sans nom"}
        </span>
        <span className="text-sm font-medium" style={{ color: "var(--icon-active)" }}>
          Complété {completionPct}%
        </span>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); handleSave(); }}
        className="flex flex-col lg:grid gap-4 p-6"
        style={{ gridTemplateColumns: "1fr auto 1fr", gridTemplateRows: "1fr 1fr" }}
      >
        {/* Section 1 — Identité */}
        <div style={sectionStyle}>
          <div className="flex items-center justify-between">
            <span style={labelStyle}>1. Identité</span>
            {completion.identity && (
              <span style={{ color: "var(--icon-active)", fontSize: "0.8rem" }}>✓</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Nom du parfum</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Sauvage"
                className="px-3 py-2 rounded-lg text-sm outline-none"
                style={inputStyle}
                autoFocus={mode === "create"}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Marque</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => set("brand", e.target.value)}
                placeholder="Dior"
                className="px-3 py-2 rounded-lg text-sm outline-none"
                style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Parfumeur</label>
              <input
                type="text"
                value={form.perfumer}
                onChange={(e) => set("perfumer", e.target.value)}
                placeholder="François Demachy"
                className="px-3 py-2 rounded-lg text-sm outline-none"
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Flacon hero — colonne centrale */}
        <div className="flex items-center justify-center lg:row-span-2 px-8">
          <FragranceBottle
            families={form.families}
            size={3}
            bottleState={bottleState}
          />
        </div>

        {/* Section 2 — Physique */}
        <div ref={section2Ref} style={sectionStyle}>
          <div className="flex items-center justify-between">
            <span style={labelStyle}>2. Physique</span>
            {completion.physical && (
              <span style={{ color: "var(--icon-active)", fontSize: "0.8rem" }}>✓</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Concentration</label>
              <ConcentrationPicker
                value={form.concentration}
                onChange={(v) => set("concentration", v)}
              />
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-1 flex-1">
                <label style={labelStyle}>Volume (ml)</label>
                <select
                  value={form.volumeMl}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    set("volumeMl", v);
                    if (form.remainingMl > v) set("remainingMl", v);
                  }}
                  className="px-3 py-2 rounded-lg text-sm outline-none"
                  style={inputStyle}
                >
                  {[0, 5, 7.5, 10, 15, 30, 50, 75, 100, 125, 150, 200].map((ml) => (
                    <option key={ml} value={ml}>{ml === 0 ? "—" : `${ml} ml`}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 pt-4">
                <label style={labelStyle}>Échantillon</label>
                <input
                  type="checkbox"
                  checked={form.isSample}
                  onChange={(e) => set("isSample", e.target.checked)}
                  className="accent-[var(--icon-active)]"
                />
              </div>
            </div>
            {form.volumeMl > 0 && (
              <div className="flex flex-col gap-1">
                <label style={labelStyle}>
                  Restant — {form.remainingMl} ml
                </label>
                <input
                  type="range"
                  min={0}
                  max={form.volumeMl}
                  step={0.5}
                  value={form.remainingMl}
                  onChange={(e) => set("remainingMl", Number(e.target.value))}
                  className="w-full accent-[var(--icon-active)]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 3 — Olfactif */}
        <div ref={section3Ref} style={sectionStyle}>
          <div className="flex items-center justify-between">
            <span style={labelStyle}>3. Olfactif</span>
            {completion.olfactive && (
              <span style={{ color: "var(--icon-active)", fontSize: "0.8rem" }}>✓</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Familles</label>
              <FamilyChips value={form.families} onChange={(v) => set("families", v)} />
            </div>
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Genre olfactif</label>
              <GenreSlider value={form.genre} onChange={(v) => set("genre", v)} />
            </div>
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Tags personnels</label>
              <TagsInput value={form.tags} onChange={(v) => set("tags", v)} />
            </div>
          </div>
        </div>

        {/* Pyramide olfactive */}
        <div style={{ ...sectionStyle, gridColumn: "3" }}>
          <span style={labelStyle}>Pyramide olfactive</span>
          <PyramidInput
            value={form.pyramid}
            onChange={(v) => set("pyramid", v)}
          />
        </div>

        {/* Section 4 — Collection & Mémoire */}
        <div
          ref={section4Ref}
          style={{ ...sectionStyle, gridColumn: "1 / -1" }}
        >
          <div className="flex items-center justify-between">
            <span style={labelStyle}>4. Collection & Mémoire</span>
            {completion.memory && (
              <span style={{ color: "var(--icon-active)", fontSize: "0.8rem" }}>✓</span>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Note</label>
              <RatingPicker value={form.rating} onChange={(v) => set("rating", v)} />
            </div>
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Date d'achat</label>
              <input
                type="date"
                value={form.purchaseDate}
                onChange={(e) => set("purchaseDate", e.target.value)}
                className="px-3 py-2 rounded-lg text-sm outline-none"
                style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Prix d'achat (€)</label>
              <input
                type="number"
                value={form.purchasePrice}
                onChange={(e) => set("purchasePrice", e.target.value)}
                placeholder="—"
                className="px-3 py-2 rounded-lg text-sm outline-none"
                style={inputStyle}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label style={labelStyle}>Dernière utilisation</label>
              <input
                type="date"
                value={form.lastUsed}
                onChange={(e) => set("lastUsed", e.target.value)}
                className="px-3 py-2 rounded-lg text-sm outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label style={labelStyle}>Commentaire personnel</label>
            <textarea
              value={form.comment}
              onChange={(e) => set("comment", e.target.value)}
              placeholder="Mes impressions sur ce parfum…"
              rows={3}
              maxLength={300}
              className="px-3 py-2 rounded-lg text-sm outline-none resize-none"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Actions */}
        <div
          className="flex justify-end gap-3"
          style={{ gridColumn: "1 / -1" }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: "var(--surface-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-light)",
            }}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!canSave}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-opacity"
            style={{
              backgroundColor: canSave ? "var(--icon-active)" : "var(--state-disabled)",
              color: canSave ? "#fff" : "var(--text-ghost)",
              cursor: canSave ? "pointer" : "not-allowed",
            }}
          >
            {mode === "create" ? "Enregistrer le parfum" : "Sauvegarder"}
          </button>
        </div>
      </form>
    </AppLayout>
  );
}