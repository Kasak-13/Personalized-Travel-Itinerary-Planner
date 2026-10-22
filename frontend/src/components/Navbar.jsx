import React from 'react';
import { Compass, Bookmark, PlusCircle, Sparkles, BookOpen } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  onTabChange, 
  onOpenSavedTrips, 
  onNewTrip, 
  savedCount, 
  healthStatus 
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand: WanderPlan Editorial Travel Journal */}
        <div 
          onClick={() => onTabChange('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Circular Compass Monogram */}
          <div className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center text-[#C85A32] shadow-xs group-hover:scale-105 group-hover:border-[#C85A32] transition-all">
            <Compass className="w-5 h-5 transition-transform group-hover:rotate-45" />
          </div>

          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-stone-900 leading-tight">
              WANDERPLAN
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-stone-500 tracking-[0.2em] uppercase">
              EDITORIAL TRAVEL JOURNAL • AI EDITION
            </span>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => onTabChange('home')}
            className="px-4 py-2 rounded-full text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
          >
            Curate Journey
          </button>

          <button 
            onClick={onOpenSavedTrips}
            className="px-4 py-2 rounded-full text-xs font-semibold text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-500" />
            <span>My Journeys</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-[#C85A32] text-white font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right CTA Button: Plan New Journey in Warm Terracotta */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewTrip}
            className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#C85A32] hover:bg-[#B54924] active:bg-[#963919] rounded-full shadow-md shadow-[#C85A32]/25 transition-all hover:scale-105 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-amber-200" />
            <span>Plan New Journey</span>
          </button>
        </div>

      </div>
    </header>
  );
}
