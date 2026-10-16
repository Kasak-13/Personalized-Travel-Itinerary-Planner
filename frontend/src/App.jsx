import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TripForm from './components/TripForm';
import ItineraryView from './components/ItineraryView';
import SavedTripsModal from './components/SavedTripsModal';
import Toast from './components/Toast';
import { 
  checkHealth, 
  generateItinerary, 
  regenerateDay, 
  saveTrip, 
  getTrips, 
  deleteTrip, 
  downloadPdf 
} from './services/api';

export default function App() {
  const [itinerary, setItinerary] = useState(null);
  const [currentPreferences, setCurrentPreferences] = useState(null);
  const [savedTrips, setSavedTrips] = useState([]);
  const [isSavedTripsModalOpen, setIsSavedTripsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedTripId, setSavedTripId] = useState(null);

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isLoadingSavedTrips, setIsLoadingSavedTrips] = useState(false);
  const [healthStatus, setHealthStatus] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Initial load: check backend health and fetch saved trips
  useEffect(() => {
    const init = async () => {
      const health = await checkHealth();
      setHealthStatus(health);
      loadSavedTrips();
    };
    init();
  }, []);

  const loadSavedTrips = async () => {
    try {
      setIsLoadingSavedTrips(true);
      const trips = await getTrips();
      setSavedTrips(trips || []);
    } catch (err) {
      console.warn('Could not load saved trips:', err);
    } finally {
      setIsLoadingSavedTrips(false);
    }
  };

  // Generate Itinerary
  const handleGenerate = async (preferences) => {
    setIsLoading(true);
    setCurrentPreferences(preferences);
    setIsSaved(false);
    setSavedTripId(null);
    try {
      const result = await generateItinerary(preferences);
      setItinerary(result);
      showToast(`Itinerary for ${preferences.destination} ready!`, 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      showToast(err.message || 'Failed to generate itinerary. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate Entire Itinerary
  const handleRegenerateAll = async () => {
    if (!currentPreferences) return;
    await handleGenerate(currentPreferences);
  };

  // Regenerate Single Day
  const handleRegenerateDay = async (day) => {
    if (!itinerary) return;
    try {
      const dailyBudget = itinerary.budget / (itinerary.total_days || 1);
      const req = {
        trip_id: savedTripId,
        day_number: day.day_number,
        date: day.date,
        destination: itinerary.destination,
        travel_interests: currentPreferences?.travel_interests || [],
        travel_pace: currentPreferences?.travel_pace || 'balanced',
        vibe: itinerary.vibe || 'balanced',
        budget_per_day: Math.round(dailyBudget),
        currency: itinerary.currency || 'USD',
        additional_instructions: currentPreferences?.additional_instructions
      };

      const newDay = await regenerateDay(req);

      // Update days list
      setItinerary(prev => {
        if (!prev) return prev;
        const updatedDays = prev.days.map(d => d.day_number === day.day_number ? newDay : d);
        const newEstimatedTotal = updatedDays.reduce((acc, d) => acc + (d.estimated_daily_cost || 0), 0);
        return {
          ...prev,
          days: updatedDays,
          estimated_total_cost: Math.round(newEstimatedTotal)
        };
      });

      showToast(`Day ${day.day_number} updated with fresh activities!`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to regenerate day', 'error');
    }
  };

  // Save Trip to Database
  const handleSaveTrip = async () => {
    if (!itinerary) return;
    setIsSaving(true);
    try {
      const tripData = {
        id: savedTripId || undefined,
        title: itinerary.title,
        destination: itinerary.destination,
        start_date: itinerary.start_date,
        end_date: itinerary.end_date,
        budget: itinerary.budget,
        currency: itinerary.currency,
        travelers_count: itinerary.travelers_count,
        traveler_type: itinerary.traveler_type,
        preferences: currentPreferences || {},
        vibe: itinerary.vibe,
        itinerary: itinerary
      };

      const saved = await saveTrip(tripData);
      setSavedTripId(saved.id);
      setIsSaved(true);
      showToast('Trip saved to database successfully!', 'success');
      loadSavedTrips();
    } catch (err) {
      showToast(err.message || 'Failed to save trip', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Trip
  const handleDeleteTrip = async (id) => {
    try {
      await deleteTrip(id);
      showToast('Trip deleted', 'info');
      if (savedTripId === id) {
        setIsSaved(false);
        setSavedTripId(null);
      }
      loadSavedTrips();
    } catch (err) {
      showToast(err.message || 'Failed to delete trip', 'error');
    }
  };

  // Select a Saved Trip to View
  const handleSelectSavedTrip = (trip) => {
    if (trip.itinerary) {
      setItinerary(trip.itinerary);
      setCurrentPreferences(trip.preferences || {
        destination: trip.destination,
        start_date: trip.start_date,
        end_date: trip.end_date,
        budget: trip.budget,
        currency: trip.currency,
        travelers_count: trip.travelers_count,
        traveler_type: trip.traveler_type,
        vibe: trip.vibe
      });
      setSavedTripId(trip.id);
      setIsSaved(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Download PDF
  const handleDownloadPdf = async () => {
    if (!itinerary) return;
    setIsDownloadingPdf(true);
    try {
      await downloadPdf(itinerary);
      showToast('Itinerary PDF downloaded!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to generate PDF', 'error');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Navigation */}
      <Navbar 
        onOpenSavedTrips={() => {
          loadSavedTrips();
          setIsSavedTripsModalOpen(true);
        }}
        onNewTrip={() => {
          setItinerary(null);
          setIsSaved(false);
          setSavedTripId(null);
        }}
        savedCount={savedTrips.length}
        healthStatus={healthStatus}
      />

      {/* Main Container */}
      <main className="flex-1">
        {itinerary ? (
          <ItineraryView
            itinerary={itinerary}
            onBack={() => setItinerary(null)}
            onSave={handleSaveTrip}
            onDownloadPdf={handleDownloadPdf}
            onRegenerateAll={handleRegenerateAll}
            onRegenerateDay={handleRegenerateDay}
            isSaving={isSaving}
            isDownloadingPdf={isDownloadingPdf}
            isSaved={isSaved}
          />
        ) : (
          <TripForm
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Saved Trips Modal */}
      <SavedTripsModal
        isOpen={isSavedTripsModalOpen}
        onClose={() => setIsSavedTripsModalOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={handleSelectSavedTrip}
        onDeleteTrip={handleDeleteTrip}
        isLoading={isLoadingSavedTrips}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>© 2026 WanderPlan AI • Personalized Travel Itinerary Planner • Built with React, Tailwind CSS, FastAPI, and Supabase</p>
      </footer>

    </div>
  );
}
