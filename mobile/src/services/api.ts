import axios from "axios";
import { destinations as fallbackDestinations } from "../data/mockData";

export type TwinData = {
  status: {
    crowd_level?: string;
    weather_status?: string;
    safety_status?: string;
    route_status?: string;
    estimated_visit_minutes?: number;
    best_suggestion?: string;
    nearby_cultural_event?: string;
    recommended_next_place?: string;
  };
  alerts: Array<{ title?: string; message?: string; severity?: string; is_active?: boolean }>;
};

export type CultureData = {
  stories: Array<Record<string, string | string[]>>;
};

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
    return response.data as TwinData;
  } catch {
    return {
      status: {
        weather_status: "clear",
        crowd_level: "moderate",
        safety_status: "all_clear",
        route_status: "open",
        estimated_visit_minutes: 150,
        best_suggestion: "Virupaksha Temple is crowded now. Visit Queen's Bath first and return after 5 PM for a better experience.",
        nearby_cultural_event: "Vijayanagara storytelling walk · 4:30 PM",
        recommended_next_place: "Queen's Bath",
      },
      alerts: [],
    };
  }
}

export async function requestSmartReroute(payload: Record<string, unknown>) {
  const response = await api.post("/smart-reroute", payload);
  return response.data;
}

export async function fetchCulture(id: string): Promise<CultureData> {
  try {
    const response = await api.get(`/culture/${id}`);
    return response.data as CultureData;
  } catch {
    return {
      stories: [{
        title: "Hampi in context",
        historical_importance: "Hampi was the heart of the Vijayanagara Empire, where temples, markets and art flourished.",
        local_story: "Local storytellers still connect the boulders and river to the legends of Kishkindha.",
        traditions: "Move slowly, observe respectfully and support local makers.",
        festival_connection: "Hampi Utsav brings music, dance and community stories to the heritage landscape.",
        food_and_craft_notes: "Try saaru, jolada rotti and banana-leaf meals. Look for local stone and Lambani embroidery.",
        dos: ["Dress respectfully at sacred sites", "Ask before photographing people"],
        donts: ["Do not touch monuments", "Do not block ceremonies or local work"],
      }],
    };
  }
}

export async function askGuide(question: string, destinationId?: string) {
  const response = await api.post("/chat", { user_id: "00000000-0000-0000-0000-000000000001", question, destination_id: destinationId });
  return response.data.answer as string;
}
