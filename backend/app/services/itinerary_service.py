from ..models.schemas import ItineraryRequest


def generate_mock_itinerary(request: ItineraryRequest) -> dict:
    destination = request.destination.strip().title()
    interests = [interest.lower() for interest in request.interests]
    focus = ", ".join(request.interests[:2]) if request.interests else "heritage and local culture"
    templates = {
        "morning": ("Signature heritage start", f"Begin with the best-known {focus} experience in {destination}, before peak heat and crowds."),
        "afternoon": ("Local rhythm break", "Pause for a regional meal, then meet a local maker or explore a shaded market lane."),
        "evening": ("Golden-hour story", "Finish with a calm viewpoint and a short cultural story walk led by your Traveller Twin."),
    }
    if "food" in interests:
        templates["afternoon"] = ("Taste the neighbourhood", "Follow a small local food trail with a regional thali, snack and chai stop.")
    if "nature" in interests:
        templates["evening"] = ("Slow nature hour", "Choose a peaceful garden, riverside or sunset viewpoint with time to pause.")
    if request.walking_comfort.lower() in {"low", "easy"}:
        templates["morning"] = ("Easy cultural start", "Take the shortest accessible route to a signature landmark, with a comfortable stop nearby.")
        templates["evening"] = ("Nearby sunset", "End close to your base with a relaxed story, craft or food experience.")

    durations = {"slow": 75, "relaxed": 75, "balanced": 90, "full_day": 120, "fast": 110}
    duration = durations.get(request.travel_pace.lower(), 90)
    day_plans = []
    for day in range(1, request.days + 1):
        items = []
        for slot in ("morning", "afternoon", "evening"):
            title, description = templates[slot]
            items.append({
                "time_slot": slot,
                "title": title,
                "description": description,
                "estimated_minutes": duration,
                "cultural_note": f"Look for the local story behind {destination}'s living traditions.",
                "travel_tip": "Keep water, comfortable footwear and a little unplanned time with you.",
            })
        day_plans.append({"day": day, "items": items})
    return {
        "destination": destination,
        "days": request.days,
        "budget": request.budget,
        "interests": request.interests,
        "pace": request.travel_pace,
        "walking_comfort": request.walking_comfort,
        "summary": f"A {request.travel_pace} {request.days}-day plan tuned for {focus}.",
        "items": day_plans,
        "generated_by": "traveltwin-mock-ai",
    }
