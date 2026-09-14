from typing import Any
from uuid import UUID

from pydantic import BaseModel, Field


class TravellerProfileInput(BaseModel):
    user_id: str
    name: str
    travel_style: str
    interests: list[str] = Field(min_length=1)
    budget_range: str
    walking_comfort: str
    preferred_language: str
    safety_preference: str


class TravellerProfile(BaseModel):
    id: UUID | None = None
    user_id: str
    name: str
    travel_style: str
    interests: list[str]
    budget_range: str
    walking_comfort: str
    preferred_language: str
    safety_preference: str
    created_at: str | None = None
    updated_at: str | None = None


class ItineraryRequest(BaseModel):
    user_id: UUID | None = None
    destination: str
    days: int = Field(default=1, ge=1, le=14)
    interests: list[str] = Field(default_factory=list)
    budget: str = "medium"
    travel_pace: str = "balanced"
    walking_comfort: str = "comfortable"


class RerouteRequest(BaseModel):
    destination_id: str
    crowd_level: str = "moderate"
    weather: str = "clear"
    safety: str = "all_clear"
    route_status: str = "open"
    walking_comfort: str = "comfortable"
    interests: list[str] = Field(default_factory=list)


class ChatRequest(BaseModel):
    user_id: UUID
    question: str = Field(min_length=1, max_length=500)
    destination_id: UUID | None = None


class ApiMessage(BaseModel):
    message: str
    data: dict[str, Any] | list[Any] | None = None
