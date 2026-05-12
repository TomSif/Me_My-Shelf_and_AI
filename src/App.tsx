import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShelfPage } from "./pages/ShelfPage";
import { AddPage } from "./pages/AddPage";
import { FragranceDetailPage } from "./pages/FragranceDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShelfPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/fragrance/:id" element={<FragranceDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
