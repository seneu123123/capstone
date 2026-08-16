import React from 'react';
import { ArrowDown } from 'lucide-react';

interface ClientHeroProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

export const ClientHero: React.FC<ClientHeroProps> = ({ onExploreClick }) => {
  const scrollToNext = () => {
    const ethos = document.getElementById('ethos');
    if (ethos) {
      ethos.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExploreClick();
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 overflow-hidden bg-obsidian-deep"
    >
      {/* Cinematic Full-Bleed Background with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=2400&q=85"
          alt="Palawan archipelago limestone karst lagoons"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        {/* Layered Gradient Overlays for Moody Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B0E] via-[#070B0E]/60 to-[#070B0E]/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      {/* Hero Content (Centered Editorial Alignment) */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-left pt-12 md:pt-20">
        {/* Eyebrow Label */}
        <p className="text-xs sm:text-sm font-sans-body tracking-[0.28em] uppercase text-sunset-coral font-medium mb-6">
          7,641 Islands · One Archipelago
        </p>

        {/* Master Editorial Headline */}
        <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-light text-ivory leading-[1.05] tracking-tight mb-8 hero-text-shadow max-w-4xl">
          Wander the <br className="hidden sm:block" />
          <span className="italic font-normal text-white">Philippine seas</span>
        </h1>

        {/* Manifesto Subtitle */}
        <p className="text-base sm:text-lg md:text-xl font-sans-body text-[#B8C2CA] max-w-2xl font-light leading-relaxed mb-10">
          Curated island expeditions through hidden lagoons, living reefs and coasts the maps forgot. Slow travel, deep water, no crowds.
        </p>
      </div>

      {/* Bottom Floating Scroll Prompt */}
      <div className="relative z-10 w-full flex justify-center pb-4">
        <button
          onClick={scrollToNext}
          className="group flex items-center gap-2.5 text-xs font-sans-body tracking-[0.2em] uppercase text-sand-muted hover:text-ivory transition-all duration-300 focus:outline-none"
          id="hero-scroll-down-btn"
        >
          <ArrowDown className="w-3.5 h-3.5 text-sunset-coral group-hover:translate-y-1 transition-transform duration-300" />
          <span>Scroll to dive</span>
        </button>
      </div>
    </section>
  );
};
