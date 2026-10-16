import os
import json
import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "").strip()

supabase_client = None
if SUPABASE_URL and SUPABASE_KEY and "your-project" not in SUPABASE_URL:
    try:
        from supabase import create_client, Client
        supabase_client: Optional[Client] = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("[Database] Connected to remote Supabase database successfully.")
    except Exception as e:
        print(f"[Database] Warning: Could not connect to Supabase: {e}. Falling back to local storage.")
        supabase_client = None
else:
    print("[Database] Supabase credentials not set or placeholder detected. Operating in local fallback storage mode.")

# Local file-based fallback storage so trips persist across server restarts even without Supabase
LOCAL_STORAGE_FILE = os.path.join(os.path.dirname(__file__), "local_trips.json")

def _read_local_trips() -> List[Dict[str, Any]]:
    if not os.path.exists(LOCAL_STORAGE_FILE):
        return []
    try:
        with open(LOCAL_STORAGE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def _write_local_trips(trips: List[Dict[str, Any]]):
    with open(LOCAL_STORAGE_FILE, "w", encoding="utf-8") as f:
        json.dump(trips, f, indent=2, ensure_ascii=False)

def is_supabase_enabled() -> bool:
    return supabase_client is not None

def save_trip(trip_data: Dict[str, Any]) -> Dict[str, Any]:
    """Save a new trip or update an existing trip in Supabase or fallback storage"""
    trip_id = trip_data.get("id") or str(uuid.uuid4())
    now_iso = datetime.utcnow().isoformat()
    trip_data["id"] = trip_id
    trip_data["updated_at"] = now_iso
    if "created_at" not in trip_data or not trip_data["created_at"]:
        trip_data["created_at"] = now_iso

    if is_supabase_enabled():
        try:
            # Upsert into trips table
            row = {
                "id": trip_id,
                "title": trip_data.get("title", f"Trip to {trip_data.get('destination')}"),
                "destination": trip_data.get("destination", ""),
                "start_date": trip_data.get("start_date"),
                "end_date": trip_data.get("end_date"),
                "budget": trip_data.get("budget", 0),
                "currency": trip_data.get("currency", "USD"),
                "travelers_count": trip_data.get("travelers_count", 1),
                "traveler_type": trip_data.get("traveler_type", "solo"),
                "preferences": trip_data.get("preferences", {}),
                "vibe": trip_data.get("vibe", "balanced"),
                "itinerary": trip_data.get("itinerary", {}),
                "updated_at": now_iso
            }
            res = supabase_client.table("trips").upsert(row).execute()
            if res.data:
                return res.data[0]
            return trip_data
        except Exception as e:
            print(f"[Database] Supabase save error: {e}. Writing to fallback storage.")

    # Fallback to local storage
    trips = _read_local_trips()
    updated = False
    for i, t in enumerate(trips):
        if t.get("id") == trip_id:
            trips[i] = trip_data
            updated = True
            break
    if not updated:
        trips.insert(0, trip_data)
    _write_local_trips(trips)
    return trip_data

def get_all_trips() -> List[Dict[str, Any]]:
    """Retrieve all trips"""
    if is_supabase_enabled():
        try:
            res = supabase_client.table("trips").select("*").order("created_at", desc=True).execute()
            if res.data is not None:
                return res.data
        except Exception as e:
            print(f"[Database] Supabase fetch error: {e}. Reading fallback storage.")

    return _read_local_trips()

def get_trip_by_id(trip_id: str) -> Optional[Dict[str, Any]]:
    """Retrieve a single trip by ID"""
    if is_supabase_enabled():
        try:
            res = supabase_client.table("trips").select("*").eq("id", trip_id).execute()
            if res.data and len(res.data) > 0:
                return res.data[0]
        except Exception as e:
            print(f"[Database] Supabase fetch single error: {e}")

    trips = _read_local_trips()
    for t in trips:
        if t.get("id") == trip_id:
            return t
    return None

def delete_trip_by_id(trip_id: str) -> bool:
    """Delete a trip by ID"""
    if is_supabase_enabled():
        try:
            supabase_client.table("trips").delete().eq("id", trip_id).execute()
        except Exception as e:
            print(f"[Database] Supabase delete error: {e}")

    trips = _read_local_trips()
    new_trips = [t for t in trips if t.get("id") != trip_id]
    if len(new_trips) != len(trips):
        _write_local_trips(new_trips)
        return True
    return False
