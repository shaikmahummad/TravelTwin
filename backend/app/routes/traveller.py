from fastapi import APIRouter

from ..models.schemas import TravellerProfileInput
from ..services.supabase_service import get_row_by_field, upsert_row

router = APIRouter(tags=["traveller"])


@router.post("/traveller-profile")
def save_traveller_profile(profile: TravellerProfileInput):
    return upsert_row("traveller_profiles", profile.model_dump(mode="json"))


@router.get("/traveller-profile/{user_id}")
def get_traveller_profile(user_id: str):
    profile = get_row_by_field("traveller_profiles", "user_id", user_id)
    return profile or {"user_id": user_id, "is_configured": False}
