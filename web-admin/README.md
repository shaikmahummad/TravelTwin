# TravelTwin web admin

The React/Vite tourism control center manages destination data, live digital
twin signals, cultural stories, events, alerts, local experiences, and analytics.
It uses the FastAPI `/admin/*` routes, with demo data retained when the backend
or Supabase is unavailable so the SIH showcase remains usable.

```bash
npm install
npm run dev
```

Set `VITE_API_URL` when the API is not running on `http://localhost:8000`.
