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
  UserCheck,
  Sparkles
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
    <header className="sticky top-0 z-40 bg-[#070B0E]/95 backdrop-blur-md border-b border-white/[0.08] text-ivory shadow-2xl">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3.5">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-colors"
              style={{ backgroundColor: 'var(--admin-accent, #F26A4F)' }}
            >
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-serif-display text-lg sm:text-xl text-ivory tracking-wide font-normal">
                  Holiday Travelers
                </span>
                <span 
                  className="px-2 py-0.5 text-[10px] font-sans-body font-semibold tracking-wider rounded-full uppercase border"
                  style={{
                    backgroundColor: 'rgba(var(--admin-accent-rgb, 242, 106, 79), 0.15)',
                    color: 'var(--admin-accent, #F26A4F)',
                    borderColor: 'rgba(var(--admin-accent-rgb, 242, 106, 79), 0.3)',
                  }}
                >
                  Operator Portal
                </span>
              </div>
              <p className="text-xs text-sand-muted font-sans-body font-light">
                Tour Operations Command & Integrated Submodules
              </p>
            </div>
          </div>

          {/* Right: Authenticated User & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCapstoneModal}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-ivory/90 font-sans-body tracking-wider transition-colors"
            >
              <Layers className="w-3.5 h-3.5" style={{ color: 'var(--admin-accent, #F26A4F)' }} />
              <span>Submodule Architecture</span>
            </button>

            <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 bg-[#0B1014] rounded-full border border-white/[0.08] text-xs font-sans-body">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border"
                style={{
                  backgroundColor: 'rgba(var(--admin-accent-rgb, 242, 106, 79), 0.2)',
                  color: 'var(--admin-accent, #F26A4F)',
                  borderColor: 'rgba(var(--admin-accent-rgb, 242, 106, 79), 0.4)',
                }}
              >
                OP
              </div>
              <div className="text-left">
                <div className="font-medium text-ivory text-xs line-clamp-1">{adminEmail}</div>
                <div className="text-[10px] text-sand-muted">{adminRole}</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 text-xs font-medium transition-all shadow-sm font-sans-body"
              title="Return to Public Customer Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit to Customer Site</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submodule Navigation Tabs with Proper Functional Names */}
      <div className="bg-[#0B1014]/90 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1.5 overflow-x-auto py-2.5 scrollbar-thin scrollbar-thumb-white/10">
            {/* Overview / Admin Dashboard */}
            <button
              onClick={() => onTabChange('overview')}
              style={activeTab === 'overview' ? { backgroundColor: 'var(--admin-accent, #F26A4F)' } : {}}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'text-white font-medium shadow-md shadow-black/40'
                  : 'text-sand-muted hover:text-ivory hover:bg-white/[0.05]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Operations Dashboard</span>
            </button>

            {/* Tour Package Management */}
            <button
              onClick={() => onTabChange('packages')}
              style={activeTab === 'packages' ? { backgroundColor: 'var(--admin-accent, #F26A4F)' } : {}}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'packages'
                  ? 'text-white font-medium shadow-md shadow-black/40'
                  : 'text-sand-muted hover:text-ivory hover:bg-white/[0.05]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tour Package Management</span>
            </button>

            {/* Passenger Manifest */}
            <button
              onClick={() => onTabChange('bookings')}
              style={activeTab === 'bookings' ? { backgroundColor: 'var(--admin-accent, #F26A4F)' } : {}}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'bookings'
                  ? 'text-white font-medium shadow-md shadow-black/40'
                  : 'text-sand-muted hover:text-ivory hover:bg-white/[0.05]'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Booking & Passenger Manifest</span>
              {bookingCount > 0 && (
                <span 
                  className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/60 font-mono font-bold border border-white/10"
                  style={{ color: 'var(--admin-accent, #F26A4F)' }}
                >
                  {bookingCount}
                </span>
              )}
            </button>

            {/* Itineraries & Schedules */}
            <button
              onClick={() => onTabChange('itineraries')}
              style={activeTab === 'itineraries' ? { backgroundColor: 'var(--admin-accent, #F26A4F)' } : {}}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'itineraries'
                  ? 'text-white font-medium shadow-md shadow-black/40'
                  : 'text-sand-muted hover:text-ivory hover:bg-white/[0.05]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Itinerary & Schedule Management</span>
            </button>

            {/* Hotel & Transport Allocations */}
            <button
              onClick={() => onTabChange('reservations')}
              style={activeTab === 'reservations' ? { backgroundColor: 'var(--admin-accent, #F26A4F)' } : {}}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'reservations'
                  ? 'text-white font-medium shadow-md shadow-black/40'
                  : 'text-sand-muted hover:text-ivory hover:bg-white/[0.05]'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>Hotel & Transport Logistics</span>
            </button>

            {/* Payments & Invoices */}
            <button
              onClick={() => onTabChange('payments')}
              style={activeTab === 'payments' ? { backgroundColor: 'var(--admin-accent, #F26A4F)' } : {}}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'payments'
                  ? 'text-white font-medium shadow-md shadow-black/40'
                  : 'text-sand-muted hover:text-ivory hover:bg-white/[0.05]'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Payment & Invoice Management</span>
              {pendingPaymentCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  {pendingPaymentCount}
                </span>
              )}
            </button>

            {/* Feedback & Ratings */}
            <button
              onClick={() => onTabChange('feedback')}
              style={activeTab === 'feedback' ? { backgroundColor: 'var(--admin-accent, #F26A4F)' } : {}}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'feedback'
                  ? 'text-white font-medium shadow-md shadow-black/40'
                  : 'text-sand-muted hover:text-ivory hover:bg-white/[0.05]'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Customer Feedback & Ratings</span>
            </button>

            {/* Laravel Hub */}
            <button
              onClick={() => onTabChange('laravel_integration')}
              style={activeTab === 'laravel_integration' ? { backgroundColor: 'var(--admin-accent, #F26A4F)' } : {}}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'laravel_integration'
                  ? 'text-white font-medium shadow-md shadow-black/40'
                  : 'text-sand-muted hover:text-ivory hover:bg-white/[0.05]'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Laravel Integration Hub</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => onTabChange('settings')}
              style={activeTab === 'settings' ? { backgroundColor: 'var(--admin-accent, #F26A4F)' } : {}}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans-body tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeTab === 'settings'
                  ? 'text-white font-medium shadow-md shadow-black/40'
                  : 'text-sand-muted hover:text-ivory hover:bg-white/[0.05]'
              }`}
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>System & Agency Settings</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
