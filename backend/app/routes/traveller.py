from fastapi import APIRouter, HTTPException

from ..models.schemas import TravellerProfileInput
from ..services.traveller_service import get_profile, personalized_home, save_profile

router = APIRouter(tags=["traveller"])


@router.post("/traveller-profile")
def save_traveller_profile(profile: TravellerProfileInput):
    return save_profile(profile.model_dump())


@router.get("/traveller-profile/{user_id}")
def get_traveller_profile(user_id: str):
    profile = get_profile(user_id)
    if profile is None:
        raise HTTPException(status_code=404, detail=f"Traveller Twin profile not found for user '{user_id}'")
    return profile


@router.get("/personalized-home/{user_id}")
def get_personalized_home(user_id: str):
    home = personalized_home(user_id)
    if home is None:
        raise HTTPException(status_code=404, detail=f"Traveller Twin profile not found for user '{user_id}'")
    return home
