from fastapi import APIRouter

from ..services.supabase_service import get_row, related_rows

router = APIRouter(prefix="/digital-twin", tags=["digital-twin"])


@router.get("/{destination_id}")
def get_digital_twin(destination_id: str):
    status = related_rows("destination_twin_status", "destination_id", destination_id)
    alerts = related_rows("alerts", "destination_id", destination_id)
    return {
        "destination_id": destination_id,
        "status": status[0] if status else {
            "crowd_level": "moderate",
            "weather_status": "clear",
            "safety_status": "all_clear",
            "route_status": "open",
            "estimated_visit_minutes": 120,
            "best_suggestion": "Start with the cultural highlight before peak hours.",
        },
        "alerts": [alert for alert in alerts if alert.get("is_active", True)],
    }
