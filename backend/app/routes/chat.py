from fastapi import APIRouter

from ..models.schemas import ChatRequest, RerouteRequest
from ..services.chat_service import mock_chat_response
from ..services.reroute_service import suggest_reroute

router = APIRouter(tags=["guide"])


@router.post("/smart-reroute")
def smart_reroute(request: RerouteRequest):
    return suggest_reroute(request.model_dump())


@router.post("/chat")
def chat(request: ChatRequest):
    return {
        "answer": mock_chat_response(request.question),
        "destination_id": request.destination_id,
        "generated_by": "traveltwin-mock-ai",
    }
