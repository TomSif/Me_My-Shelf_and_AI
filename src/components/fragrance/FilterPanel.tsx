import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Leaf, Sun, Snowflake } from "lucide-react";
import type {
  OlfactoryFamily,
  Season,
  Concentration,
} from "../../types/fragrance";
import { useFragrancesStore } from "../../stores/fragrancesStore";
import { Chip } from "../ui/Chip";
import { FAMILY_CONFIG } from "../../utils/families";
import { MapleLeafIcon } from "../ui/MapleLeafIcon";
import { ConcentrationBottle } from "../ui/ConcentrationBottle";
import { Tag } from "../ui/Tag";
import { Toggle } from "../ui/Toggle";
import { Input } from "../ui/Input";

const FAMILIES: OlfactoryFamily[] = [
  "hespéridé",
  "floral",
  "herbacé",
  "épicé",
  "gourmand",
  "boisé",
  "résineux",
  "musqué",
  "cuiré",
  "alcoolisé",
  "minéral",
  "artificiel",
  "indéfini",
];

const SEASONS: { value: Season; icon: React.ReactNode; color: string }[] = [
  { value: "printemps", icon: <Leaf size={28} />,          color: "#3aA05a" },
  { value: "été",       icon: <Sun size={28} />,           color: "#E8960A" },
  { value: "automne",   icon: <MapleLeafIcon size={28} />, color: "#D45510" },
  { value: "hiver",     icon: <Snowflake size={28} />,     color: "#2E8EC8" },
];

const CONCENTRATIONS: Concentration[] = [
  "cologne",
  "eau de toilette",
  "eau de parfum",
  "parfum",
  "extrait",
];

const CONC_LABEL: Record<Concentration, string> = {
  cologne: "EDC",
  "eau de toilette": "EDT",
  "eau de parfum": "EDP",
  parfum: "Parfum",
  extrait: "Extrait",
};

function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item];
}

export function FilterPanel() {
  const {
    fragrances,
    activeFilters,
    setFilter,
    clearFilters,
    hasActiveFilters,
  } = useFragrancesStore();

  const allTags = useMemo(
    () => [...new Set(fragrances.flatMap((f) => f.tags))].sort(),
    [fragrances],
  );
  const allBrands = useMemo(
    () => [...new Set(fragrances.map((f) => f.brand))].sort(),
    [fragrances],
  );
  const allPerfumers = useMemo(
    () =>
      [
        ...new Set(fragrances.flatMap((f) => (f.perfumer ? [f.perfumer] : []))),
      ].sort(),
    [fragrances],
  );

  const {
    families,
    seasons,
    concentrations,
    tags,
    favoritesOnly,
    neverWorn,
    samplesOnly,
    brands,
    perfumers,
    pyramidNotes,
  } = activeFilters;

  const selectionSummary = [
    favoritesOnly && "favoris",
    neverWorn && "jamais portés",
    samplesOnly && "échantillons",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex flex-col">
      <p
        className="text-[9px] font-semibold tracking-[0.18em] uppercase mb-3"
        style={{ color: "var(--text-ghost)" }}
      >
        Filter Atelier
      </p>

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
        <div className="grid grid-cols-2 gap-1.5">
          {FAMILIES.map((f) => {
            const { color, Icon } = FAMILY_CONFIG[f];
            return (
              <Chip
                key={f}
                active={families.includes(f)}
                color={color}
                icon={<Icon size={16} />}
                onClick={() => setFilter("families", toggle(families, f))}
                className="w-full"
              >
                {f}
              </Chip>
            );
          })}
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="SAISONS"
        defaultOpen
        activeSummary={seasons.length > 0 ? seasons.join(", ") : undefined}
      >
        <div className="flex gap-2">
          {SEASONS.map(({ value, icon, color }) => (
            <Chip
              key={value}
              active={seasons.includes(value)}
              color={color}
              icon={icon}
              iconPadding="1rem"
              onClick={() => setFilter("seasons", toggle(seasons, value))}
            />
          ))}
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
        <div className="grid grid-cols-5 gap-1.5">
          {CONCENTRATIONS.map((c) => (
            <Chip
              key={c}
              layout="vertical"
              active={concentrations.includes(c)}
              icon={<ConcentrationBottle concentration={c} size={0.6} active={concentrations.includes(c)} />}
              onClick={() =>
                setFilter("concentrations", toggle(concentrations, c))
              }
              className="w-full"
            >
              {CONC_LABEL[c]}
            </Chip>
          ))}
        </div>
      </CollapsibleSection>

      {/* Niveau 2 — repliées par défaut */}
      <CollapsibleSection
        title="TAGS"
        defaultOpen={false}
        activeSummary={
          tags.length > 0
            ? `${tags.length} tag${tags.length > 1 ? "s" : ""}`
            : undefined
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
    <div
      className="border-b last:border-b-0"
      style={{ borderColor: "rgba(29,27,25,0.06)" }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between py-2.5 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className="text-[10px] font-semibold tracking-[0.12em] leading-none uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          {title}
          {!open && activeSummary && (
            <span
              className="ml-1.5 font-normal normal-case tracking-normal text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              · {activeSummary}
            </span>
          )}
        </span>
        <span className="ml-2 shrink-0" style={{ color: "var(--text-ghost)" }}>
          {open ? (
            <ChevronUp size={13} strokeWidth={1.5} />
          ) : (
            <ChevronDown size={13} strokeWidth={1.5} />
          )}
        </span>
      </button>
      {open && <div className="pb-3">{children}</div>}
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
      <Toggle value={value} onChange={onChange} />
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
          (s) =>
            !values.includes(s) &&
            s.toLowerCase().includes(input.toLowerCase()),
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
            <Tag key={v} onRemove={() => remove(v)}>
              {v}
            </Tag>
          ))}
        </div>
      )}
      <div className="relative">
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          className="w-full text-xs"
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
          <span
            className="text-xs w-10 shrink-0"
            style={{ color: "var(--text-muted)" }}
          >
            {label}
          </span>
          <input
            type="text"
            value={value[key] ?? ""}
            onChange={(e) =>
              onChange({ ...value, [key]: e.target.value || undefined })
            }
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
