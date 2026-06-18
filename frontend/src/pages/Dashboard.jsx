import { useEffect, useState } from "react";
import { getSessions, getSessionStats } from "../services/api";
import SessionTable from "../components/SessionTable";

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-slate-900">{value ?? "—"}</p>
    </div>
  );
}

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = () => {
    setLoading(true);
    setError(null);
    Promise.all([getSessions(), getSessionStats()])
      .then(([sessionsRes, statsRes]) => {
        setSessions(sessionsRes.data);
        setStats(statsRes.data);
        setLastUpdated(new Date());
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading sessions…</p>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
        Failed to load data. Check that the backend is running and VITE_API_URL is set correctly.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Sessions</h2>
          <p className="text-slate-500">
            Overview of tracked user sessions
            {lastUpdated && (
              <span className="text-slate-400"> · Updated {lastUpdated.toLocaleTimeString()}</span>
            )}
          </p>
        </div>
        <button
          onClick={loadData}
          className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Sessions" value={stats?.totalSessions} />
        <StatCard label="Total Events" value={stats?.totalEvents} />
        <StatCard label="Total Clicks" value={stats?.totalClicks} />
      </div>

      <SessionTable sessions={sessions} />
    </div>
  );
}
