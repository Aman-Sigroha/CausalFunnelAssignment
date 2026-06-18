import { NavLink } from "react-router-dom";
import { DEMO_SITE_URL } from "../config";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">CF</span>
          </div>
          <h1 className="text-lg font-semibold text-slate-900">Analytics Dashboard</h1>
        </div>
        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Sessions
          </NavLink>
          <NavLink to="/heatmap" className={linkClass}>
            Heatmap
          </NavLink>
          <a
            href={DEMO_SITE_URL}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            Demo Site ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
