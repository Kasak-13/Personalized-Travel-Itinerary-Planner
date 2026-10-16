import React from 'react';
import { X, Calendar, MapPin, Trash2, ArrowRight, Bookmark, Compass } from 'lucide-react';

export default function SavedTripsModal({ 
  isOpen, 
  onClose, 
  savedTrips, 
  onSelectTrip, 
  onDeleteTrip, 
  isLoading 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] z-10">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Saved Travel Itineraries</h2>
              <p className="text-xs text-slate-500">Stored in database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3">
          {isLoading ? (
            <div className="py-12 text-center text-slate-500">
              <div className="w-6 h-6 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm">Loading trips...</p>
            </div>
          ) : savedTrips.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <Compass className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-base font-semibold text-slate-700">No saved trips yet</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Generate an itinerary using the trip planner and click "Save Trip" to keep it here.
              </p>
            </div>
          ) : (
            savedTrips.map(trip => {
              const itin = trip.itinerary || {};
              return (
                <div 
                  key={trip.id}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-xs transition-all bg-white flex items-center justify-between gap-4 group"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">
                        {trip.vibe || 'balanced'}
                      </span>
                      <span className="text-xs text-slate-400">
                        {trip.travelers_count} {trip.traveler_type || 'travelers'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {trip.title || `Trip to ${trip.destination}`}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {trip.destination}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {trip.start_date} → {trip.end_date}
                      </span>
                      <span className="font-semibold text-slate-700">
                        {trip.budget} {trip.currency}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTrip(trip);
                        onClose();
                      }}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteTrip(trip.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Delete trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
