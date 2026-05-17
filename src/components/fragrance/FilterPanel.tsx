import { useState, useMemo } from "react";
import type { OlfactoryFamily, Season, Concentration } from "../../types/fragrance";
import { useFragrancesStore } from "../../stores/fragrancesStore";

const FAMILIES: OlfactoryFamily[] = [
  "hespéridé", "floral", "herbacé", "épicé", "gourmand",
  "boisé", "résineux", "musqué", "alcoolisé", "minéral",
  "artificiel", "indéfini",
];

const SEASONS: { value: Season; icon: string }[] = [
  { value: "printemps", icon: "✿" },
  { value: "été", icon: "☀" },
  { value: "automne", icon: "◆" },
  { value: "hiver", icon: "✦" },
];

const CONCENTRATIONS: Concentration[] = [
  "cologne", "eau de toilette", "eau de parfum", "parfum", "extrait",
];

const CONC_LABEL: Record<Concentration, string> = {
  cologne: "Cologne",
  "eau de toilette": "EDT",
  "eau de parfum": "EDP",
  parfum: "Parfum",
  extrait: "Extrait",
};

const FAMILY_COLOR: Record<OlfactoryFamily, string> = {
  hespéridé: "var(--family-hesperide)",
  floral: "var(--family-floral)",
  herbacé: "var(--family-herbace)",
  épicé: "var(--family-epice)",
  gourmand: "var(--family-gourmand)",
  boisé: "var(--family-boise)",
  résineux: "var(--family-resineux)",
  musqué: "var(--family-musque)",
  alcoolisé: "var(--family-alcoolise)",
  minéral: "var(--family-mineral)",
  artificiel: "var(--family-artificiel)",
  indéfini: "var(--family-indefini)",
};

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item];
}

