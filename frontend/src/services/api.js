import axios from "axios";
import { API_BASE } from "../config";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Cache-Control": "no-cache" },
});

const noCache = { params: { _t: Date.now() } };

export const getSessions = () => api.get("/sessions", noCache);
export const getSessionStats = () => api.get("/sessions/stats", noCache);
export const getSessionById = (id) => api.get(`/sessions/${id}`, noCache);
export const getHeatmapData = (page) => api.get("/heatmap", { params: { page, _t: Date.now() } });
export const getPages = () => api.get("/pages", noCache);

export default api;
