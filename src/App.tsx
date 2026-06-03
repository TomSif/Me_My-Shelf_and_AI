import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollectionPage } from "./pages/CollectionPage";
import { ShelfPage } from "./pages/ShelfPage";
import { FragrancePage } from "./pages/FragrancePage";

function App() {
  return (
    <BrowserRouter>
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