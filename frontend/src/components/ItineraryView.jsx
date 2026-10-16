import React, { useState } from 'react';
import { 
  Calendar, MapPin, DollarSign, Users, Download, Bookmark, RefreshCw, 
  ArrowLeft, Clock, Bus, Utensils, Hotel, Sparkles, Check, Info, ShieldAlert,
  ChevronRight, Heart, AlertCircle
} from 'lucide-react';

export default function ItineraryView({ 
  itinerary, 
  onBack, 
  onSave, 
  onDownloadPdf, 
  onRegenerateAll, 
  onRegenerateDay,
  isSaving,
  isDownloadingPdf,
  isRegeneratingDay,
  isSaved
}) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [regeneratingDayNumber, setRegeneratingDayNumber] = useState(null);

  if (!itinerary) return null;

  const handleRegenDay = async (day) => {
    setRegeneratingDayNumber(day.day_number);
    try {
      await onRegenerateDay(day);
    } finally {
      setRegeneratingDayNumber(null);
    }
  };

  const currentDay = itinerary.days && itinerary.days[activeDayIndex] 
    ? itinerary.days[activeDayIndex] 
    : (itinerary.days?.[0] || null);

  const budgetUsedPct = itinerary.budget > 0 
    ? Math.min(100, Math.round((itinerary.estimated_total_cost / itinerary.budget) * 100))
    : 0;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* Top Navigation & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          id="btn-back-to-form"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Preferences</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Regenerate All */}
          <button
            id="btn-regenerate-all"
            onClick={onRegenerateAll}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition-all"
            title="Generate a completely new plan with the same parameters"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Regenerate Trip</span>
          </button>

          {/* Save Trip Button */}
          <button
            id="btn-save-trip"
            onClick={onSave}
            disabled={isSaving || isSaved}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-xs ${
              isSaved 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Saved to Trips</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-sky-600" />
                <span>{isSaving ? 'Saving...' : 'Save Trip'}</span>
              </>
            )}
          </button>

          {/* Export PDF Button */}
          <button
            id="btn-download-pdf"
            onClick={onDownloadPdf}
            disabled={isDownloadingPdf}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 px-4 py-2 rounded-xl shadow-sm shadow-sky-600/30 transition-all disabled:opacity-60"
          >
            {isDownloadingPdf ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Trip Hero Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30 uppercase tracking-wider">
              {itinerary.vibe} Style
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/10">
              {itinerary.total_days} Days / {itinerary.total_days - 1} Nights
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
              {itinerary.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>{itinerary.destination}</span>
              <span className="text-slate-500">•</span>
              <Calendar className="w-4 h-4 text-sky-400" />
              <span>{itinerary.start_date} to {itinerary.end_date}</span>
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Total Budget</span>
              <p className="text-lg sm:text-xl font-bold text-white">
                {itinerary.budget.toLocaleString()} <span className="text-xs font-normal text-slate-300">{itinerary.currency}</span>
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Estimated Cost</span>
              <p className="text-lg sm:text-xl font-bold text-sky-300">
                {itinerary.estimated_total_cost.toLocaleString()} <span className="text-xs font-normal text-slate-300">{itinerary.currency}</span>
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Travelers</span>
              <p className="text-lg sm:text-xl font-bold text-white">
                {itinerary.travelers_count} <span className="text-xs font-normal text-slate-300">({itinerary.traveler_type})</span>
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Budget Health</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${budgetUsedPct > 95 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                    style={{ width: `${budgetUsedPct}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-300">{budgetUsedPct}%</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Layout: Day Tabs & Daily Timeline */}
      <div className="space-y-6">
        
        {/* Day Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {itinerary.days.map((day, idx) => {
            const isActive = idx === activeDayIndex;
            return (
              <button
                key={day.day_number}
                id={`day-tab-${day.day_number}`}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-sky-600 text-white border-sky-600 shadow-sm shadow-sky-600/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span>Day {day.day_number}</span>
                <span className="ml-1.5 opacity-75 font-normal">({day.date.slice(5)})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Day View Card */}
        {currentDay && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Day Header Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-sky-600 tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>Day {currentDay.day_number} • {currentDay.date}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {currentDay.theme || `Exploring ${itinerary.destination}`}
                </h2>
                {currentDay.accommodation_suggestion && (
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <Hotel className="w-3.5 h-3.5 text-slate-400" />
                    <span>Lodging tip: <b>{currentDay.accommodation_suggestion}</b></span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Est. Day Cost</span>
                  <p className="text-base font-bold text-slate-900">
                    {currentDay.estimated_daily_cost} {itinerary.currency}
                  </p>
                </div>

                {/* Regenerate this Day Button */}
                <button
                  id={`regen-day-btn-${currentDay.day_number}`}
                  type="button"
                  onClick={() => handleRegenDay(currentDay)}
                  disabled={regeneratingDayNumber === currentDay.day_number}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors disabled:opacity-50"
                  title="Regenerate only this day's schedule"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${regeneratingDayNumber === currentDay.day_number ? 'animate-spin' : ''}`} />
                  <span>Regenerate Day</span>
                </button>
              </div>
            </div>

            {/* Activities Timeline */}
            <div className="space-y-4">
              {currentDay.activities.map((activity, actIdx) => {
                const periodColors = {
                  morning: 'bg-amber-50 text-amber-800 border-amber-200',
                  afternoon: 'bg-sky-50 text-sky-800 border-sky-200',
                  evening: 'bg-indigo-50 text-indigo-800 border-indigo-200',
                };
                const badgeColor = periodColors[activity.period.toLowerCase()] || 'bg-slate-50 text-slate-800 border-slate-200';

                return (
                  <div 
                    key={activity.id || actIdx}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50 transition-all space-y-3"
                  >
                    {/* Activity Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${badgeColor}`}>
                          {activity.period}
                        </span>
                        <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {activity.time}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-400 font-medium">Duration: {activity.estimated_duration}</span>
                        <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100">
                          {activity.estimated_cost} {itinerary.currency}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>

                    {/* Transport & Dining Recommendations */}
                    {(activity.transport_tip || activity.dining_recommendation || activity.notes) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                        {activity.transport_tip && (
                          <div className="flex items-start gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                            <Bus className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                            <span><b>Transit:</b> {activity.transport_tip}</span>
                          </div>
                        )}
                        {activity.dining_recommendation && (
                          <div className="flex items-start gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                            <Utensils className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <span><b>Dining:</b> {activity.dining_recommendation}</span>
                          </div>
                        )}
                        {activity.notes && (
                          <div className="sm:col-span-2 flex items-start gap-1.5 p-2 rounded-lg bg-sky-50/50 border border-sky-100 text-sky-900">
                            <Info className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                            <span><b>Helpful Tip:</b> {activity.notes}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Next Day Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-sm">
              <button
                type="button"
                disabled={activeDayIndex === 0}
                onClick={() => setActiveDayIndex(prev => Math.max(0, prev - 1))}
                className="text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed font-medium"
              >
                ← Previous Day
              </button>
              <span className="text-xs text-slate-400">Day {activeDayIndex + 1} of {itinerary.days.length}</span>
              <button
                type="button"
                disabled={activeDayIndex === itinerary.days.length - 1}
                onClick={() => setActiveDayIndex(prev => Math.min(itinerary.days.length - 1, prev + 1))}
                className="text-sky-600 hover:text-sky-700 disabled:opacity-30 disabled:cursor-not-allowed font-semibold"
              >
                Next Day →
              </button>
            </div>

          </div>
        )}

        {/* Planning Tips & Local Guidance */}
        {itinerary.planning_tips && itinerary.planning_tips.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              Local Planning Tips & Budget Strategy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {itinerary.planning_tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2 mt-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span><b>Accuracy Note:</b> Estimated prices, opening hours, and travel times are AI-curated estimates. Please verify ticket availability locally.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
