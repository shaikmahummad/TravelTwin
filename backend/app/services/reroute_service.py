def suggest_reroute(payload: dict) -> dict:
    reasons = []
    suggestions = []
    crowd = payload["crowd_level"].lower()
    weather = payload["weather"].lower()
    safety = payload["safety"].lower()
    route = payload["route_status"].lower()
    walking = payload["walking_comfort"].lower()
    if crowd in {"busy", "high", "very_high"}:
        reasons.append("crowd is building")
        suggestions.append({"type": "less_crowded", "title": "Choose a calmer nearby place", "place": "A quieter heritage lane or local craft market", "reason": "Lower crowd right now."})
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
        return {"reroute_needed": False, "message": "Your current route still looks good.", "alternative": None}
    return {
        "reroute_needed": True,
        "reasons": reasons,
        "message": "I found a better plan for right now.",
        "suggestions": suggestions,
        "alternative": suggestions[0]["place"],
        "generated_by": "traveltwin-rule-engine",
    }
