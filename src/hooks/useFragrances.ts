import { useState, useEffect } from "react";
import type { Fragrance, NewFragrance } from "../types/fragrance";
import { fragranceService } from "../services/fragranceService";

export function useFragrances() {
  const [fragrances, setFragrances] = useState<Fragrance[]>(
    () => fragranceService.getAll()
  );

  useEffect(() => {
    fragranceService.save(fragrances);
  }, [fragrances]);

  function add(data: NewFragrance) {
    const fragrance: Fragrance = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setFragrances((prev) => [...prev, fragrance]);
  }

  function remove(id: string) {
    setFragrances((prev) => prev.filter((f) => f.id !== id));
  }

  return { fragrances, add, remove };
}