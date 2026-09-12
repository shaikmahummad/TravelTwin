from fastapi import APIRouter, HTTPException

from ..services.supabase_service import get_row, list_rows

router = APIRouter(prefix="/destinations", tags=["destinations"])


@router.get("")
def get_destinations():
    return {"items": list_rows("destinations")}


@router.get("/{destination_id}")
def get_destination(destination_id: str):
    destination = get_row("destinations", destination_id)
    if destination is None:
        raise HTTPException(status_code=404, detail="Destination not found")
    return destination
