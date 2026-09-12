import axios from "axios";
import { destinations as fallbackDestinations } from "../data/mockData";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000",
  timeout: 5000,
});

export async function fetchDestinations() {
  try {
    const response = await api.get("/destinations");
    return response.data.items || response.data;
  } catch {
    return fallbackDestinations;
  }
}

export async function saveTravellerProfile(profile: Record<string, unknown>) {
  const response = await api.post("/traveller-profile", profile);
  return response.data;
}

export async function generateItinerary(payload: Record<string, unknown>) {
  const response = await api.post("/generate-itinerary", payload);
  return response.data;
}

export async function fetchDestinationTwin(id: string) {
  try {
    const response = await api.get(`/digital-twin/${id}`);
    return response.data;
  } catch {
    return { status: { weather_status: "clear", crowd_level: "moderate", safety_status: "all_clear", route_status: "open", best_suggestion: "Visit the cultural highlight before peak hours." }, alerts: [] };
  }
}
