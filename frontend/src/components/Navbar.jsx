import React from 'react';
import { Compass, Bookmark, PlusCircle, Sparkles, Database, MapPin } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  onTabChange, 
  onOpenSavedTrips, 
  onNewTrip, 
  savedCount, 
  healthStatus 
}) {
  const isHealthy = healthStatus && healthStatus.status === 'healthy';

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-purple-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand: TravelPlanner */}
        <div 
          onClick={() => onTabChange('home')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-pink-200" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-black text-lg text-slate-900 tracking-tight">Travel<span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Planner</span></span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase tracking-wider">India</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          <button 
            onClick={() => onTabChange('home')}
            className={`transition-colors hover:text-purple-600 ${activeTab === 'home' ? 'text-purple-600 font-extrabold' : ''}`}
          >
            Explore
          </button>
          <button 
            onClick={() => onTabChange('how-it-works')}
            className="transition-colors hover:text-purple-600"
          >
            Features
          </button>
          <button 
            onClick={() => onTabChange('testimonials')}
            className="transition-colors hover:text-purple-600"
          >
            Testimonials
          </button>
          <button 
            onClick={onOpenSavedTrips}
            className="transition-colors hover:text-purple-600 flex items-center gap-1"
          >
            <Bookmark className="w-3.5 h-3.5 text-pink-500" />
            <span>My Itineraries</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-pink-500 text-white font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* System Status Indicators & Plan CTA */}
        <div className="flex items-center gap-3">
          
          {/* Status badge pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[11px] text-purple-800 border border-purple-200">
            <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span>{isHealthy ? (healthStatus?.ai_engine?.includes('Groq') ? 'Groq Active' : 'API Connected') : 'Connecting...'}</span>
            {healthStatus?.database && (
              <span className="text-purple-400 border-l border-purple-200 pl-2 flex items-center gap-1">
                <Database className="w-3 h-3 text-purple-600" />
                {healthStatus.database.includes('Supabase') ? 'Supabase' : 'Local Storage'}
              </span>
            )}
          </div>

          {/* Plan Trip CTA */}
          <button
            onClick={onNewTrip}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 active:from-purple-700 rounded-2xl shadow-md shadow-purple-500/25 transition-all hover:scale-105"
          >
            <PlusCircle className="w-4 h-4 text-pink-200" />
            <span>Plan Trip</span>
          </button>

        </div>

      </div>
    </header>
  );
}
