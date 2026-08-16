import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, Shield, Search, UserCheck } from 'lucide-react';

interface ClientNavbarProps {
  onOpenBooking: (packageId?: string) => void;
  onOpenTracker: () => void;
  onOpenAdminAuth: () => void;
  isStaffLoggedIn?: boolean;
  onOpenAdminPortal?: () => void;
}

export const ClientNavbar: React.FC<ClientNavbarProps> = ({
  onOpenBooking,
  onOpenTracker,
  onOpenAdminAuth,
  isStaffLoggedIn,
  onOpenAdminPortal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-obsidian-nav py-4 shadow-2xl'
          : 'bg-gradient-to-b from-[#070B0E]/90 via-[#070B0E]/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo with Compass Icon */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="flex items-center gap-3 group focus:outline-none"
          id="brand-logo-link"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sunset-coral/20 to-sunset-coral/10 border border-sunset-coral/60 flex items-center justify-center text-sunset-coral group-hover:scale-105 group-hover:border-sunset-coral transition-all duration-300 shadow-md shadow-sunset-coral/10">
            <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-display text-xl sm:text-2xl text-ivory tracking-wide font-normal leading-tight">
              Holiday Travelers
            </span>
            <span className="text-[10px] font-sans-body tracking-[0.2em] uppercase text-sand-muted font-light">
              Travel & Tours Inc.
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            onClick={() => scrollToSection('destinations')}
            className="text-sm font-sans-body text-sand-muted hover:text-ivory transition-colors tracking-wide"
            id="nav-destinations-btn"
          >
            Islands
          </button>
          <button
            onClick={() => scrollToSection('expeditions')}
            className="text-sm font-sans-body text-sand-muted hover:text-ivory transition-colors tracking-wide"
            id="nav-journeys-btn"
          >
            Journeys
          </button>
          <button
            onClick={() => scrollToSection('ethos')}
            className="text-sm font-sans-body text-sand-muted hover:text-ivory transition-colors tracking-wide"
            id="nav-ethos-btn"
          >
            Ethos
          </button>
          <button
            onClick={onOpenTracker}
            className="text-sm font-sans-body text-sand-muted hover:text-ivory transition-colors tracking-wide flex items-center gap-1.5"
            id="nav-track-btn"
          >
            <Search className="w-3.5 h-3.5 text-sunset-coral/80" />
            Track Voucher
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {isStaffLoggedIn ? (
            <button
              onClick={onOpenAdminPortal}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs font-medium tracking-wide transition-all"
              id="nav-admin-active-btn"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Operations Portal</span>
            </button>
          ) : (
            <button
              onClick={onOpenAdminAuth}
              title="Staff & Operator Login"
              className="text-sand-muted hover:text-ivory p-2 rounded-full hover:bg-white/5 transition-colors"
              id="nav-staff-login-trigger"
            >
              <Shield className="w-4 h-4 opacity-60 hover:opacity-100" />
            </button>
          )}

          <button
            onClick={() => onOpenBooking()}
            className="group relative inline-flex items-center justify-center gap-2 bg-sunset-coral hover:bg-[#ff765b] text-white px-7 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase shadow-xl shadow-sunset-coral/30 hover:shadow-sunset-coral/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-white/10"
            id="nav-begin-journey-btn"
          >
            <span>Begin Journey</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 group-hover:bg-white animate-pulse" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-ivory p-2 rounded-lg hover:bg-white/5 focus:outline-none"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-obsidian border-b border-white/10 px-6 py-6 mt-3 space-y-4">
          <button
            onClick={() => scrollToSection('destinations')}
            className="block w-full text-left py-2 text-ivory text-base font-serif-display"
          >
            Islands & Destinations
          </button>
          <button
            onClick={() => scrollToSection('expeditions')}
            className="block w-full text-left py-2 text-ivory text-base font-serif-display"
          >
            Curated Journeys
          </button>
          <button
            onClick={() => scrollToSection('ethos')}
            className="block w-full text-left py-2 text-ivory text-base font-serif-display"
          >
            Our Ethos
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="block w-full text-left py-2 text-sunset-coral text-base font-sans-body"
          >
            🔍 Track Guest Voucher
          </button>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-sunset-coral text-white py-3 rounded-full text-sm font-medium tracking-wide text-center"
            >
              Begin Journey
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                isStaffLoggedIn && onOpenAdminPortal ? onOpenAdminPortal() : onOpenAdminAuth();
              }}
              className="w-full text-sand-muted text-xs py-2 text-center flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              {isStaffLoggedIn ? 'Open Operations Portal' : 'Staff Access'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
