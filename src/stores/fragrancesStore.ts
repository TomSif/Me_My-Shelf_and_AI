import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Fragrance, NewFragrance } from "../types/fragrance";

interface FragrancesState {
  fragrances: Fragrance[];
  add: (data: NewFragrance) => void;
  remove: (id: string) => void;
}

export const useFragrancesStore = create<FragrancesState>()(
  persist(
    (set) => ({
      fragrances: [],
      add: (data) =>
        set((state) => ({
          fragrances: [
            ...state.fragrances,
            {
              ...data,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      remove: (id) =>
        set((state) => ({
          fragrances: state.fragrances.filter((f) => f.id !== id),
        })),
    }),
    {
      name: "fragrances",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ fragrances: state.fragrances }),
    }
  )
);
