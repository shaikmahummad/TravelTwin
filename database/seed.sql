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

-- SIH showcase signals and local context for the six demo destinations.
update destination_twin_status set
  crowd_level = case (select name from destinations d where d.id = destination_twin_status.destination_id)
    when 'Hampi' then 'high' when 'Jaipur' then 'busy' when 'Varanasi' then 'calm'
    when 'Mysuru' then 'low' when 'Kochi' then 'moderate' else 'low' end,
  weather_status = case (select name from destinations d where d.id = destination_twin_status.destination_id)
    when 'Kochi' then 'rain_watch' when 'Jaipur' then 'hot' else 'clear' end,
  best_suggestion = case (select name from destinations d where d.id = destination_twin_status.destination_id)
    when 'Hampi' then 'Virupaksha Temple is crowded now. Visit Queen''s Bath first and return after 5 PM.'
    when 'Jaipur' then 'Start indoors at the City Palace museum before the fort crowds build.'
    when 'Varanasi' then 'Take a quiet walk through the old silk-weaving lanes before the evening ghats.'
    when 'Mysuru' then 'Begin with the palace galleries while the morning light is soft.'
    when 'Kochi' then 'Start indoors at Mattancherry Palace before the afternoon rain.'
    else 'Stay with your safari group and take the early grassland route.' end;

insert into cultural_stories (destination_id, title, historical_importance, local_story, traditions, festival_connection, food_and_craft_notes, dos, donts)
select id, name || ' for a first-time visitor',
  case name when 'Hampi' then 'The Vijayanagara capital made temples, markets and art part of a dramatic boulder landscape.'
    when 'Jaipur' then 'Rajput courts, astronomy, architecture and living craft traditions shape the Pink City.'
    when 'Varanasi' then 'A sacred riverside city where ritual, music, weaving and daily life meet.'
    when 'Mysuru' then 'A palace city known for Dasara, classical arts, sandalwood and royal design.'
    when 'Kochi' then 'A coastal meeting point shaped by spice routes, port communities and contemporary art.'
    else 'A living wetland landscape where conservation and Mishing community life share space.' end,
  'Ask a local storyteller what visitors usually miss, then slow down enough to notice it.',
  'Observe quietly, ask before photographing people and support community-run makers.',
  'Seasonal festivals bring music, food and local memory into the destination.',
  case name when 'Hampi' then 'Try saaru and jolada rotti; look for Lambani embroidery and stone craft.'
    when 'Jaipur' then 'Try dal baati churma; look for blue pottery and block printing.'
    when 'Varanasi' then 'Try kachori sabzi; look for Banarasi silk weaving.'
    when 'Mysuru' then 'Try Mysuru pak; look for sandalwood carving and silk.'
    when 'Kochi' then 'Try appam and stew; look for coir and handloom craft.'
    else 'Try Assamese thali; look for Mishing handloom and bamboo craft.' end,
  array['Dress respectfully at sacred sites', 'Ask before photographing people'],
  array['Do not touch monuments', 'Do not block ceremonies or local work']
from destinations
where not exists (select 1 from cultural_stories s where s.destination_id = destinations.id and s.title like '%first-time%');

insert into events (destination_id, name, description, event_type, starts_at, venue, location, price, contact_information)
select d.id, e.name, e.description, e.event_type, e.starts_at::timestamptz, e.venue, e.venue, e.price, e.contact
from (values
  ('Hampi', 'Hampi Utsav', 'Music, dance and local stories across the heritage core.', 'festival', '2026-10-18 18:00:00+05:30', 'Hampi Bazaar', 0, 'Karnataka Tourism'),
  ('Jaipur', 'Blue Pottery Studio Visit', 'Meet makers and see the traditional glazing process.', 'craft workshop', '2026-10-04 15:00:00+05:30', 'Sanganer Craft Quarter', 250, 'Jaipur Craft Trail'),
  ('Varanasi', 'Ganga Mahotsav', 'Classical music, lamps and river traditions.', 'festival', '2026-11-04 18:30:00+05:30', 'Rajendra Prasad Ghat', 0, 'UP Tourism'),
  ('Mysuru', 'Dasara Heritage Walk', 'A guided walk through palace history and procession routes.', 'heritage walk', '2026-10-12 07:30:00+05:30', 'Mysuru Palace', 150, 'Mysuru Heritage Collective'),
  ('Kochi', 'Mattancherry Food Walk', 'A small-group walk through spice, seafood and Jewish-Keralite food stories.', 'food walk', '2026-10-09 17:00:00+05:30', 'Mattancherry', 900, 'Kochi Local Table'),
  ('Kaziranga', 'Mishing Craft Showcase', 'Community weaving, bamboo work and seasonal food.', 'exhibition', '2026-12-02 16:00:00+05:30', 'Kohora Village Centre', 100, 'Assam Craft Council')
) as e(destination, name, description, event_type, starts_at, venue, price, contact)
join destinations d on d.name = e.destination
where not exists (select 1 from events x where x.destination_id = d.id and x.name = e.name);
