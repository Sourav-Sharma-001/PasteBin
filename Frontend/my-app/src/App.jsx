import { Routes, Route } from "react-router-dom";
import CreatePaste from "./pages/CreatePage";
import ViewPaste from "./pages/ViewPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatePaste />} />
      <Route path="/p/:id" element={<ViewPaste />} />
    </Routes>
  );
}
