-- TravelTwin MVP schema for Supabase PostgreSQL.
create extension if not exists "pgcrypto";

create table if not exists traveller_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  display_name text,
  travel_style text not null default 'cultural',
  interests text[] not null default '{}',
  walking_comfort text not null default 'comfortable',
  language_preference text not null default 'English',
  budget_range text not null default 'medium',
  time_available text not null default 'half_day',
  safety_preference text not null default 'balanced',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  state text,
  country text not null default 'India',
  description text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  opening_hours text,
  entry_fee numeric(10,2) default 0,
  best_time_to_visit text,
  safety_notes text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists destination_twin_status (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null unique references destinations(id) on delete cascade,
  crowd_level text not null default 'moderate',
  weather_status text not null default 'clear',
  safety_status text not null default 'all_clear',
  route_status text not null default 'open',
  estimated_visit_minutes integer not null default 90,
  best_suggestion text,
  last_updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists cultural_stories (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references destinations(id) on delete cascade,
  title text not null,
  historical_importance text,
  local_story text,
  traditions text,
  festival_connection text,
  food_and_craft_notes text,
  local_food_note text,
  local_craft_note text,
  explain_simply text,
  dos text[] not null default '{}',
  donts text[] not null default '{}',
  audio_url text,
  created_at timestamptz not null default now()
);

create table if not exists itineraries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  destination_id uuid not null references destinations(id),
  title text not null,
  days integer not null check (days > 0),
  budget text,
  interests text[] not null default '{}',
  travel_pace text,
  walking_comfort text,
  created_at timestamptz not null default now()
);

create table if not exists itinerary_items (
  id uuid primary key default gen_random_uuid(),
  itinerary_id uuid not null references itineraries(id) on delete cascade,
  day_number integer not null check (day_number > 0),
  time_slot text not null,
  title text not null,
  description text,
  estimated_minutes integer,
  created_at timestamptz not null default now()
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references destinations(id) on delete cascade,
  alert_type text not null,
  severity text not null default 'info',
  title text not null,
  message text not null,
  is_active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists local_experiences (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references destinations(id) on delete cascade,
  name text not null,
  category text not null,
  description text,
  provider_name text,
  price numeric(10,2),
  duration_minutes integer,
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  destination_id uuid not null references destinations(id) on delete cascade,
  name text not null,
  description text,
  event_type text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  venue text,
  location text,
  price numeric(10,2) default 0,
  contact_information text,
  created_at timestamptz not null default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  destination_id uuid references destinations(id) on delete set null,
  role text not null check (role in ('user', 'assistant')),
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists alerts_destination_active_idx on alerts(destination_id, is_active);
create index if not exists events_destination_dates_idx on events(destination_id, starts_at);
create index if not exists chat_messages_user_created_idx on chat_messages(user_id, created_at);
