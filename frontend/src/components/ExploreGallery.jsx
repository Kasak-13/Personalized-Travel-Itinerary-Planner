import React, { useState } from 'react';
import { 
  Sparkles, Star, MapPin, Clock, ArrowRight, Eye, IndianRupee 
} from 'lucide-react';
import { TRENDING_DESTINATIONS } from '../data/destinations';

const VIBE_FILTERS = [
  { id: 'All', label: 'All Destinations' },
  { id: 'Heritage & Palaces', label: 'Heritage & Palaces' },
  { id: 'Romantic Escapes', label: 'Romantic Escapes' },
  { id: 'Mountain Adventure', label: 'Mountain Adventure' },
  { id: 'Food & Culinary Trails', label: 'Food & Culinary Trails' },
  { id: 'Coastal & Nature', label: 'Coastal & Nature' },
  { id: 'Spiritual & Sacred', label: 'Spiritual & Sacred' },
];

export default function ExploreGallery({ onSelectDestination, onStartPlanning }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filtered = selectedFilter === 'All'
    ? TRENDING_DESTINATIONS
    : TRENDING_DESTINATIONS.filter(d => d.vibeCategory === selectedFilter);

  return (
    <section id="explore-gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold tracking-wider uppercase border border-emerald-200/60">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Handcrafted India & Global Editions</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight">
          Explore Curated Itineraries by Vibe
        </h2>

        <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
          From the royal palaces of Rajasthan to misty Himalayan ridges and coastal backwaters. 
          Pick a journey or preview its daily navigation plan.
        </p>
      </div>

      {/* Vibe Filter Pills Row (matching screenshot!) */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
        {VIBE_FILTERS.map(filter => {
          const isSelected = selectedFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/80 shadow-xs'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Destination Grid (matching the 3-column editorial cards!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(dest => (
          <div
            key={dest.id}
            className="group bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Top Visual Image with Overlays */}
            <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

              {/* Vibe Pill Tag on Top-Left */}
              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 text-amber-100 backdrop-blur-md border border-white/10 shadow-sm">
                  {dest.vibeTag || dest.vibeCategory}
                </span>
              </div>

              {/* Star Rating on Top-Right */}
              <div className="absolute top-3.5 right-3.5">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-stone-900 shadow-sm">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{dest.rating}</span>
                  <span className="text-stone-400 font-normal">({dest.reviewCount || 1000})</span>
                </span>
              </div>

              {/* Title & Region Overlay on Bottom of Image */}
              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                  {dest.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-stone-300 font-medium mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-300" />
                  <span>{dest.locationRegion || 'India'}</span>
                </div>
              </div>
            </div>

            {/* Card Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              
              <div className="space-y-3.5">
                {/* Poetic Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                  {dest.poeticDescription || dest.overview}
                </p>

                {/* Duration & Budget Badges */}
                <div className="flex items-center justify-between text-xs py-1 border-y border-stone-100">
                  <span className="flex items-center gap-1.5 font-semibold text-stone-700">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{dest.durationBadge || '4 Days / 3 Nights'}</span>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-amber-800 bg-amber-50/80 px-2.5 py-0.5 rounded-full border border-amber-200/50">
                    <span>{dest.totalBudgetRange || dest.avgBudget}</span>
                  </span>
                </div>

                {/* Green Highlight Bullets (exact match to screenshot!) */}
                {dest.featureBullets && (
                  <div className="space-y-1.5 pt-1">
                    {dest.featureBullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50/60 px-2.5 py-1 rounded-lg border border-emerald-100/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span className="truncate font-medium">{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons: Quick View Plan + Plan This Trip */}
              <div className="pt-3 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDestination(dest);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5 text-stone-500" />
                  <span>Quick View Plan</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onStartPlanning) {
                      onStartPlanning(dest);
                    } else {
                      onSelectDestination(dest);
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#1C4E40] hover:bg-[#153D32] active:bg-[#0E2E25] transition-all flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  <span>Plan This Trip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
