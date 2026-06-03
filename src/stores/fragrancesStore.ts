import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Fragrance, NewFragrance, ActiveFilters, PyramidNotesFilter, SortState, Shelf } from "../types/fragrance";
import { isComplete } from "../utils/fragrance";

const DEFAULT_SORT: SortState = { criterion: "none", direction: "asc" };

function applySort(fragrances: Fragrance[], sort: SortState): Fragrance[] {
  if (sort.criterion === "none") return [...fragrances];
  if (sort.criterion === "random") {
    return [...fragrances].sort(() => Math.random() - 0.5);
  }
  return [...fragrances].sort((a, b) => {
    let aVal: string | number | undefined;
    let bVal: string | number | undefined;
    switch (sort.criterion) {
      case "alphabetic":    aVal = a.name.toLowerCase();  bVal = b.name.toLowerCase();  break;
      case "createdAt":     aVal = a.createdAt;           bVal = b.createdAt;           break;
      case "rating":        aVal = a.rating;              bVal = b.rating;              break;
      case "purchaseDate":  aVal = a.purchaseDate;        bVal = b.purchaseDate;        break;
      case "lastUsed":      aVal = a.lastUsed;            bVal = b.lastUsed;            break;
      case "purchasePrice": aVal = a.purchasePrice;       bVal = b.purchasePrice;       break;
    }
    if (aVal === undefined && bVal === undefined) return 0;
    if (aVal === undefined) return 1;
    if (bVal === undefined) return -1;
    const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sort.direction === "asc" ? cmp : -cmp;
  });
}

const DEFAULT_FILTERS: ActiveFilters = {
  families: [],
  seasons: [],
  concentrations: [],
  brands: [],
  perfumers: [],
  tags: [],
  favoritesOnly: false,
  neverWorn: false,
  samplesOnly: false,
  pyramidNotes: {},
};

function hasPyramidFilter(p: PyramidNotesFilter): boolean {
  return Boolean(p.top || p.heart || p.base);
}

function hasActive(filters: ActiveFilters): boolean {
  return (
    filters.families.length > 0 ||
    filters.seasons.length > 0 ||
    filters.concentrations.length > 0 ||
    filters.brands.length > 0 ||
    filters.perfumers.length > 0 ||
    filters.tags.length > 0 ||
    filters.favoritesOnly ||
    filters.neverWorn ||
    filters.samplesOnly ||
    hasPyramidFilter(filters.pyramidNotes)
  );
}

function applyFilters(fragrances: Fragrance[], f: ActiveFilters): Fragrance[] {
  if (!hasActive(f)) return fragrances;
  return fragrances.filter((fr) => {
    if (f.families.length > 0 && !f.families.some((fam) => fr.families.includes(fam))) return false;
    if (f.seasons.length > 0 && !f.seasons.some((s) => fr.seasons.includes(s))) return false;
    if (f.concentrations.length > 0 && !f.concentrations.includes(fr.concentration)) return false;
    if (f.brands.length > 0 && !f.brands.some((b) => fr.brand.toLowerCase().includes(b.toLowerCase()))) return false;
    if (f.perfumers.length > 0 && (!fr.perfumer || !f.perfumers.some((p) => fr.perfumer!.toLowerCase().includes(p.toLowerCase())))) return false;
    if (f.tags.length > 0 && !f.tags.some((t) => fr.tags.includes(t))) return false;
    if (f.favoritesOnly && !fr.isFavorite) return false;
    if (f.neverWorn && fr.lastUsed !== undefined) return false;
    if (f.samplesOnly && !fr.isSample) return false;
    if (f.pyramidNotes.top && !fr.pyramid?.top.some((n) => n.toLowerCase().includes(f.pyramidNotes.top!.toLowerCase()))) return false;
    if (f.pyramidNotes.heart && !fr.pyramid?.heart.some((n) => n.toLowerCase().includes(f.pyramidNotes.heart!.toLowerCase()))) return false;
    if (f.pyramidNotes.base && !fr.pyramid?.base.some((n) => n.toLowerCase().includes(f.pyramidNotes.base!.toLowerCase()))) return false;
    return true;
  });
}

function applySearch(fragrances: Fragrance[], query: string): Fragrance[] {
  if (!query.trim()) return fragrances;
  const q = query.trim().toLowerCase();
  return fragrances.filter(
    (f) => f.name.toLowerCase().includes(q) || f.brand.toLowerCase().includes(q)
  );
}

function countIncomplete(fragrances: Fragrance[]): number {
  return fragrances.filter((f) => !isComplete(f)).length;
}

