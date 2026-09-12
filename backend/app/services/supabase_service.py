from typing import Any

from ..database import get_supabase


def list_rows(table: str, *, order_by: str = "created_at") -> list[dict[str, Any]]:
    client = get_supabase()
    if client is None:
        return []
    response = client.table(table).select("*").order(order_by, desc=True).execute()
    return response.data or []


def get_row(table: str, row_id: str) -> dict[str, Any] | None:
    client = get_supabase()
    if client is None:
        return None
    response = client.table(table).select("*").eq("id", row_id).maybe_single().execute()
    return response.data


def get_row_by_field(table: str, field: str, value: str) -> dict[str, Any] | None:
    client = get_supabase()
    if client is None:
        return None
    response = client.table(table).select("*").eq(field, value).maybe_single().execute()
    return response.data


def upsert_row(table: str, values: dict[str, Any]) -> dict[str, Any]:
    client = get_supabase()
    if client is None:
        return values
    response = client.table(table).upsert(values, on_conflict="user_id").execute()
    return (response.data or [values])[0]


def related_rows(table: str, column: str, value: str) -> list[dict[str, Any]]:
    client = get_supabase()
    if client is None:
        return []
    response = client.table(table).select("*").eq(column, value).execute()
    return response.data or []
