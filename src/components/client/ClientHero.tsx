import React from 'react';
import { Search, MapPin, Sparkles, Shield, Compass, Star, Award, CheckCircle2 } from 'lucide-react';
import { TourCategory } from '../../types';

interface ClientHeroProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: TourCategory[];
  totalPackagesCount: number;
}

export const ClientHero: React.FC<ClientHeroProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  totalPackagesCount
}) => {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-10 shadow-2xl shadow-cyan-950/20">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Island Hopping & Philippine Adventures</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Discover the Philippines with <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">Holiday Travelers</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
          DOT-Accredited island hopping, beachfront resort packages, and customized group itineraries across El Nido, Boracay, Bohol, Siargao, and Cebu.
        </p>

        {/* Search Bar */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 sm:p-3 shadow-xl backdrop-blur flex flex-col sm:flex-row gap-2 mb-6">
          <div className="flex-1 flex items-center gap-3 px-3 py-2 bg-slate-950/60 rounded-xl border border-slate-800">
            <Search className="w-5 h-5 text-cyan-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search destination, island, or tour package..."
              className="bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none w-full"
            />
            {searchTerm && (
              <button 
                onClick={() => onSearchChange('')}
                className="text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Categories:</span>
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
            }`}
          >
            All Packages ({totalPackagesCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">DOT Accredited</div>
            <div className="text-[11px] text-slate-400">Certified Operator</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Instant Voucher</div>
            <div className="text-[11px] text-slate-400">Live QR & PDF Code</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Flexible Deposit</div>
            <div className="text-[11px] text-slate-400">50% Downpayment</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">4.9 / 5.0 Rating</div>
            <div className="text-[11px] text-slate-400">500+ Happy Tourists</div>
          </div>
        </div>
      </div>
    </div>
  );
};
