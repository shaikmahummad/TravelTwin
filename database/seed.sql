insert into destinations (name, city, state, description, latitude, longitude, opening_hours, entry_fee, best_time_to_visit, safety_notes)
values
('Hampi', 'Hosapete', 'Karnataka', 'A living landscape of Vijayanagara ruins, boulders and river stories.', 15.3350, 76.4600, '06:00 - 18:00', 40, 'October to February', 'Carry water and use marked paths after sunset.'),
('Jaipur', 'Jaipur', 'Rajasthan', 'The Pink City, where forts, craft and food meet royal history.', 26.9124, 75.7873, '08:00 - 18:00', 200, 'October to March', 'Use verified guides around busy fort entrances.'),
('Varanasi', 'Varanasi', 'Uttar Pradesh', 'A sacred riverside city shaped by ritual, music and living traditions.', 25.3176, 82.9739, 'Open all day', 0, 'October to March', 'Respect ceremony zones and keep valuables secure.'),
('Mysuru', 'Mysuru', 'Karnataka', 'Palaces, markets and a slower cultural rhythm in the garden city.', 12.2958, 76.6394, '10:00 - 17:30', 100, 'October to February', 'Follow palace photography rules.'),
('Kochi', 'Kochi', 'Kerala', 'A coastal archive of spice routes, art and layered communities.', 9.9312, 76.2673, '09:00 - 18:00', 50, 'October to March', 'Allow extra travel time during monsoon showers.'),
('Kaziranga', 'Golaghat', 'Assam', 'A wild landscape known for grasslands, wetlands and one-horned rhinos.', 26.5775, 93.1711, '06:00 - 16:00', 200, 'November to April', 'Stay with your safari group and follow forest instructions.')
on conflict (name) do nothing;

insert into destination_twin_status (destination_id, crowd_level, weather_status, safety_status, route_status, estimated_visit_minutes, best_suggestion)
select id,
  case name when 'Jaipur' then 'busy' when 'Varanasi' then 'calm' else 'moderate' end,
  case name when 'Kochi' then 'rain_watch' else 'clear' end,
  'all_clear', 'open',
  case name when 'Kaziranga' then 300 when 'Kochi' then 180 else 150 end,
  case name when 'Hampi' then 'Visit Virupaksha Temple before 11 AM for softer light.' else 'Start with the signature heritage experience before peak hours.' end
from destinations
on conflict (destination_id) do nothing;

insert into cultural_stories (destination_id, title, historical_importance, local_story, traditions, festival_connection, food_and_craft_notes, dos, donts)
select id, name || ' in context',
  'A place where Indian history remains part of everyday life.',
  'Ask a local storyteller for the details that guidebooks usually miss.',
  'Move slowly, observe respectfully and support local makers.',
  'Seasonal festivals and community rituals bring the destination to life.',
  'Look for regional food, textiles and craft workshops near the heritage core.',
  array['Dress respectfully at sacred sites', 'Ask before photographing people'],
  array['Do not touch monuments', 'Do not block ceremonies or local work']
from destinations
where not exists (select 1 from cultural_stories where cultural_stories.destination_id = destinations.id);
