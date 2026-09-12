# TravelTwin AI

TravelTwin AI is an SIH 2026 MVP for adaptive tourism guidance in India. It demonstrates a Traveller Twin (preferences and comfort) paired with a Destination Twin (mock live conditions, culture, safety, and local experiences).

## Project structure

```text
TravelTwin/
├── mobile/                 # React Native + Expo tourist app
├── backend/                # FastAPI API and mock AI services
│   └── app/
│       ├── routes/         # Mobile/admin HTTP endpoints
│       ├── services/       # Supabase, itinerary, reroute, chat logic
│       └── models/         # Pydantic request schemas
├── web-admin/              # React/Next.js admin dashboard handoff
├── database/               # Supabase schema and seed data
├── src/                    # Current SIH showcase prototype
└── README.md
```

## Run the current showcase locally

```bash
npm install
npm run dev
```

The mobile-first traveller experience opens by default. Use **Admin showcase** in the lower-right corner to open the tourism control room.

## Demo flow

1. Create a Traveller Twin from the home prompt.
2. Open the Hampi live guide and show the map placeholder, current conditions, and next-best place.
3. Trigger **Reroute** to demonstrate adaptive guidance when a crowd builds.
4. Open the Culture layer or AI guide from the live experience.
5. Switch to the admin showcase and review destination twins, alerts, events, local experiences, and analytics.

All data is local mock data. The feature boundaries are intentionally ready to replace with API calls for destinations, alerts, maps, and AI generation.

## Run the FastAPI backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`, with interactive docs at
`http://localhost:8000/docs`. Without Supabase credentials, health, itinerary,
reroute, and chat endpoints still work with mock logic; database-backed
endpoints return empty collections until `.env` is configured.

## Supabase setup

Run `database/schema.sql` in the Supabase SQL editor, then run
`database/seed.sql`. Copy the project URL and anon key into
`backend/.env`. For a production deployment, enable Supabase RLS policies
before exposing user-specific tables.

## Recommended environment variables

Backend:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8081
```

Mobile: `EXPO_PUBLIC_API_URL=http://localhost:8000`

Admin: `VITE_API_URL=http://localhost:8000`

## API MVP

- `GET /health`
- `GET /destinations`
- `GET /destinations/{destination_id}`
- `POST /traveller-profile`
- `GET /traveller-profile/{user_id}`
- `GET /digital-twin/{destination_id}`
- `GET /culture/{destination_id}`
- `POST /generate-itinerary`
- `POST /smart-reroute`
- `POST /chat`
