from fastapi import APIRouter

from ..services.supabase_service import list_rows

router = APIRouter(prefix="/alerts", tags=["alerts"])


@router.get("")
def get_alerts():
    return {"items": list_rows("alerts")}
