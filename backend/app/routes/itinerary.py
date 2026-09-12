from fastapi import APIRouter

from ..models.schemas import ItineraryRequest
from ..services.itinerary_service import generate_mock_itinerary

router = APIRouter(tags=["itinerary"])


@router.post("/generate-itinerary")
def generate_itinerary(request: ItineraryRequest):
    return generate_mock_itinerary(request)
