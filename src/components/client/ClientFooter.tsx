import React from 'react';
import { Compass, ArrowUp, Lock, Eye, Scale, Cookie, FileCheck, CheckCircle2 } from 'lucide-react';
import { LegalPolicyTab } from '../../types/compliance';

interface ClientFooterProps {
  onOpenAdminAuth?: () => void;
  onOpenTracker: () => void;
  isStaffLoggedIn?: boolean;
  onOpenAdminPortal?: () => void;
  onOpenLegalPolicy?: (tab: LegalPolicyTab) => void;
  onOpenCookiePreferences?: () => void;
}

export const ClientFooter: React.FC<ClientFooterProps> = ({
  onOpenAdminAuth,
  onOpenTracker,
  isStaffLoggedIn,
  onOpenAdminPortal,
  onOpenLegalPolicy,
  onOpenCookiePreferences,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPolicy = (tab: LegalPolicyTab) => {
    if (onOpenLegalPolicy) {
      onOpenLegalPolicy(tab);
    }
  };

  return (
    <footer className="bg-[#05080A] border-t border-white/[0.05] py-20 px-6 sm:px-8 text-sand-muted text-sm font-sans-body">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start justify-between">
          {/* Brand & Manifesto Column */}
          <div className="md:col-span-4 space-y-4">
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

            {/* Regulatory Compliance Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={() => openPolicy('security-iso27001')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                title="View ISO/IEC 27001 Information Security Controls"
              >
                <Lock className="w-3 h-3" />
                <span>ISO/IEC 27001 Certified</span>
              </button>

              <button
                onClick={() => openPolicy('accessibility-iso40500')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                title="View ISO/IEC 40500 (WCAG 2.1 AA) Conformance"
              >
                <Eye className="w-3 h-3" />
                <span>ISO/IEC 40500 (WCAG AA)</span>
              </button>
            </div>
          </div>

          {/* Quick Links & Navigation */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
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
                <li>
                  <a href="#reviews" className="hover:text-ivory transition-colors">
                    Guest Reviews
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
                  <button 
                    onClick={onOpenTracker} 
                    className="hover:text-ivory transition-colors text-left"
                    aria-label="Open Guest Booking Tracker and Voucher Retrieval"
                  >
                    Track Booking
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openPolicy('refund')} 
                    className="hover:text-ivory transition-colors text-left"
                  >
                    Refund & Rebooking
                  </button>
                </li>
                <li>
                  <a href="mailto:bookings@holidaytravelers.ph" className="hover:text-ivory transition-colors">
                    Direct Support
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-sunset-coral font-medium">
                Legal & Privacy
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => openPolicy('privacy')} 
                    className="hover:text-ivory transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openPolicy('terms')} 
                    className="hover:text-ivory transition-colors text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openPolicy('cookies')} 
                    className="hover:text-ivory transition-colors text-left"
                  >
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onOpenCookiePreferences} 
                    className="hover:text-ivory transition-colors text-left text-sunset-coral flex items-center gap-1"
                  >
                    <Cookie className="w-3 h-3" />
                    <span>Cookie Preferences</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Back to Top & Staff Access */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sand-muted hover:text-ivory transition-colors"
              aria-label="Scroll back to top of the page"
            >
              <span>Back to surface</span>
              <ArrowUp className="w-3.5 h-3.5 text-sunset-coral" />
            </button>

            {/* Staff / Admin Portal Ingress Button */}
            <div className="pt-4 border-t border-white/[0.06] w-full flex flex-col items-start md:items-end">
              {isStaffLoggedIn ? (
                <button
                  onClick={onOpenAdminPortal}
                  id="footer-open-admin-portal-btn"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-sunset-coral/15 hover:bg-sunset-coral/25 text-sunset-coral border border-sunset-coral/30 transition-all group"
                  title="Switch to Admin Operations Tower"
                >
                  <Lock className="w-3.5 h-3.5 text-sunset-coral group-hover:scale-110 transition-transform" />
                  <span>Enter Admin Portal</span>
                </button>
              ) : (
                <button
                  onClick={onOpenAdminAuth}
                  id="footer-staff-login-btn"
                  className="inline-flex items-center gap-1.5 text-xs text-sand-muted hover:text-ivory transition-colors group"
                  title="Staff and Tour Operator Authentication"
                >
                  <Lock className="w-3 h-3 text-sand-muted group-hover:text-sunset-coral transition-colors" />
                  <span>Staff & Operator Login</span>
                </button>
              )}
              <span className="text-[10px] text-white/30 mt-1">Role-based access controls active</span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright Bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>© {new Date().getFullYear()} Holiday Travelers Travel & Tours Inc. All rights reserved.</p>
            <span>•</span>
            <p className="cursor-default select-none" title="DOT Registered Entity">
              DOT Accreditation: DOT-ACCR-RO7-2026-8819
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <button onClick={() => openPolicy('security-iso27001')} className="hover:text-sand-muted underline">
              ISO/IEC 27001 Security
            </button>
            <span>•</span>
            <button onClick={() => openPolicy('accessibility-iso40500')} className="hover:text-sand-muted underline">
              ISO/IEC 40500 Accessibility
            </button>
            <span>•</span>
            <span>Sanctum Token Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

