# TravelTwin SIH 2026 demo script

**Length:** 5 minutes  
**Message:** Traveller Twin + Destination Twin = personalized, adaptive and culturally rich travel guidance.

## 0:00–0:30 — Set the problem

“Indian tourism is not static. A monument can become crowded, a route can close,
weather can change, and a visitor can miss the cultural story behind the place.
TravelTwin connects the tourist’s preferences with live destination intelligence,
so the next recommendation changes with the real world.”

Open the Expo mobile app on the Welcome screen. Point out that this is guidance,
not a hotel or ticket-booking app.

## 0:30–1:00 — Create the Traveller Twin

Tap **Create my Traveller Twin**. Select:

- Cultural explorer
- Heritage, local food and craft
- Comfortable walking
- Balanced safety preference

Say: “This profile becomes the traveller side of the product. It tells the
system what kind of experience is meaningful and comfortable for this person.”

Save the profile and continue to Home.

## 1:00–1:35 — Choose Hampi and generate a plan

Tap **Explore destinations**, select **Hampi**, and show its destination detail.
Tap **Generate itinerary** and point out the heritage, food and sunset rhythm.

Say: “The plan is generated from interests and walking comfort. The system is
not only optimizing distance; it is preserving a good cultural sequence.”

## 1:35–2:20 — Show the Digital Twin Live Guide

Tap **Start live guide**. Highlight:

- Crowd level
- Weather status
- Safety status
- Route status
- Estimated visit time
- Active alerts
- Nearby cultural event

Read the recommendation: “Virupaksha Temple is crowded now. Visit Queen’s Bath
first and return after 5 PM for a better experience.”

Say: “This is the Destination Twin. It watches the destination signals and
turns them into a clear action for the visitor.”

## 2:20–2:55 — Demonstrate Smart Reroute

Tap **Reroute me**. Show:

- Problem detected: high crowd at the main monument
- New plan: Archaeological Museum first
- Reason: less crowded, indoor and aligned with cultural interest
- Time saved and cultural value

Say: “The route changes without throwing away the purpose of the trip. The
visitor still gets heritage, but with less friction.”

## 2:55–3:25 — Open the Culture Layer

Tap **View culture layer**. Show simple history, local story, tradition, festival,
food, craft and do’s and don’ts.

Say: “TravelTwin treats cultural heritage as part of the experience. It helps a
first-time visitor understand the place, respect local life and support makers.”

## 3:25–3:55 — Ask the Guide and show safety

Open **Ask guide** and ask: “Suggest local food nearby” or “Explain this place
simply.” Show the friendly rule-based answer and suggested question chips.

Open **Safety help** and show emergency contacts, offline itinerary, local tips
and the SOS information flow.

Say: “The MVP uses transparent mock AI and rule-based guidance today. It is
structured so a future model can improve the language without changing the
product logic.”

## 3:55–4:35 — Switch to the admin control center

Open `web-admin` and sign in with the prefilled demo account.

Show the dashboard metrics and then open **Digital Twin Status**. Edit Hampi:

- Crowd: High
- Route: Crowded
- Suggestion: “Visit Queen’s Bath first and return after 5 PM.”

Save the update. Then open **Alerts**, create a **Festival crowd notice** for
Hampi with Medium severity, and publish it. Open **Events** and show Hampi Utsav
or create a heritage walk.

Say: “This is the tourism operations side. An administrator can respond to
conditions and publish cultural programming without changing the mobile app.”

## 4:35–5:00 — Close the loop

Return to the mobile Digital Twin screen and refresh/reopen it. Show the updated
crowd guidance and alert.

Close with: “The admin update becomes a better tourist decision. Traveller Twin
understands the person; Destination Twin understands the place. Together,
TravelTwin improves tourist flow, safety, local discovery and the visibility of
Indian cultural heritage.”

## Demo fallback

If Supabase or FastAPI is unavailable, the mobile and admin apps retain realistic
Hampi, Jaipur, Varanasi, Mysuru, Kochi and Kaziranga demo data. Explain that the
same screens are connected to the FastAPI routes in a live deployment.
