from fastapi import APIRouter

from ..services.supabase_service import related_rows

router = APIRouter(prefix="/culture", tags=["culture"])


@router.get("/{destination_id}")
def get_culture(destination_id: str):
    return {"destination_id": destination_id, "stories": related_rows("cultural_stories", "destination_id", destination_id)}
