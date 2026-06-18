const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API_BASE = apiBase;

export const DEMO_SITE_URL =
  import.meta.env.VITE_DEMO_SITE_URL ||
  apiBase.replace(/\/api\/?$/, "/demo-site/");
