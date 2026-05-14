import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Fragrance, NewFragrance } from "../types/fragrance";
import { isComplete } from "../utils/fragrance";

interface FragrancesState {
  fragrances: Fragrance[];
  incompleteCount: number;
  add: (data: NewFragrance) => string;
  update: (id: string, data: Partial<NewFragrance>) => void;
  remove: (id: string) => void;
}

function countIncomplete(fragrances: Fragrance[]): number {
  return fragrances.filter((f) => !isComplete(f)).length;
}

export const useFragrancesStore = create<FragrancesState>()(
  persist(
    (set) => ({
      fragrances: [],
      incompleteCount: 0,
      add: (data) => {
        const id = crypto.randomUUID();
        set((state) => {
          const fragrances = [
            ...state.fragrances,
            { ...data, id, createdAt: new Date().toISOString() },
          ];
          return { fragrances, incompleteCount: countIncomplete(fragrances) };
        });
        return id;
      },
      update: (id, data) =>
        set((state) => {
          const fragrances = state.fragrances.map((f) =>
            f.id === id ? { ...f, ...data } : f
          );
          return { fragrances, incompleteCount: countIncomplete(fragrances) };
        }),
      remove: (id) =>
        set((state) => {
          const fragrances = state.fragrances.filter((f) => f.id !== id);
          return { fragrances, incompleteCount: countIncomplete(fragrances) };
        }),
    }),
    {
      name: "fragrances",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ fragrances: state.fragrances }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.incompleteCount = countIncomplete(state.fragrances);
        }
      },
    }
  )
);
