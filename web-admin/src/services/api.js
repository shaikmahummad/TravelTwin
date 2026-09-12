const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
async function request(path, options = {}) { const response = await fetch(`${baseUrl}${path}`, { headers: { "Content-Type": "application/json" }, ...options }); if (!response.ok) throw new Error(`API request failed: ${response.status}`); return response.json(); }
export const adminApi = {
  list: (resource) => request(`/admin/${resource}`),
  saveDestination: (data) => request("/admin/destinations", { method: "POST", body: JSON.stringify(data) }),
  deleteDestination: (id) => request(`/admin/destinations/${id}`, { method: "DELETE" }),
  saveTwinStatus: (data) => request("/admin/twin-status", { method: "POST", body: JSON.stringify(data) }),
  saveCulture: (data) => request("/admin/cultural-stories", { method: "POST", body: JSON.stringify(data) }),
};
export const demoData = {
  destinations: [
    { id: "hampi", name: "Hampi", city: "Hosapete", state: "Karnataka", description: "Vijayanagara ruins, boulders and river stories.", opening_hours: "06:00 - 18:00", entry_fee: 40, best_time_to_visit: "October to February", image: "https://images.unsplash.com/photo-1600100397608-f0107e2e5e9b?w=300" },
    { id: "jaipur", name: "Jaipur", city: "Jaipur", state: "Rajasthan", description: "Forts, craft and food meet royal history.", opening_hours: "08:00 - 18:00", entry_fee: 200, best_time_to_visit: "October to March", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300" },
    { id: "varanasi", name: "Varanasi", city: "Varanasi", state: "Uttar Pradesh", description: "A sacred riverside city shaped by living traditions.", opening_hours: "Open all day", entry_fee: 0, best_time_to_visit: "October to March", image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=300" },
    { id: "mysuru", name: "Mysuru", city: "Mysuru", state: "Karnataka", description: "Palaces, markets and a slower cultural rhythm.", opening_hours: "10:00 - 17:30", entry_fee: 100, best_time_to_visit: "October to February", image: "https://images.unsplash.com/photo-1600112356915-0897c6d8a1b6?w=300" },
  ],
  twin: [
    { destination_id: "hampi", destination: "Hampi", crowd_level: "medium", weather_status: "clear", safety_status: "safe", route_status: "open", estimated_visit_minutes: 150, best_suggestion: "Virupaksha Temple is crowded now. Visit Queen’s Bath first and return after 5 PM.", nearby_cultural_event: "Vijayanagara storytelling walk · 4:30 PM" },
    { destination_id: "jaipur", destination: "Jaipur", crowd_level: "high", weather_status: "hot", safety_status: "safe", route_status: "crowded", estimated_visit_minutes: 180, best_suggestion: "Start indoors at the City Palace museum before the fort crowds build.", nearby_cultural_event: "Block printing demonstration · 3:00 PM" },
    { destination_id: "varanasi", destination: "Varanasi", crowd_level: "low", weather_status: "clear", safety_status: "safe", route_status: "open", estimated_visit_minutes: 120, best_suggestion: "Take a quiet walk through the old silk-weaving lanes.", nearby_cultural_event: "Evening classical music recital · 6:00 PM" },
  ],
  stories: [
    { id: "story-1", destination: "Hampi", title: "The stone city that still speaks", historical_importance: "Hampi was the heart of the Vijayanagara Empire, where temples, markets and art flourished.", local_story: "Local storytellers connect the boulders and river to the legends of Kishkindha.", traditions: "Move slowly, observe respectfully and support local makers.", festival_connection: "Hampi Utsav brings music, dance and community stories to the heritage landscape.", food_and_craft_notes: "Try saaru, jolada rotti and banana-leaf meals. Look for local stone and Lambani embroidery.", dos: "Dress respectfully; ask before photographing people.", donts: "Do not touch monuments; do not block ceremonies.", explain_simply: "This is a living heritage place, not just a collection of ruins." },
  ],
  events: [{ id: "event-1", name: "Hampi Utsav", destination: "Hampi" }, { id: "event-2", name: "Ganga Mahotsav", destination: "Varanasi" }],
  alerts: [{ id: "alert-1", title: "High crowd at Amber Fort", destination: "Jaipur" }, { id: "alert-2", title: "Rain watch", destination: "Kochi" }],
  experiences: [{ id: "exp-1", name: "Lambani craft workshop", destination: "Hampi" }, { id: "exp-2", name: "Blue pottery studio visit", destination: "Jaipur" }],
  analytics: [],
};
