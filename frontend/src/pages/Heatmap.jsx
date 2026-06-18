import { useEffect, useState } from "react";
import { getPages, getHeatmapData } from "../services/api";
import HeatmapCanvas from "../components/HeatmapCanvas";

export default function Heatmap() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clicksLoading, setClicksLoading] = useState(false);

  useEffect(() => {
    getPages()
      .then((res) => {
        setPages(res.data);
        if (res.data.length > 0) setSelectedPage(res.data[0]);
      })
      .catch(() => setPages([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedPage) return;
    setClicksLoading(true);
    getHeatmapData(selectedPage)
      .then((res) => setClicks(res.data))
      .catch(() => setClicks([]))
      .finally(() => setClicksLoading(false));
  }, [selectedPage]);

  const viewportWidth = clicks[0]?.viewportWidth;
  const viewportHeight = clicks[0]?.viewportHeight;

  if (loading) return <p className="text-slate-500">Loading pages…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Click Heatmap</h2>
        <p className="text-slate-500">Visualize where users click on each page</p>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="page-select" className="text-sm font-medium text-slate-700">
          Select Page
        </label>
        <select
          id="page-select"
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {pages.length === 0 ? (
            <option value="">No pages tracked yet</option>
          ) : (
            pages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))
          )}
        </select>
      </div>

      {clicksLoading ? (
        <p className="text-slate-500">Loading clicks…</p>
      ) : (
        <HeatmapCanvas
          clicks={clicks}
          viewportWidth={viewportWidth}
          viewportHeight={viewportHeight}
        />
      )}
    </div>
  );
}
