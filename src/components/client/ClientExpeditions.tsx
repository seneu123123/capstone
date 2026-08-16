import React, { useState } from 'react';
import { TourPackage } from '../../types';
import { Clock, Star, ArrowUpRight, Check, Compass } from 'lucide-react';

interface ClientExpeditionsProps {
  packages: TourPackage[];
  onSelectPackage: (pkg: TourPackage) => void;
}

export const ClientExpeditions: React.FC<ClientExpeditionsProps> = ({
  packages,
  onSelectPackage,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

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
            // Curate visual assets for cards
            const fallbackImages = [
              'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
            ];
            const displayImage = pkg.bannerUrl || fallbackImages[idx % fallbackImages.length];

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
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={displayImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover img-editorial-card"
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
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-ivory group-hover:text-white transition-colors leading-tight">
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
                  <div className="pt-6 border-t border-white/[0.06] flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-sans-body tracking-[0.2em] uppercase text-sand-muted">
                        From
                      </p>
                      <p className="font-serif-display text-2xl sm:text-3xl text-ivory">
                        ₱{Number(price).toLocaleString()}{' '}
                        <span className="text-xs font-sans-body text-sand-muted font-light">
                          / person
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="group/btn flex items-center gap-2 bg-white/[0.06] hover:bg-sunset-coral text-ivory hover:text-white px-5 py-2.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 border border-white/10 hover:border-sunset-coral"
                      id={`reserve-pkg-${pkg.id}`}
                    >
                      <span>Reserve</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
