# Mobile app

This is the React Native + Expo home for the tourist experience. It now includes
the initial navigation flow, design system, Traveller Twin setup, dashboard,
destination browsing, live digital twin, culture layer, chat guide, safety
screen, and itinerary planner.
I want to create something impossible, but how?

```bash
npm install
npx expo start
```

Set `EXPO_PUBLIC_API_URL` in `.env` to point to the FastAPI server. Screens
fallback to sample Indian destination data when the backend is unavailable.
