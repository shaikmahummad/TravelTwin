from supabase import Client, create_client

from .config import get_settings


def get_supabase() -> Client | None:
    """Return a Supabase client when credentials are configured.

    The API can still run with mock data during local UI development.
    """
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_key:
        return None
    return create_client(settings.supabase_url, settings.supabase_key)
