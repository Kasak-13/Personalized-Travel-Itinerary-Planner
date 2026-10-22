import React from 'react';
import { 
  Sparkles, ArrowRight, Wand2, Route, Wallet, Clock, Star, 
  CheckCircle2, Compass, MapPin, Calendar, Heart 
} from 'lucide-react';

export default function LandingHero({ onStartPlanning }) {
  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Soft background glow spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-purple-400/20 via-pink-400/20 to-fuchsia-400/10 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-800 text-xs font-bold uppercase tracking-wider border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
              <span>India #1 AI Travel Companion</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Plan your next{' '}
              <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent">
                adventure
              </span>{' '}
              in seconds.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              The most advanced AI travel companion that handles the complexity of planning so you can focus on the experience.
            </p>

            {/* CTA & Social Proof */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onStartPlanning}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 active:from-purple-700 shadow-xl shadow-purple-500/30 flex items-center justify-center gap-2.5 transition-all hover:scale-105 group text-base"
              >
                <span>Start Planning Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Traveler Avatars Proof */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/80 border border-purple-100 shadow-xs">
                <div className="flex -space-x-2">
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Traveler" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Traveler" />
                  <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Traveler" />
                </div>
                <span className="text-xs font-bold text-slate-700">10,000+ travelers</span>
              </div>
            </div>
          </div>

          {/* Right Floating Card Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-purple-500/15 border border-purple-100 space-y-4 transform hover:-translate-y-1 transition-transform">
              
              <div className="flex items-center justify-between border-b border-purple-50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Manali Himalayan Getaway</h4>
                    <p className="text-[11px] text-slate-500">4 Days • 2 Travelers • ₹14,000 Total</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 uppercase">
                  Mountain Vibe
                </span>
              </div>

              {/* Mock Activity Schedule */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
                  <span className="font-semibold text-purple-900">☀️ Morning: Solang Valley Snow Activities</span>
                  <span className="text-purple-700 font-bold">₹ 1,200</span>
                </div>
                <div className="p-2.5 rounded-xl bg-pink-50/60 border border-pink-100 flex items-center justify-between">
                  <span className="font-semibold text-pink-900">🚶 Afternoon: Old Manali Cafe Hopping</span>
                  <span className="text-pink-700 font-bold">₹ 600</span>
                </div>
                <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
                  <span className="font-semibold text-indigo-900">🌙 Evening: Mall Road Stroll & Trout Dinner</span>
                  <span className="text-indigo-700 font-bold">₹ 900</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-purple-50">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Auto-optimized transit routes
                </span>
                <span className="font-bold text-purple-700">Verified by Groq AI</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Enterprise-grade Reliability Logos */}
      <section className="border-y border-purple-100 bg-white/60 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
            Enterprise-grade reliability • Trusted worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-sm font-black text-slate-400 tracking-wider">
            <span className="hover:text-purple-600 transition-colors">AIRBNB</span>
            <span className="hover:text-purple-600 transition-colors">EXPEDIA</span>
            <span className="hover:text-purple-600 transition-colors">TRIPADVISOR</span>
            <span className="hover:text-purple-600 transition-colors">BOOKING</span>
            <span className="hover:text-purple-600 transition-colors">MAKEMYTRIP</span>
          </div>
        </div>
      </section>

      {/* Built for the Modern Traveler (4 Feature Cards matching Page 14) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Built for the modern traveler
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to organize your journey, all in one premium interface.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Wand2 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">AI-Powered Planning</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Personalized itineraries generated instantly using advanced AI models tailored to your taste.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
              <Route className="w-5 h-5 text-pink-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Smart Route Optimization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Minimized travel time and maximum experience with algorithmically grouped nearby sights.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center font-bold">
              <Wallet className="w-5 h-5 text-fuchsia-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Budget-Conscious (INR / ₹)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stay within your budget with real-time INR cost estimations and smart local recommendations.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Time Management</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Perfect pacing for your travel style — choose between relaxed, balanced, or packed tracks.
            </p>
          </div>

        </div>
      </section>

      {/* Testimonials (matching Page 13) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-purple-700">Testimonials</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Loved by Travelers Worldwide</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "Finally, a travel tool that feels like it belongs in 2026. The AI itinerary for our Manali trip was spot on and saved me hours."
            </p>
            <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Sarah Jenkins</span>
              <span className="text-slate-400 uppercase text-[10px]">Digital Nomad</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "The route optimization is real. I saw more of Jaipur in 3 days than I did in a week last time. Incredible food recommendations!"
            </p>
            <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Michael Chen</span>
              <span className="text-slate-400 uppercase text-[10px]">Frequent Flyer</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-3">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "Clean, fast, and beautiful. It's the Notion of travel planning. The PDF export had our whole family trip schedule organized."
            </p>
            <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Elena Rodriguez</span>
              <span className="text-slate-400 uppercase text-[10px]">Adventure Blogger</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Purple Call-to-Action Banner (matching Page 13) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute right-0 top-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Your next story starts here.
          </h2>
          <p className="text-sm text-purple-200 max-w-md mx-auto">
            Join 10,000+ travelers planning their dream trips today with AI.
          </p>

          <div>
            <button
              onClick={onStartPlanning}
              className="px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 shadow-lg shadow-purple-500/30 transition-all hover:scale-105"
            >
              Create My Itinerary
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
