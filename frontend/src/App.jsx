import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import SessionDetails from "./pages/SessionDetails";
import Heatmap from "./pages/Heatmap";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/session/:id" element={<SessionDetails />} />
          <Route path="/heatmap" element={<Heatmap />} />
        </Routes>
      </main>
    </div>
  );
}
