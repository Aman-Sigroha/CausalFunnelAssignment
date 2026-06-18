import axios from "axios";
import { API_BASE } from "../config";

const api = axios.create({ baseURL: API_BASE });

export const getSessions = () => api.get("/sessions");
export const getSessionStats = () => api.get("/sessions/stats");
export const getSessionById = (id) => api.get(`/sessions/${id}`);
export const getHeatmapData = (page) => api.get("/heatmap", { params: { page } });
export const getPages = () => api.get("/pages");

export default api;
