from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .routes import admin, alerts, chat, culture, destinations, digital_twin, events, itinerary, traveller

settings = get_settings()
app = FastAPI(title="TravelTwin API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(destinations.router)
app.include_router(traveller.router)
app.include_router(digital_twin.router)
app.include_router(culture.router)
app.include_router(itinerary.router)
app.include_router(alerts.router)
app.include_router(chat.router)
app.include_router(admin.router)
app.include_router(events.router)


@app.get("/health", tags=["system"])
def health():
    return {"status": "ok", "service": "traveltwin-api", "mock_ai": True}
