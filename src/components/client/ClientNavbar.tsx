import React from 'react';
import { 
  Compass, 
  Luggage, 
  Search, 
  Star, 
  Calendar, 
  FileCheck, 
  ShieldCheck, 
  LogIn, 
  Phone,
  HelpCircle
} from 'lucide-react';

export type ClientTab = 'tours' | 'book' | 'track' | 'feedback';

interface ClientNavbarProps {
  activeTab: ClientTab;
  onTabChange: (tab: ClientTab) => void;
  onOpenLoginModal: () => void;
  onOpenSpecsModal: () => void;
  companyName: string;
  phone: string;
  bookingCount: number;
}

export const ClientNavbar: React.FC<ClientNavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenLoginModal,
  onOpenSpecsModal,
  companyName,
  phone,
  bookingCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top micro bar */}
      <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border-b border-slate-800/60 py-1.5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              DOT Accredited Travel & Tour Operator
            </span>
            <span className="hidden sm:inline-block text-slate-600">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              Hotline: {phone}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSpecsModal}
              className="text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Capstone Specs</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenLoginModal}
              className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Operator / Staff Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <button 
            onClick={() => onTabChange('tours')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent truncate max-w-[220px] sm:max-w-none">
                  {companyName}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Island Getaways & Curated Tours Portal
              </p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onTabChange('tours')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'tours'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Luggage className="w-4 h-4 text-cyan-400" />
              <span>Explore Tours</span>
            </button>

            <button
              onClick={() => onTabChange('book')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'book'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Book a Trip</span>
            </button>

            <button
              onClick={() => onTabChange('track')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === 'track'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Track Voucher</span>
              {bookingCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onTabChange('feedback')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'feedback'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Star className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Reviews</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
