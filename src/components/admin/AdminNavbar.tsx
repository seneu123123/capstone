import React from 'react';
import { SubmoduleTab } from '../../types';
import { 
  Compass, 
  Layers, 
  MapPin, 
  Calendar, 
  Hotel, 
  CreditCard, 
  Star, 
  Briefcase, 
  Server, 
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface AdminNavbarProps {
  activeTab: SubmoduleTab;
  onTabChange: (tab: SubmoduleTab) => void;
  onOpenCapstoneModal: () => void;
  onLogout: () => void;
  bookingCount: number;
  pendingPaymentCount: number;
  adminEmail: string;
  adminRole: string;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenCapstoneModal,
  onLogout,
  bookingCount,
  pendingPaymentCount,
  adminEmail,
  adminRole
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-2xl">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                  Tour Operations Command Center
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  STAFF PORTAL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Holiday Travelers Travel & Tours Inc.
              </p>
            </div>
          </div>

          {/* Right: Authenticated User & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCapstoneModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs text-cyan-400 font-medium transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>6 Submodules Matrix</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
              <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-[10px]">
                OP
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-200 text-xs line-clamp-1">{adminEmail}</div>
                <div className="text-[10px] text-slate-400">{adminRole}</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-semibold transition-all shadow-sm"
              title="Return to Public Customer Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit to Customer Site</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submodule Navigation Tabs */}
      <div className="bg-slate-900/90 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-slate-700">
            {/* Overview / Admin Dashboard */}
            <button
              onClick={() => onTabChange('overview')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Operations Overview</span>
            </button>

            {/* 1. Packages Management */}
            <button
              onClick={() => onTabChange('packages')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'packages'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1. Tour Packages</span>
            </button>

            {/* 2. Passenger Manifest */}
            <button
              onClick={() => onTabChange('bookings')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'bookings'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>2. Passenger Manifest</span>
              {bookingCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 font-mono font-bold text-cyan-400 border border-slate-700">
                  {bookingCount}
                </span>
              )}
            </button>

            {/* 3. Itineraries & Schedules */}
            <button
              onClick={() => onTabChange('itineraries')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'itineraries'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>3. Guide & Schedule</span>
            </button>

            {/* 4. Hotel & Transport Allocations */}
            <button
              onClick={() => onTabChange('reservations')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'reservations'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>4. Hotel & Transport</span>
            </button>

            {/* 5. Payments & Invoices */}
            <button
              onClick={() => onTabChange('payments')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'payments'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>5. Billing & Invoices</span>
              {pendingPaymentCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  {pendingPaymentCount}
                </span>
              )}
            </button>

            {/* 6. Feedback & Ratings */}
            <button
              onClick={() => onTabChange('feedback')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'feedback'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>6. CSAT Ratings</span>
            </button>

            {/* Laravel Hub */}
            <button
              onClick={() => onTabChange('laravel_integration')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'laravel_integration'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Laravel Hub</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => onTabChange('settings')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>7. Settings</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
