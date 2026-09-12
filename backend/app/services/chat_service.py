def mock_chat_response(question: str) -> str:
    text = question.lower()
    if "next" in text or "visit" in text:
        return "Visit the next cultural highlight before the crowd builds, then take a shaded local food break."
    if "explain" in text or "simply" in text:
        return "This place is important because generations of people have used it, cared for it and passed its stories forward. Look for the local detail behind the monument."
    if "food" in text:
        return "Try a nearby regional thali, seasonal snack or small family-run chai spot. I can narrow it by walking distance."
    if "crowd" in text:
        return "The destination twin currently shows a moderate crowd. I can steer you toward a calmer nearby place before you leave."
    if "safe" in text or "safer" in text or "less crowded" in text:
        return "Choose a verified, well-lit route with a local guide, or switch to the nearest low-crowd cultural experience."
    if "importance" in text or "culture" in text or "history" in text:
        return "Its cultural importance comes from the way history, living rituals, local craft and community memory meet in one place."
    if "plan" in text or "hour" in text:
        return "For the next three hours: one heritage story, a local meal, and a relaxed sunset viewpoint."
    return "I can explain the place simply, suggest what to visit next, find local food, or plan your next few hours."
