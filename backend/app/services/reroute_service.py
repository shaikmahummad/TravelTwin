def suggest_reroute(payload: dict) -> dict:
    reasons = []
    suggestions = []
    crowd = payload["crowd_level"].lower()
    weather = payload["weather"].lower()
    safety = payload["safety"].lower()
    route = payload["route_status"].lower()
    walking = payload["walking_comfort"].lower()
    interests = [interest.lower() for interest in payload.get("interests", [])]
    cultural_interest = any(interest in {"culture", "cultural", "history", "heritage"} for interest in interests)
    if crowd in {"busy", "high", "very_high"}:
        reasons.append("crowd is building")
        place = "Archaeological Museum first" if cultural_interest else "A quieter heritage lane or local craft market"
        suggestions.append({"type": "less_crowded", "title": "Choose a calmer nearby place", "place": place, "reason": "It is less crowded and still matches your interests." if cultural_interest else "Lower crowd right now."})
    if weather not in {"clear", "good"}:
        reasons.append("weather may change")
        suggestions.append({"type": "indoor", "title": "Move indoors or under cover", "place": "A museum, cultural centre or covered food experience", "reason": "More comfortable if weather turns."})
    if safety not in {"all_clear", "clear", "safe"}:
        reasons.append("safety status needs caution")
        suggestions.append({"type": "safer", "title": "Use a safer verified route", "place": "A well-lit, guide-supported experience", "reason": "Matches your safety preference."})
    if route not in {"open", "clear"}:
        reasons.append("the current route is not fully open")
        suggestions.append({"type": "alternate", "title": "Take an alternate route", "place": "The closest open landmark in your itinerary", "reason": "Avoids the closure."})
    if walking in {"low", "easy"}:
        reasons.append("your walking comfort is low")
        suggestions.append({"type": "shorter", "title": "Shorten the next loop", "place": "The nearest accessible highlight", "reason": "Keeps the plan comfortable."})
    if not reasons:
        return {"reroute_needed": False, "message": "Your current route still looks good.", "alternative": None, "original_plan": "Continue to your planned landmark.", "problem_detected": "No live issue detected.", "new_plan": "Keep your current plan.", "reason": "Crowd, weather, safety and route conditions are all favorable.", "estimated_time_saved_minutes": 0, "cultural_value": "Stay with the heritage experience you selected."}
    primary = suggestions[0]
    time_saved = 20 if primary["type"] in {"less_crowded", "shorter"} else 10
    return {
        "reroute_needed": True,
        "reasons": reasons,
        "message": "I found a better plan for right now.",
        "suggestions": suggestions,
        "alternative": suggestions[0]["place"],
        "generated_by": "traveltwin-rule-engine",
        "original_plan": "Visit the main monument next.",
        "problem_detected": reasons[0].capitalize() + ".",
        "new_plan": f"Visit {primary['place']} first.",
        "reason": " ".join(reason.capitalize() + "." for reason in reasons),
        "estimated_time_saved_minutes": time_saved,
        "cultural_value": "You still get a meaningful local history experience, with more time to notice the stories and craft around you.",
    }
