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


def upsert_row(table: str, values: dict[str, Any], *, on_conflict: str = "user_id") -> dict[str, Any]:
    client = get_supabase()
    if client is None:
        return values
    response = client.table(table).upsert(values, on_conflict=on_conflict).execute()
    return (response.data or [values])[0]


def related_rows(table: str, column: str, value: str) -> list[dict[str, Any]]:
    client = get_supabase()
    if client is None:
        return []
    response = client.table(table).select("*").eq(column, value).execute()
    return response.data or []


def insert_row(table: str, values: dict[str, Any]) -> dict[str, Any]:
    client = get_supabase()
    if client is None:
        return values
    response = client.table(table).insert(values).execute()
    return (response.data or [values])[0]


def update_row(table: str, row_id: str, values: dict[str, Any]) -> dict[str, Any]:
    client = get_supabase()
    if client is None:
        return {"id": row_id, **values}
    response = client.table(table).update(values).eq("id", row_id).execute()
    return (response.data or [{"id": row_id, **values}])[0]


def delete_row(table: str, row_id: str) -> None:
    client = get_supabase()
    if client is not None:
        client.table(table).delete().eq("id", row_id).execute()
