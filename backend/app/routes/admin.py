from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter

from ..services.supabase_service import delete_row, get_row_by_field, insert_row, list_rows, update_row, upsert_row

router = APIRouter(prefix="/admin", tags=["admin"])


def resolve_destination(payload: dict[str, Any]) -> None:
    if payload.get("destination_id") or not payload.get("destination"):
        return
    destination = get_row_by_field("destinations", "name", str(payload.pop("destination")))
    if destination:
        payload["destination_id"] = destination["id"]


@router.get("/{resource}")
def list_admin_resource(resource: str) -> dict[str, list[dict[str, Any]]]:
    table = {
        "destinations": "destinations",
        "twin-status": "destination_twin_status",
        "cultural-stories": "cultural_stories",
        "events": "events",
        "alerts": "alerts",
        "experiences": "local_experiences",
    }.get(resource)
    if table is None:
        return {"items": []}
    return {"items": list_rows(table)}


@router.post("/destinations")
def save_destination(payload: dict[str, Any]):
    row_id = payload.pop("id", None)
    return update_row("destinations", row_id, payload) if row_id else insert_row("destinations", payload)


@router.delete("/destinations/{destination_id}")
def remove_destination(destination_id: str):
    delete_row("destinations", destination_id)
    return {"deleted": True, "id": destination_id}


@router.post("/twin-status")
def save_twin_status(payload: dict[str, Any]):
    payload.pop("destination", None)
    payload["last_updated_at"] = datetime.now(timezone.utc).isoformat()
    return upsert_row("destination_twin_status", payload, on_conflict="destination_id")


@router.post("/cultural-stories")
def save_cultural_story(payload: dict[str, Any]):
    resolve_destination(payload)
    row_id = payload.pop("id", None)
    return update_row("cultural_stories", row_id, payload) if row_id else insert_row("cultural_stories", payload)


@router.post("/alerts")
def create_alert(payload: dict[str, Any]):
    resolve_destination(payload)
    payload.setdefault("title", payload.get("alert_type", "Destination alert").title())
    payload.setdefault("message", "Please check the latest destination guidance.")
    return insert_row("alerts", payload)


@router.post("/events")
def create_event(payload: dict[str, Any]):
    resolve_destination(payload)
    payload.setdefault("description", "")
    payload.setdefault("starts_at", datetime.now(timezone.utc).isoformat())
    payload.setdefault("event_type", "heritage walk")
    payload.setdefault("name", "Cultural event")
    return insert_row("events", payload)
