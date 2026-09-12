from fastapi import APIRouter

from ..services.supabase_service import list_rows, related_rows

router = APIRouter(prefix="/events", tags=["events"])


@router.get("")
def get_events(destination_id: str | None = None):
    items = related_rows("events", "destination_id", destination_id) if destination_id else list_rows("events")
    return {"items": items}
