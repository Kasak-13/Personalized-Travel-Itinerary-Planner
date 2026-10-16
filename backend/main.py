import os
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from schemas import (
    TripPreferences,
    ItineraryResponse,
    ItineraryDay,
    TripRecord,
    RegenerateDayRequest
)
from services.ai_service import generate_itinerary, regenerate_single_day, GEMINI_API_KEY, OPENAI_API_KEY
from services.pdf_service import generate_itinerary_pdf
import database

load_dotenv()

app = FastAPI(
    title="Personalized Travel Itinerary Planner API",
    description="Backend API powering AI-driven customized travel itineraries, Supabase persistence, and PDF export.",
    version="1.0.0"
)

# CORS setup
cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")
allowed_origins = [o.strip() for o in cors_origins_env.split(",") if o.strip()]
# Include wildcard for local preview flexibility
if "*" not in allowed_origins:
    allowed_origins.append("*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    """Health check endpoint displaying system and service connectivity"""
    ai_status = "Gemini configured" if GEMINI_API_KEY else ("OpenAI configured" if OPENAI_API_KEY else "Programmatic generator active")
    db_status = "Supabase PostgreSQL connected" if database.is_supabase_enabled() else "Resilient local storage active"
    return {
        "status": "healthy",
        "service": "Personalized Travel Itinerary Planner API",
        "version": "1.0.0",
        "ai_engine": ai_status,
        "database": db_status
    }

@app.post("/api/itinerary/generate", response_model=ItineraryResponse)
def create_itinerary(prefs: TripPreferences):
    """Generates an AI personalized day-by-day travel itinerary"""
    try:
        itinerary = generate_itinerary(prefs)
        return itinerary
    except Exception as e:
        print(f"[API] Error generating itinerary: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate itinerary: {str(e)}")

@app.post("/api/itinerary/regenerate-day", response_model=ItineraryDay)
def regenerate_day(req: RegenerateDayRequest):
    """Regenerates activities for an individual day of the trip"""
    try:
        new_day = regenerate_single_day(req)
        return new_day
    except Exception as e:
        print(f"[API] Error regenerating day: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to regenerate day: {str(e)}")

@app.get("/api/trips", response_model=List[Dict[str, Any]])
def list_trips():
    """Retrieve all saved trips"""
    try:
        return database.get_all_trips()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/trips/{trip_id}", response_model=Dict[str, Any])
def get_trip(trip_id: str):
    """Retrieve a single saved trip by ID"""
    trip = database.get_trip_by_id(trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip

@app.post("/api/trips", response_model=Dict[str, Any])
def save_trip(trip: Dict[str, Any]):
    """Save or update a trip"""
    try:
        saved = database.save_trip(trip)
        return saved
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save trip: {str(e)}")

@app.delete("/api/trips/{trip_id}")
def delete_trip(trip_id: str):
    """Delete a saved trip"""
    deleted = database.delete_trip_by_id(trip_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Trip not found or already deleted")
    return {"success": True, "message": f"Trip {trip_id} deleted successfully"}

@app.post("/api/export/pdf")
def export_pdf(itinerary: ItineraryResponse):
    """Export the structured travel itinerary into a downloadable PDF document"""
    try:
        pdf_buffer = generate_itinerary_pdf(itinerary)
        filename = f"Itinerary_{itinerary.destination.replace(' ', '_')}_{itinerary.start_date}.pdf"
        return Response(
            content=pdf_buffer.getvalue(),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f'attachment; filename="{filename}"'
            }
        )
    except Exception as e:
        print(f"[API] PDF Generation Error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate PDF: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
