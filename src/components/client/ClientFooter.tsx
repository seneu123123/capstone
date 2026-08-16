import React from 'react';
import { Compass, Shield, ArrowUp } from 'lucide-react';

interface ClientFooterProps {
  onOpenAdminAuth: () => void;
  onOpenTracker: () => void;
  isStaffLoggedIn?: boolean;
  onOpenAdminPortal?: () => void;
}

export const ClientFooter: React.FC<ClientFooterProps> = ({
  onOpenAdminAuth,
  onOpenTracker,
  isStaffLoggedIn,
  onOpenAdminPortal,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080A] border-t border-white/[0.05] py-20 px-6 sm:px-8 text-sand-muted text-sm font-sans-body">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start justify-between">
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-sunset-coral/60 flex items-center justify-center text-sunset-coral">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-serif-display text-2xl text-ivory tracking-wider">
                Holiday Archipelago
              </span>
            </div>
            <p className="text-sand-muted text-xs leading-relaxed max-w-sm font-light">
              Holiday Travelers Travel & Tours Inc. · DOT Accredited Tour Operator License #NCR-TO-2026. Slow travel expeditions across the Philippine seas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-sunset-coral font-medium">
                Navigation
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#destinations" className="hover:text-ivory transition-colors">
                    Islands
                  </a>
                </li>
                <li>
                  <a href="#expeditions" className="hover:text-ivory transition-colors">
                    Expeditions
                  </a>
                </li>
                <li>
                  <a href="#ethos" className="hover:text-ivory transition-colors">
                    Ethos
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-sunset-coral font-medium">
                Guest Services
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={onOpenTracker} className="hover:text-ivory transition-colors text-left">
                    Track Booking
                  </button>
                </li>
                <li>
                  <span className="text-slate-500 cursor-not-allowed">Direct Flights</span>
                </li>
                <li>
                  <span className="text-slate-500 cursor-not-allowed">Reef Conservation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Back to Top & Staff Access */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sand-muted hover:text-ivory transition-colors"
            >
              <span>Back to surface</span>
              <ArrowUp className="w-3.5 h-3.5 text-sunset-coral" />
            </button>

            {/* Isolated Staff Login Button */}
            <div className="pt-4">
              {isStaffLoggedIn ? (
                <button
                  onClick={onOpenAdminPortal}
                  className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full hover:bg-emerald-500/20 transition-all"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Launch Operations Portal</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAdminAuth}
                  className="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/70 transition-colors"
                  id="footer-staff-login-btn"
                >
                  <Shield className="w-3 h-3" />
                  <span>Staff & Operator Portal</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-xs text-white/30 gap-4">
          <p>© {new Date().getFullYear()} Holiday Travelers Travel & Tours Inc. All rights reserved.</p>
          <p>Protected by Enterprise Rate Limiting & Sanctum Token Security</p>
        </div>
      </div>
    </footer>
  );
};
