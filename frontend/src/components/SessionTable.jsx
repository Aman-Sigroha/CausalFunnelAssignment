import { useNavigate } from "react-router-dom";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString();
}

function truncateId(id) {
  return id.length > 12 ? `${id.slice(0, 8)}…` : id;
}

export default function SessionTable({ sessions }) {
  const navigate = useNavigate();

  if (sessions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
        No sessions yet. Open the demo site at{" "}
        <a href="http://localhost:5000/demo-site/" className="text-indigo-600 underline" target="_blank" rel="noreferrer">
          localhost:5000/demo-site
        </a>{" "}
        and click around, then hit Refresh.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left px-6 py-3 font-medium text-slate-600">Session ID</th>
            <th className="text-left px-6 py-3 font-medium text-slate-600">Events</th>
            <th className="text-left px-6 py-3 font-medium text-slate-600">First Visit</th>
            <th className="text-left px-6 py-3 font-medium text-slate-600">Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr
              key={session.sessionId}
              onClick={() => navigate(`/session/${session.sessionId}`)}
              className="border-b border-slate-100 hover:bg-indigo-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 font-mono text-indigo-600" title={session.sessionId}>
                {truncateId(session.sessionId)}
              </td>
              <td className="px-6 py-4">{session.eventCount}</td>
              <td className="px-6 py-4 text-slate-500">{formatDate(session.firstVisit)}</td>
              <td className="px-6 py-4 text-slate-500">{formatDate(session.lastVisit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
