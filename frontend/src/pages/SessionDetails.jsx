import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSessionById } from "../services/api";
import EventTimeline from "../components/EventTimeline";

export default function SessionDetails() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSessionById(id)
      .then((res) => setEvents(res.data))
      .catch((err) => setError(err.response?.status === 404 ? "Session not found" : err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-slate-500">Loading session…</p>;

  if (error) {
    return (
      <div className="space-y-4">
        <Link to="/" className="text-indigo-600 text-sm hover:underline">
          ← Back to Sessions
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/" className="text-indigo-600 text-sm hover:underline">
          ← Back to Sessions
        </Link>
        <h2 className="text-2xl font-bold text-slate-900 mt-3 mb-1">Session Journey</h2>
        <p className="font-mono text-sm text-slate-500 break-all">{id}</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-medium text-slate-500 mb-6">
          {events.length} event{events.length !== 1 ? "s" : ""} in chronological order
        </h3>
        <EventTimeline events={events} />
      </div>
    </div>
  );
}
