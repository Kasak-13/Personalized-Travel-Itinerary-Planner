import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import ExploreGallery from './components/ExploreGallery';
import DestinationModal from './components/DestinationModal';
import TripWizard from './components/TripWizard';
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
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'wizard' | 'itinerary'
  const [itinerary, setItinerary] = useState(null);
  const [currentPreferences, setCurrentPreferences] = useState(null);
  const [selectedDestinationForModal, setSelectedDestinationForModal] = useState(null);
  const [destinationForWizard, setDestinationForWizard] = useState(null);

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

  // Start planning from landing or modal
  const handleStartPlanning = (prefillDest = null) => {
    setDestinationForWizard(prefillDest);
    setCurrentView('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate Itinerary from Wizard
  const handleGenerate = async (preferences) => {
    setIsLoading(true);
    setCurrentPreferences(preferences);
    setIsSaved(false);
    setSavedTripId(null);
    try {
      const result = await generateItinerary(preferences);
      setItinerary(result);
      setCurrentView('itinerary');
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
        currency: itinerary.currency || 'INR',
        additional_instructions: currentPreferences?.additional_instructions
      };

      const newDay = await regenerateDay(req);

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
      showToast('Trip saved to Supabase successfully!', 'success');
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
      showToast('Trip deleted from database', 'info');
      if (savedTripId === id) {
        setIsSaved(false);
        setSavedTripId(null);
      }
      loadSavedTrips();
    } catch (err) {
      showToast(err.message || 'Failed to delete trip', 'error');
    }
  };

  // Open a saved trip
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
      setCurrentView('itinerary');
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
    <div className="min-h-screen flex flex-col bg-slate-50/70 text-slate-900 font-sans selection:bg-purple-600 selection:text-white">
      
      {/* Top Navbar matching TravelPlanner */}
      <Navbar 
        activeTab={currentView}
        onTabChange={(tab) => {
          if (tab === 'home') {
            setCurrentView('home');
          } else if (tab === 'how-it-works' || tab === 'testimonials') {
            setCurrentView('home');
            window.scrollTo({ top: 600, behavior: 'smooth' });
          }
        }}
        onOpenSavedTrips={() => {
          loadSavedTrips();
          setIsSavedTripsModalOpen(true);
        }}
        onNewTrip={() => handleStartPlanning(null)}
        savedCount={savedTrips.length}
        healthStatus={healthStatus}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        
        {/* VIEW 1: Interactive Itinerary Dashboard (matching Pages 8 & 9) */}
        {currentView === 'itinerary' && itinerary && (
          <ItineraryView
            itinerary={itinerary}
            currentPreferences={currentPreferences}
            onBack={() => setCurrentView('wizard')}
            onSave={handleSaveTrip}
            onDownloadPdf={handleDownloadPdf}
            onRegenerateAll={handleRegenerateAll}
            onRegenerateDay={handleRegenerateDay}
            isSaving={isSaving}
            isDownloadingPdf={isDownloadingPdf}
            isSaved={isSaved}
          />
        )}

        {/* VIEW 2: 3-Step Wizard Form (matching Pages 10 & 11) */}
        {currentView === 'wizard' && (
          <TripWizard
            initialDestination={destinationForWizard}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            onCancel={() => setCurrentView('home')}
          />
        )}

        {/* VIEW 3: Landing Page & Explore Gallery (matching Pages 5, 6, 7, 13, 14, 15) */}
        {currentView === 'home' && (
          <div className="space-y-12">
            <LandingHero onStartPlanning={() => handleStartPlanning(null)} />
            
            <ExploreGallery 
              onSelectDestination={(dest) => setSelectedDestinationForModal(dest)} 
            />
          </div>
        )}

      </main>

      {/* Destination Preview Modal (matching Page 4) */}
      <DestinationModal
        destination={selectedDestinationForModal}
        isOpen={Boolean(selectedDestinationForModal)}
        onClose={() => setSelectedDestinationForModal(null)}
        onStartPlanning={(dest) => handleStartPlanning(dest)}
      />

      {/* Saved Trips / Dashboard Modal (matching Pages 1 & 12) */}
      <SavedTripsModal
        isOpen={isSavedTripsModalOpen}
        onClose={() => setIsSavedTripsModalOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={handleSelectSavedTrip}
        onDeleteTrip={handleDeleteTrip}
        isLoading={isLoadingSavedTrips}
      />

      {/* Toast Feedback Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />

      {/* Footer */}
      <footer className="border-t border-purple-100 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-slate-700">
            © 2026 TravelPlanner • India AI Travel Companion
          </p>
          <p className="text-purple-600 font-medium">
            Powered by Groq AI (Llama 3.3) & Supabase PostgreSQL
          </p>
        </div>
      </footer>

    </div>
  );
}
