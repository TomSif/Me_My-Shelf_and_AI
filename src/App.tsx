import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollectionPage } from "./pages/CollectionPage";
import { ShelfPage } from "./pages/ShelfPage";
import { FragrancePage } from "./pages/FragrancePage";
import { useFragrancesStore } from "./stores/fragrancesStore";

function AppInitializer() {
  const ensureTodayShelf = useFragrancesStore((s) => s.ensureTodayShelf);
  useEffect(() => { ensureTodayShelf(); }, [ensureTodayShelf]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AppInitializer />
      <Routes>
        <Route path="/" element={<CollectionPage />} />
        <Route path="/shelf" element={<ShelfPage />} />
        <Route path="/add" element={<FragrancePage mode="create" />} />
        <Route path="/fragrance/:id" element={<FragrancePage mode="view" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;