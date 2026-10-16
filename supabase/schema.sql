-- Supabase Schema for Personalized Travel Itinerary Planner

-- Enable uuid extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: trips
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget NUMERIC NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD',
    travelers_count INTEGER NOT NULL DEFAULT 1,
    traveler_type TEXT NOT NULL DEFAULT 'solo',
    preferences JSONB DEFAULT '{}'::jsonb,
    vibe TEXT DEFAULT 'balanced',
    itinerary JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: itinerary_days
CREATE TABLE IF NOT EXISTS itinerary_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    trip_date DATE NOT NULL,
    activities JSONB DEFAULT '[]'::jsonb,
    estimated_daily_cost NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_days ENABLE ROW LEVEL SECURITY;

-- Development policy: allow all operations
CREATE POLICY "Allow public all access on trips" ON trips FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all access on itinerary_days" ON itinerary_days FOR ALL USING (true) WITH CHECK (true);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_trips_created_at ON trips(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_itinerary_days_trip_id ON itinerary_days(trip_id);