export function FilterPanel() {
  const { fragrances, activeFilters, setFilter, clearFilters, hasActiveFilters } =
    useFragrancesStore();

  const allTags = useMemo(
    () => [...new Set(fragrances.flatMap((f) => f.tags))].sort(),
    [fragrances]
  );
  const allBrands = useMemo(
    () => [...new Set(fragrances.map((f) => f.brand))].sort(),
    [fragrances]
  );
  const allPerfumers = useMemo(
    () =>
      [...new Set(fragrances.flatMap((f) => (f.perfumer ? [f.perfumer] : [])))].sort(),
    [fragrances]
  );

  const { families, seasons, concentrations, tags, favoritesOnly, neverWorn, samplesOnly, brands, perfumers, pyramidNotes } =
    activeFilters;

  const selectionSummary = [
    favoritesOnly && "favoris",
    neverWorn && "jamais portés",
    samplesOnly && "échantillons",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-xs font-semibold tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          FILTER ATELIER
        </span>
      </div>

      {/* Niveau 1 — ouvertes par défaut */}
      <CollapsibleSection
        title="FAMILLES"
        defaultOpen
        activeSummary={
          families.length > 0
            ? families.slice(0, 2).join(", ") +
              (families.length > 2 ? ` +${families.length - 2}` : "")
            : undefined
        }
      >
        <div className="flex flex-wrap gap-1.5">
          {FAMILIES.map((f) => {
            const active = families.includes(f);
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter("families", toggle(families, f))}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs capitalize"
                style={{
                  backgroundColor: active ? FAMILY_COLOR[f] : "transparent",
                  color: active ? "var(--text-primary)" : "var(--text-muted)",
                  border: `1px solid ${active ? FAMILY_COLOR[f] : "var(--border-light)"}`,
                  fontWeight: active ? 500 : 400,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: FAMILY_COLOR[f],
                    display: "inline-block",
                    flexShrink: 0,
                    opacity: active ? 1 : 0.5,
                  }}
                />
                {f}
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="SAISONS"
        defaultOpen
        activeSummary={seasons.length > 0 ? seasons.join(", ") : undefined}
      >
        <div className="flex flex-wrap gap-1.5">
          {SEASONS.map(({ value, icon }) => {
            const active = seasons.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter("seasons", toggle(seasons, value))}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs capitalize"
                style={{
                  backgroundColor: active ? "var(--icon-active)" : "transparent",
                  color: active ? "#fff" : "var(--text-muted)",
                  border: `1px solid ${active ? "var(--icon-active)" : "var(--border-light)"}`,
                }}
              >
                {icon} {value}
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="CONCENTRATION"
        defaultOpen
        activeSummary={
          concentrations.length > 0
            ? concentrations.map((c) => CONC_LABEL[c]).join(", ")
            : undefined
        }
      >
        <div className="flex flex-wrap gap-1.5">
          {CONCENTRATIONS.map((c) => {
            const active = concentrations.includes(c);
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter("concentrations", toggle(concentrations, c))}
                className="px-2.5 py-0.5 rounded-full text-xs"
                style={{
                  backgroundColor: active ? "var(--icon-active)" : "transparent",
                  color: active ? "#fff" : "var(--text-muted)",
                  border: `1px solid ${active ? "var(--icon-active)" : "var(--border-light)"}`,
                  fontWeight: active ? 500 : 400,
                }}
              >
                {CONC_LABEL[c]}
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Niveau 2 — repliées par défaut */}
      <CollapsibleSection
        title="TAGS"
        defaultOpen={false}
        activeSummary={
          tags.length > 0 ? `${tags.length} tag${tags.length > 1 ? "s" : ""}` : undefined
        }
      >
        <AutocompleteChipInput
          values={tags}
          suggestions={allTags}
          placeholder="Rechercher un tag…"
          onChange={(v) => setFilter("tags", v)}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="SÉLECTION"
        defaultOpen={false}
        activeSummary={selectionSummary || undefined}
      >
        <div className="flex flex-col gap-2.5 py-0.5">
          <ToggleRow
            label="Favoris uniquement"
            value={favoritesOnly}
            onChange={(v) => setFilter("favoritesOnly", v)}
          />
          <ToggleRow
            label="Jamais portés"
            value={neverWorn}
            onChange={(v) => setFilter("neverWorn", v)}
          />
          <ToggleRow
            label="Échantillons uniquement"
            value={samplesOnly}
            onChange={(v) => setFilter("samplesOnly", v)}
          />
        </div>
      </CollapsibleSection>

      {/* Niveau 3 — repliées par défaut */}
      <CollapsibleSection
        title="MARQUE"
        defaultOpen={false}
        activeSummary={brands.length > 0 ? brands.join(", ") : undefined}
      >
        <AutocompleteChipInput
          values={brands}
          suggestions={allBrands}
          placeholder="Rechercher une marque…"
          onChange={(v) => setFilter("brands", v)}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="PARFUMEUR"
        defaultOpen={false}
        activeSummary={perfumers.length > 0 ? perfumers.join(", ") : undefined}
      >
        <AutocompleteChipInput
          values={perfumers}
          suggestions={allPerfumers}
          placeholder="Rechercher un parfumeur…"
          onChange={(v) => setFilter("perfumers", v)}
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="PYRAMIDE"
        defaultOpen={false}
        activeSummary={
          pyramidNotes.top || pyramidNotes.heart || pyramidNotes.base
            ? [
                pyramidNotes.top && `tête: ${pyramidNotes.top}`,
                pyramidNotes.heart && `cœur: ${pyramidNotes.heart}`,
                pyramidNotes.base && `fond: ${pyramidNotes.base}`,
              ]
                .filter(Boolean)
                .join(", ")
            : undefined
        }
      >
        <PyramidFilter
          value={pyramidNotes}
          onChange={(v) => setFilter("pyramidNotes", v)}
        />
      </CollapsibleSection>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="mt-3 w-full text-xs py-1.5 rounded-lg"
          style={{
            color: "var(--text-muted)",
            border: "1px solid var(--border-light)",
          }}
        >
          Tout effacer
        </button>
      )}
    </div>
  );
}

// --- Sub-components ---

function CollapsibleSection({
  title,
  defaultOpen,
  activeSummary,
  children,
}: {
  title: string;
  defaultOpen: boolean;
  activeSummary?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        className="w-full flex items-center justify-between py-2 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className="text-xs font-semibold tracking-widest leading-none"
          style={{ color: "var(--text-muted)" }}
        >
          {title}
          {!open && activeSummary && (
            <span
              className="ml-1 font-normal normal-case tracking-normal"
              style={{ color: "var(--text-secondary)" }}
            >
              · {activeSummary}
            </span>
          )}
        </span>
        <span className="text-xs ml-2 shrink-0" style={{ color: "var(--text-ghost)" }}>
          {open ? "∧" : "∨"}
        </span>
      </button>
      {open && <div className="pb-2">{children}</div>}
    </div>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full"
        style={{
          backgroundColor: value ? "var(--icon-active)" : "var(--border-light)",
          transition: `background-color var(--duration-fast) var(--ease-soft)`,
        }}
      >
        <span
          className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
          style={{
            transform: value ? "translateX(18px)" : "translateX(2px)",
            transition: `transform var(--duration-fast) var(--ease-soft)`,
          }}
        />
      </button>
    </div>
  );
}

function AutocompleteChipInput({
  values,
  suggestions,
  placeholder,
  onChange,
}: {
  values: string[];
  suggestions: string[];
  placeholder: string;
  onChange: (values: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const filtered =
    input.trim() === ""
      ? []
      : suggestions.filter(
          (s) => !values.includes(s) && s.toLowerCase().includes(input.toLowerCase())
        );

  function add(value: string) {
    if (!values.includes(value)) onChange([...values, value]);
    setInput("");
    setOpen(false);
  }

  function remove(value: string) {
    onChange(values.filter((v) => v !== value));
  }

  return (
    <div className="flex flex-col gap-2">
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => remove(v)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
              style={{ backgroundColor: "var(--icon-active)", color: "#fff" }}
            >
              {v}
              <span style={{ opacity: 0.7 }}>×</span>
            </button>
          ))}
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          className="w-full text-xs px-2.5 py-1.5 rounded-lg"
          style={{
            backgroundColor: "var(--surface-secondary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border-light)",
            outline: "none",
          }}
        />
        {open && filtered.length > 0 && (
          <div
            className="absolute top-full left-0 right-0 mt-1 rounded-lg z-10 overflow-hidden"
            style={{
              backgroundColor: "var(--surface-primary)",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-soft)",
              maxHeight: 140,
              overflowY: "auto",
            }}
          >
            {filtered.slice(0, 8).map((s) => (
              <button
                key={s}
                type="button"
                onMouseDown={() => add(s)}
                className="w-full text-left px-3 py-1.5 text-xs hover:bg-black/5"
                style={{ color: "var(--text-secondary)" }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PyramidFilter({
  value,
  onChange,
}: {
  value: { top?: string; heart?: string; base?: string };
  onChange: (v: { top?: string; heart?: string; base?: string }) => void;
}) {
  const notes = [
    { key: "top" as const, label: "Tête" },
    { key: "heart" as const, label: "Cœur" },
    { key: "base" as const, label: "Fond" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {notes.map(({ key, label }) => (
        <div key={key} className="flex items-center gap-2">
          <span className="text-xs w-10 shrink-0" style={{ color: "var(--text-muted)" }}>
            {label}
          </span>
          <input
            type="text"
            value={value[key] ?? ""}
            onChange={(e) => onChange({ ...value, [key]: e.target.value || undefined })}
            placeholder="ex: bergamote"
            className="flex-1 text-xs px-2.5 py-1.5 rounded-lg"
            style={{
              backgroundColor: "var(--surface-secondary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-light)",
              outline: "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}
