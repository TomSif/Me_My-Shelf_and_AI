import type { Fragrance } from "../types/fragrance";

const STORAGE_KEY = "fragrances";

export const fragranceService = {
  getAll(): Fragrance[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Fragrance[]) : [];
  },

  save(fragrances: Fragrance[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fragrances));
  },
};