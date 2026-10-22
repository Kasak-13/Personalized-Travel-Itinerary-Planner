import React from 'react';
import { X, Star, Calendar, IndianRupee, Sparkles, MapPin, ArrowRight, Tag } from 'lucide-react';

export default function DestinationModal({ destination, isOpen, onClose, onStartPlanning }) {
  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
        
        {/* Left Side: Destination Visual Banner */}
        <div className="relative min-h-[260px] md:min-h-full overflow-hidden bg-slate-900">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Details */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-600/80 text-purple-100 backdrop-blur-md border border-purple-400/40">
              <Sparkles className="w-3 h-3 text-pink-300" />
              Popular Right Now
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              {destination.name}
            </h2>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-200">
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {destination.rating}
              </span>
              <span>•</span>
              <span>{destination.reviews}</span>
              <span>•</span>
              <span className="text-pink-300 font-bold">{destination.priceLevel}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Desktop Close */}
            <div className="hidden md:flex justify-end -mt-2 -mr-2">
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-purple-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
                Overview
              </span>
              <p className="text-sm text-slate-600 leading-relaxed">
                {destination.overview}
              </p>
            </div>

            {/* Key Stats: Best Time & Avg Budget */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-purple-100">
              <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3 text-purple-600" /> Best Time
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900">{destination.bestTime}</p>
              </div>

              <div className="p-3 rounded-2xl bg-pink-50/60 border border-pink-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1 mb-1">
                  <IndianRupee className="w-3 h-3 text-pink-600" /> Avg Budget
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900">{destination.avgBudget}</p>
              </div>
            </div>

            {/* Highlights Chips */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Destinations Highlights
              </span>
              <div className="flex flex-wrap gap-1.5">
                {destination.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* CTA Button */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                onStartPlanning(destination);
                onClose();
              }}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 active:from-purple-700 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-pink-200" />
              <span>Start Planning This Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-400 font-semibold tracking-wide uppercase">
              Customize Dates, Budget, and Travel Style
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
