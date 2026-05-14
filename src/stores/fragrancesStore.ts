import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Fragrance, NewFragrance } from "../types/fragrance";
import { isComplete } from "../utils/fragrance";

interface FragrancesState {
  fragrances: Fragrance[];
  incompleteCount: number;
  add: (data: NewFragrance) => void;
  update: (id: string, data: Partial<NewFragrance>) => void;
  remove: (id: string) => void;
}

export const useFragrancesStore = create<FragrancesState>()(
  persist(
    (set, get) => ({
      fragrances: [],
      get incompleteCount() {
        return get().fragrances.filter((f) => !isComplete(f)).length;
      },
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
      update: (id, data) =>
        set((state) => ({
          fragrances: state.fragrances.map((f) =>
            f.id === id ? { ...f, ...data } : f
          ),
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
