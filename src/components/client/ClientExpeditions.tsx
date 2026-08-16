import React, { useState } from 'react';
import { TourPackage } from '../../types';
import { Clock, Star, ArrowUpRight, Check, Compass, Eye, X, MapPin, Calendar } from 'lucide-react';

interface ClientExpeditionsProps {
  packages: TourPackage[];
  onSelectPackage: (pkg: TourPackage) => void;
}

export const ClientExpeditions: React.FC<ClientExpeditionsProps> = ({
  packages,
  onSelectPackage,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [modalPackage, setModalPackage] = useState<TourPackage | null>(null);

  const activePackages = packages.filter((p) => p.status === 'Active');

  const categories = ['All', 'Island Hopping', 'Adventure & Nature', 'Heritage & Culture', 'Luxury & Wellness'];

  const filteredPackages = activePackages.filter((pkg) => {
    if (selectedFilter === 'All') return true;
    return pkg.category === selectedFilter;
  });

  return (
    <section
      id="expeditions"
      className="py-28 sm:py-36 px-6 sm:px-8 bg-obsidian-deep border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header and Filter Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <p className="text-xs sm:text-sm font-sans-body tracking-[0.25em] uppercase text-sunset-coral font-medium">
              Curated Expeditions
            </p>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-ivory leading-[1.08]">
              Journeys through <br />
              <span className="italic font-normal">the archipelago</span>
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans-body tracking-wider transition-all duration-300 ${
                  selectedFilter === cat
                    ? 'bg-sunset-coral text-white font-medium shadow-md shadow-sunset-coral/20'
                    : 'bg-white/[0.04] text-sand-muted hover:text-ivory hover:bg-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Dark Luxury Journey Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredPackages.map((pkg, idx) => {
            const localFallbacks = [
              '/images/pac1.webp',
              '/images/bohol.jpg',
              '/images/pac2.avif',
              '/images/pac3.jpg',
              '/images/palawan_paradise.svg',
              '/images/siargao_surf.svg'
            ];
            const fallbackImages = [
              'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
            ];
            const displayImage = pkg.bannerUrl || localFallbacks[idx % localFallbacks.length];

            const price = pkg.pricePerPax ?? (pkg as any).price_per_pax ?? 0;
            const days = pkg.durationDays ?? (pkg as any).duration_days ?? 1;
            const nights = pkg.durationNights ?? (pkg as any).duration_nights ?? Math.max(0, days - 1);
            const isSignature = idx === 0 || price > 15000;

            return (
              <div
                key={pkg.id}
                className="group relative bg-[#0B1014] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/20 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Banner Container */}
                <div 
                  onClick={() => setModalPackage(pkg)}
                  className="relative aspect-[16/10] overflow-hidden bg-black/40 cursor-pointer"
                >
                  <img
                    src={displayImage}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = fallbackImages[idx % fallbackImages.length];
                    }}
                    alt={pkg.title}
                    className="w-full h-full object-cover img-editorial-card group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1014] via-[#0B1014]/20 to-transparent pointer-events-none" />

                  {/* Top Badges: Signature Pill & Rating */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    {isSignature ? (
                      <span className="bg-sunset-coral text-white text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full shadow-lg">
                        Signature
                      </span>
                    ) : (
                      <span className="bg-black/60 backdrop-blur-md text-ivory text-[11px] font-medium tracking-wider px-3 py-1 rounded-full border border-white/10">
                        {pkg.category}
                      </span>
                    )}

                    <div className="bg-black/60 backdrop-blur-md text-ivory text-xs px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#F26A4F] text-[#F26A4F]" />
                      <span className="font-medium">{pkg.rating || 4.9}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body Content */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Meta Row: Destination + Duration */}
                    <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-sand-muted">
                      <span>{pkg.destination}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-ivory/80">
                        <Clock className="w-3 h-3 text-sunset-coral" />
                        {days} Days / {nights} Nights
                      </span>
                    </div>

                    {/* Expedition Title */}
                    <h3 
                      onClick={() => setModalPackage(pkg)}
                      className="font-serif-display text-2xl sm:text-3xl font-normal text-ivory group-hover:text-white transition-colors leading-tight cursor-pointer"
                    >
                      {pkg.title}
                    </h3>

                    {/* Highlights / Inclusions Pills */}
                    {pkg.inclusions && pkg.inclusions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {pkg.inclusions.slice(0, 3).map((inc, i) => (
                          <span
                            key={i}
                            className="text-xs text-[#B0BCC5] bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-full font-light"
                          >
                            {inc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-sans-body tracking-[0.2em] uppercase text-sunset-coral font-medium">
                          All-Inclusive Rate
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif-display text-2xl sm:text-3xl font-semibold text-ivory tracking-tight">
                          ₱{Number(price).toLocaleString()}
                        </span>
                        <span className="text-xs font-sans-body text-sand-muted font-normal">
                          / person
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalPackage(pkg)}
                        className="px-4 py-2.5 rounded-full text-xs font-medium text-sand-muted hover:text-ivory bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-1.5"
                        title="View Detailed Itinerary"
                      >
                        <Eye className="w-3.5 h-3.5 text-sunset-coral" />
                        <span className="hidden sm:inline">Details</span>
                      </button>

                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="group/btn relative flex items-center gap-2 bg-sunset-coral hover:bg-[#ff765b] text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl shadow-sunset-coral/25 hover:shadow-sunset-coral/45 hover:scale-[1.03] active:scale-[0.98] border border-white/10"
                        id={`reserve-pkg-${pkg.id}`}
                      >
                        <span>Reserve</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expedition Details Modal */}
      {modalPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0B1014] border border-white/10 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 relative">
            <button
              onClick={() => setModalPackage(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-sand-muted hover:text-ivory hover:bg-white/5 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-sans-body tracking-[0.25em] uppercase text-sunset-coral font-medium">
                {modalPackage.category} · {modalPackage.destination}
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-ivory">
                {modalPackage.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-sand-muted font-light pt-1">
                <span>{modalPackage.durationDays} Days / {modalPackage.durationNights} Nights</span>
                <span>·</span>
                <span className="text-sunset-coral font-mono font-bold text-sm">₱{Number(modalPackage.pricePerPax).toLocaleString()} / Pax</span>
              </div>
            </div>

            {/* Inclusions */}
            {modalPackage.inclusions && modalPackage.inclusions.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <h4 className="text-xs font-sans-body uppercase tracking-wider text-ivory font-medium">
                  What's Included in this Expedition
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {modalPackage.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-sand-muted font-light bg-[#070B0E] p-2.5 rounded-xl border border-white/[0.04]">
                      <Check className="w-3.5 h-3.5 text-sunset-coral shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Itinerary */}
            {modalPackage.itinerary && modalPackage.itinerary.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                <h4 className="text-xs font-sans-body uppercase tracking-wider text-ivory font-medium">
                  Day-by-Day Journey Schedule
                </h4>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                  {modalPackage.itinerary.map((day) => (
                    <div key={day.dayNumber} className="bg-[#070B0E] p-4 rounded-xl border border-white/[0.04] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-serif-display text-lg text-ivory">
                          Day {day.dayNumber}: {day.title}
                        </span>
                        <span className="text-[11px] text-sand-muted">{day.meals}</span>
                      </div>
                      <p className="text-xs text-sand-muted font-light leading-relaxed">
                        {day.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Action Footer */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans-body tracking-[0.2em] uppercase text-sunset-coral font-medium block">
                  Total Rate per Pax
                </span>
                <span className="font-serif-display text-2xl sm:text-3xl text-ivory font-normal">
                  ₱{(modalPackage.pricePerPax ?? (modalPackage as any).price_per_pax ?? 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setModalPackage(null)}
                  className="px-5 py-2.5 rounded-full text-xs text-sand-muted hover:text-ivory bg-white/[0.04] hover:bg-white/[0.08] transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const pkgToBook = modalPackage;
                    setModalPackage(null);
                    onSelectPackage(pkgToBook);
                  }}
                  className="group inline-flex items-center justify-center gap-2 bg-sunset-coral hover:bg-[#ff765b] text-white px-7 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase shadow-2xl shadow-sunset-coral/30 hover:shadow-sunset-coral/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/10"
                >
                  <span>Book Expedition</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