function todayPrefix(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isWornToday(f: Fragrance): boolean {
  return !!f.lastUsed && f.lastUsed.startsWith(todayPrefix());
}

function computeTodayFragrances(fragrances: Fragrance[]): Fragrance[] {
  return fragrances.filter(isWornToday);
}

function autoShelfName(): string {
  return new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

function computeActiveShelf(shelves: Shelf[], activeShelfId: string | null): Shelf | undefined {
  return shelves.find((s) => s.id === activeShelfId);
}

interface FragrancesState {
  fragrances: Fragrance[];
  incompleteCount: number;
  activeFilters: ActiveFilters;
  filteredFragrances: Fragrance[];
  hasActiveFilters: boolean;
  sortState: SortState;
  searchQuery: string;
  sortedFragrances: Fragrance[];
  todayFragrances: Fragrance[];
  shelves: Shelf[];
  activeShelfId: string | null;
  activeShelf: Shelf | undefined;
  currentSelection: string[];
  selectionCount: number;
  add: (data: NewFragrance) => string;
  update: (id: string, data: Partial<NewFragrance>) => void;
  remove: (id: string) => void;
  setFilter: <K extends keyof ActiveFilters>(key: K, value: ActiveFilters[K]) => void;
  clearFilters: () => void;
  setSortState: (sort: SortState) => void;
  setSearchQuery: (query: string) => void;
  wearToday: (id: string) => void;
  unwearToday: (id: string) => void;
  addToSelection: (fragranceId: string) => void;
  removeFromSelection: (fragranceId: string) => void;
  saveSelection: (name: string) => void;
  clearSelection: () => void;
  deleteShelf: (shelfId: string) => void;
  setActiveShelf: (shelfId: string | null) => void;
  createShelf: (name: string) => void;
  renameShelf: (shelfId: string, name: string) => void;
}

export const useFragrancesStore = create<FragrancesState>()(
  persist(
    (set) => ({
      fragrances: [],
      incompleteCount: 0,
      activeFilters: DEFAULT_FILTERS,
      filteredFragrances: [],
      hasActiveFilters: false,
      sortState: DEFAULT_SORT,
      searchQuery: "",
      sortedFragrances: [],
      todayFragrances: [],
      shelves: [],
      activeShelfId: null,
      activeShelf: undefined,
      currentSelection: [],
      selectionCount: 0,
      add: (data) => {
        const id = crypto.randomUUID();
        set((state) => {
          const fragrances = [
            ...state.fragrances,
            { ...data, id, createdAt: new Date().toISOString() },
          ];
          const filteredFragrances = applyFilters(fragrances, state.activeFilters);
          return {
            fragrances,
            incompleteCount: countIncomplete(fragrances),
            filteredFragrances,
            sortedFragrances: applySort(applySearch(filteredFragrances, state.searchQuery), state.sortState),
            todayFragrances: computeTodayFragrances(fragrances),
          };
        });
        return id;
      },
      update: (id, data) =>
        set((state) => {
          const fragrances = state.fragrances.map((f) =>
            f.id === id ? { ...f, ...data } : f
          );
          const filteredFragrances = applyFilters(fragrances, state.activeFilters);
          return {
            fragrances,
            incompleteCount: countIncomplete(fragrances),
            filteredFragrances,
            sortedFragrances: applySort(applySearch(filteredFragrances, state.searchQuery), state.sortState),
            todayFragrances: computeTodayFragrances(fragrances),
          };
        }),
      remove: (id) =>
        set((state) => {
          const fragrances = state.fragrances.filter((f) => f.id !== id);
          const filteredFragrances = applyFilters(fragrances, state.activeFilters);
          return {
            fragrances,
            incompleteCount: countIncomplete(fragrances),
            filteredFragrances,
            sortedFragrances: applySort(applySearch(filteredFragrances, state.searchQuery), state.sortState),
            todayFragrances: computeTodayFragrances(fragrances),
          };
        }),
      setFilter: (key, value) =>
        set((state) => {
          const activeFilters = { ...state.activeFilters, [key]: value };
          const filteredFragrances = applyFilters(state.fragrances, activeFilters);
          return {
            activeFilters,
            filteredFragrances,
            hasActiveFilters: hasActive(activeFilters),
            sortedFragrances: applySort(applySearch(filteredFragrances, state.searchQuery), state.sortState),
          };
        }),
      clearFilters: () =>
        set((state) => {
          const filteredFragrances = state.fragrances;
          return {
            activeFilters: DEFAULT_FILTERS,
            filteredFragrances,
            hasActiveFilters: false,
            sortedFragrances: applySort(applySearch(filteredFragrances, state.searchQuery), state.sortState),
          };
        }),
      setSortState: (sort) =>
        set((state) => ({
          sortState: sort,
          sortedFragrances: applySort(applySearch(state.filteredFragrances, state.searchQuery), sort),
        })),
      setSearchQuery: (query) =>
        set((state) => ({
          searchQuery: query,
          sortedFragrances: applySort(applySearch(state.filteredFragrances, query), state.sortState),
        })),
      wearToday: (id) =>
        set((state) => {
          const fragrances = state.fragrances.map((f) =>
            f.id === id ? { ...f, lastUsed: new Date().toISOString() } : f
          );
          const filteredFragrances = applyFilters(fragrances, state.activeFilters);
          return {
            fragrances,
            filteredFragrances,
            sortedFragrances: applySort(applySearch(filteredFragrances, state.searchQuery), state.sortState),
            todayFragrances: computeTodayFragrances(fragrances),
          };
        }),
      unwearToday: (id) =>
        set((state) => {
          const fragrances = state.fragrances.map((f) =>
            f.id === id ? { ...f, lastUsed: undefined } : f
          );
          const filteredFragrances = applyFilters(fragrances, state.activeFilters);
          return {
            fragrances,
            filteredFragrances,
            sortedFragrances: applySort(applySearch(filteredFragrances, state.searchQuery), state.sortState),
            todayFragrances: computeTodayFragrances(fragrances),
          };
        }),
      addToSelection: (fragranceId) =>
        set((state) => {
          if (state.currentSelection.includes(fragranceId)) return {};
          const currentSelection = [...state.currentSelection, fragranceId];
          return { currentSelection, selectionCount: currentSelection.length };
        }),
      removeFromSelection: (fragranceId) =>
        set((state) => {
          const currentSelection = state.currentSelection.filter((id) => id !== fragranceId);
          return { currentSelection, selectionCount: currentSelection.length };
        }),
      saveSelection: (name) =>
        set((state) => {
          if (state.currentSelection.length === 0) return {};
          const newShelf: Shelf = {
            id: crypto.randomUUID(),
            name: name.trim() || autoShelfName(),
            createdAt: new Date().toISOString(),
            fragranceIds: [...state.currentSelection],
          };
          const shelves = [...state.shelves, newShelf];
          return {
            shelves,
            currentSelection: [],
            selectionCount: 0,
            activeShelfId: newShelf.id,
            activeShelf: newShelf,
          };
        }),
      clearSelection: () =>
        set(() => ({ currentSelection: [], selectionCount: 0 })),
      deleteShelf: (shelfId) =>
        set((state) => {
          const shelves = state.shelves.filter((s) => s.id !== shelfId);
          const activeShelfId = state.activeShelfId === shelfId
            ? (shelves[0]?.id ?? null)
            : state.activeShelfId;
          const activeShelf = computeActiveShelf(shelves, activeShelfId);
          return { shelves, activeShelfId, activeShelf };
        }),
      setActiveShelf: (shelfId) =>
        set((state) => {
          const activeShelf = computeActiveShelf(state.shelves, shelfId);
          return { activeShelfId: shelfId, activeShelf };
        }),
      createShelf: (name) =>
        set((state) => {
          const newShelf: Shelf = {
            id: crypto.randomUUID(),
            name,
            createdAt: new Date().toISOString(),
            fragranceIds: [],
          };
          const shelves = [...state.shelves, newShelf];
          return { shelves, activeShelfId: newShelf.id, activeShelf: newShelf };
        }),
      renameShelf: (shelfId, name) =>
        set((state) => {
          const shelves = state.shelves.map((s) => s.id === shelfId ? { ...s, name } : s);
          const activeShelf = computeActiveShelf(shelves, state.activeShelfId);
          return { shelves, activeShelf };
        }),
    }),
    {
      name: "fragrances",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        fragrances: state.fragrances,
        activeFilters: state.activeFilters,
        sortState: state.sortState,
        shelves: state.shelves,
        activeShelfId: state.activeShelfId,
        currentSelection: state.currentSelection,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.incompleteCount = countIncomplete(state.fragrances);
          state.filteredFragrances = applyFilters(state.fragrances, state.activeFilters);
          state.hasActiveFilters = hasActive(state.activeFilters);
          state.searchQuery = "";
          state.sortedFragrances = applySort(applySearch(state.filteredFragrances, ""), state.sortState);
          state.todayFragrances = computeTodayFragrances(state.fragrances);
          state.activeShelf = computeActiveShelf(state.shelves, state.activeShelfId);
          state.selectionCount = state.currentSelection.length;
        }
      },
    }
  )
);
