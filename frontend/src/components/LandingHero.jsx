import React from 'react';
import { 
  Sparkles, ArrowRight, Compass, Star, MapPin, 
  FileText, CheckCircle2, ShieldCheck 
} from 'lucide-react';

export default function LandingHero({ onStartPlanning, onExploreClick }) {
  return (
    <div className="pt-8 sm:pt-14 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Hero Container */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        
        {/* Subtle Tech / AI Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 text-amber-100 text-xs font-semibold tracking-wide shadow-sm hover:scale-105 transition-transform cursor-default">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Next-Gen Travel Planner • Powered Exclusively by Groq AI</span>
        </div>

        {/* Grand Serif Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-stone-900 tracking-tight leading-[1.12]">
          Bespoke Journeys Crafted in Seconds,{' '}
          <span className="italic font-serif text-[#1C4E40]">Not</span>{' '}
          <span className="font-serif text-[#C85A32]">Weeks.</span>
        </h1>

        {/* Poetic Subtitle */}
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
          From the regal palaces of Rajasthan to misty Himalayan passes and palm-fringed backwaters. 
          Experience intelligent day-by-day itineraries, morning-to-night quadrants, authentic culinary trails, and editorial PDF guides.
        </p>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartPlanning}
            className="px-8 py-3.5 rounded-full font-bold text-white bg-stone-950 hover:bg-stone-800 active:bg-black shadow-lg shadow-stone-950/15 flex items-center gap-2.5 transition-all hover:scale-105 group text-sm sm:text-base cursor-pointer"
          >
            <span>Start Planning Free</span>
            <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreClick || (() => {
              const el = document.getElementById('explore-gallery');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="px-7 py-3.5 rounded-full font-bold text-stone-800 bg-white hover:bg-stone-50 border border-stone-200/90 shadow-sm flex items-center gap-2 transition-all hover:scale-105 text-sm sm:text-base cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#1C4E40]" />
            <span>Explore Curated Vibes</span>
          </button>
        </div>

        {/* Elegant Thin Divider */}
        <div className="pt-8">
          <div className="h-px w-full max-w-3xl mx-auto bg-stone-200/70" />
        </div>

        {/* Refined Stats Row (matching the screenshot!) */}
        <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-3xl mx-auto">
          
          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              10,000+
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1C4E40]" />
              <span>Itineraries Curated</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              140+
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>India & Global Havens</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              4.9 <span className="text-stone-400 font-sans text-base">/ 5.0</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Explorer Rating</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Instant PDF
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500 font-medium">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span>Publication-Grade Guides</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
