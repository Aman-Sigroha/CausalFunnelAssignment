# CausalFunnel — User Analytics App

**Author:** Aman Sigroha

Tracks page views and clicks on a demo e-commerce site, stores events in MongoDB, and displays sessions, user journeys, and heatmaps in a React dashboard.

## Live Demo

- **Dashboard:** https://causal-funnel-assignment-kappa.vercel.app/
- **Demo Store:** https://causalfunnelassignment.onrender.com/demo-site/
- **API:** https://causalfunnelassignment.onrender.com/api/health

## Tech Stack

React · Vite · TailwindCSS · Node.js · Express · MongoDB Atlas

## Local Setup

```bash
# Backend (also serves demo site + tracker)
cd backend
cp .env.example .env   # add MONGODB_URI
npm install
npm run dev             # http://localhost:5000

# Frontend
cd frontend
cp .env.example .env
npm install
npm run dev             # http://localhost:5173
```

Open `http://localhost:5000/demo-site/`, interact with the store, then refresh the dashboard.

## Project Structure

```
tracker/      → client-side tracking script
backend/      → Express API + MongoDB
frontend/     → React analytics dashboard
demo-site/    → ShopWave demo store
```

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/events` | Store event |
| GET | `/api/sessions` | List sessions |
| GET | `/api/sessions/:id` | Session journey |
| GET | `/api/heatmap?page=` | Click data for heatmap |
| GET | `/api/pages` | Unique page URLs |

## Deployment

| Service | Platform | Env var |
|---------|----------|---------|
| Backend + demo | Render | `MONGODB_URI` |
| Dashboard | Vercel | `VITE_API_URL=https://causalfunnelassignment.onrender.com/api` |

Atlas → Network Access → allow `0.0.0.0/0` for Render.

## Assumptions

- Session ID in `localStorage`
- Single MongoDB collection for all events
- No auth on dashboard (demo/MVP)
- Heatmap uses click coordinates + viewport size

## Future Improvements

Session replay · scroll tracking · rage clicks · conversion funnels · real-time dashboard
