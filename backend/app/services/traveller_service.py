from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

from .supabase_service import get_row_by_field, upsert_row

_mock_profiles: dict[str, dict[str, Any]] = {}

DESTINATION_DETAILS = {
    "Hampi": {
        "city": "Hosapete",
        "state": "Karnataka",
        "description": "A living landscape of Vijayanagara ruins, boulders and river stories.",
    },
    "Jaipur": {
        "city": "Jaipur",
        "state": "Rajasthan",
        "description": "The Pink City, where forts, craft and food meet royal history.",
    },
    "Varanasi": {
        "city": "Varanasi",
        "state": "Uttar Pradesh",
        "description": "A sacred riverside city shaped by ritual, music and living traditions.",
    },
    "Kaziranga": {
        "city": "Golaghat",
        "state": "Assam",
        "description": "A wild landscape known for grasslands, wetlands and one-horned rhinos.",
    },
    "Kochi": {
        "city": "Kochi",
        "state": "Kerala",
        "description": "A coastal archive of spice routes, art and layered communities.",
    },
}


def save_profile(values: dict[str, Any]) -> dict[str, Any]:
    now = datetime.now(timezone.utc).isoformat()
    existing = get_profile(values["user_id"])
    saved = {
        **(existing or {}),
        **values,
        "id": (existing or {}).get("id", str(uuid4())),
        "created_at": (existing or {}).get("created_at", now),
        "updated_at": now,
    }
    _mock_profiles[values["user_id"]] = saved
    result = upsert_row("traveller_profiles", saved)
    _mock_profiles[values["user_id"]] = result
    return result


def get_profile(user_id: str) -> dict[str, Any] | None:
    if user_id in _mock_profiles:
        return _mock_profiles[user_id]
    stored = get_row_by_field("traveller_profiles", "user_id", user_id)
    if stored:
        _mock_profiles[user_id] = stored
    return stored


def _recommendation(profile: dict[str, Any]) -> tuple[str, str]:
    interests = {interest.lower() for interest in profile["interests"]}
    if "forts" in interests:
        return "Hampi", "Your interest in forts matches Hampi's monumental ruins and living heritage."
    if "spiritual" in interests or "temples" in interests:
        return "Varanasi", "Your spiritual interests fit Varanasi's riverside rituals and layered traditions."
    if "nature" in interests:
        return "Kaziranga", "Your love of nature makes Kaziranga's wetlands and wildlife a strong fit."
    if "food" in interests:
        return "Kochi", "Your food interest fits Kochi's spice routes and local food stories."
    return "Jaipur", "Jaipur blends culture, craft, food and heritage into an easy first recommendation."


def personalized_home(user_id: str) -> dict[str, Any] | None:
    profile = get_profile(user_id)
    if profile is None:
        return None
    destination, reason = _recommendation(profile)
    details = DESTINATION_DETAILS[destination]
    return {
        "traveller_twin": profile,
        "recommended_destination": {"name": destination, **details},
        "reason": reason,
        "suggested_next_action": f"Explore {destination}'s live destination twin",
        "cultural_highlight": f"Discover the local stories, food and crafts that make {destination} memorable.",
        "digital_twin_preview": {
            "status": "Ready to explore",
            "summary": "Live crowd, weather and safety guidance will adapt to your preferences.",
        },
    }
