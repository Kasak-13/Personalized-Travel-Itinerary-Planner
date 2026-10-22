import React, { useState } from 'react';
import { 
  Sparkles, Palmtree, Mountain, Building2, Landmark, UtensilsCrossed, 
  PartyPopper, Star, ArrowRight, Compass 
} from 'lucide-react';
import { TRENDING_DESTINATIONS } from '../data/destinations';

const VIBE_CATEGORIES = [
  { id: 'All', label: 'All', icon: Sparkles },
  { id: 'Beach', label: 'Beach', icon: Palmtree },
  { id: 'Mountain', label: 'Mountain', icon: Mountain },
  { id: 'City', label: 'City', icon: Building2 },
  { id: 'Cultural', label: 'Cultural', icon: Landmark },
  { id: 'Food', label: 'Food', icon: UtensilsCrossed },
  { id: 'Nightlife', label: 'Nightlife', icon: PartyPopper },
];

export default function ExploreGallery({ onSelectDestination }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All'
    ? TRENDING_DESTINATIONS
    : TRENDING_DESTINATIONS.filter(d => d.vibeCategory === selectedCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Popular Vibe Filter Pills */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
          <Compass className="w-4 h-4 text-pink-500" />
          <span>Popular Vibe</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {VIBE_CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shadow-xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 text-white shadow-purple-500/25 scale-105'
                    : 'bg-white hover:bg-purple-50 text-slate-700 border border-slate-200 hover:border-purple-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-pink-200' : 'text-purple-600'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trending Now Header */}
      <div className="flex items-center justify-between border-b border-purple-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Trending Now
          </span>
          {selectedCategory !== 'All' && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase tracking-wide">
              in {selectedCategory}
            </span>
          )}
        </div>
        <span className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer">
          <span>Explore All India Destinations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(dest => (
          <div
            key={dest.id}
            onClick={() => onSelectDestination(dest)}
            className="group bg-white rounded-3xl border border-slate-200/80 hover:border-purple-300 shadow-xs hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Category pill */}
              <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-purple-900 backdrop-blur-md shadow-xs">
                {dest.vibeCategory}
              </span>

              {/* Price level */}
              <span className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                {dest.priceLevel}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                  {dest.name}
                </h3>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {dest.rating}
                  <span className="text-slate-400 font-normal">({dest.reviews})</span>
                </span>
                <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                  {dest.avgBudget}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
