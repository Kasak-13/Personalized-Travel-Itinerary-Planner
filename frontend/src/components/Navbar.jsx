import React from 'react';
import { Compass, Bookmark, PlusCircle, Sparkles, Database } from 'lucide-react';

export default function Navbar({ onOpenSavedTrips, onNewTrip, savedCount, healthStatus }) {
  const isHealthy = healthStatus && healthStatus.status === 'healthy';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={onNewTrip} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">WanderPlan AI</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">MVP</span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Personalized AI Travel Itineraries</p>
          </div>
        </div>

        {/* System Status Indicators & Navigation */}
        <div className="flex items-center gap-3">
          {/* Status pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-600 border border-slate-200">
            <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{isHealthy ? (healthStatus?.ai_engine?.includes('Groq') ? 'Groq Active' : 'API Connected') : 'Connecting...'}</span>
            {healthStatus?.database && (
              <span className="text-slate-400 border-l border-slate-300 pl-2 flex items-center gap-1">
                <Database className="w-3 h-3 text-slate-500" />
                {healthStatus.database.includes('Supabase') ? 'Supabase' : 'Local Storage'}
              </span>
            )}
          </div>

          {/* Saved Trips Button */}
          <button
            id="nav-saved-trips-btn"
            onClick={onOpenSavedTrips}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
          >
            <Bookmark className="w-4 h-4 text-sky-600" />
            <span>Saved Trips</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-sky-600 text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* New Trip Button */}
          <button
            id="nav-new-trip-btn"
            onClick={onNewTrip}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-lg shadow-sm shadow-sky-600/30 transition-all hover:shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Plan Trip</span>
          </button>
        </div>

      </div>
    </header>
  );
}
