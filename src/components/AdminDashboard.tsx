import React from 'react';
import { Booking, CustomerFeedback, TourPackage } from '../types';
import { 
  TrendingUp, 
  MapPin, 
  UserCheck, 
  CreditCard, 
  Star, 
  CheckCircle2, 
  Hotel, 
  Car, 
  ArrowRight,
  Layers,
  Sparkles,
  Calendar,
  Compass,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

interface AdminDashboardProps {
  packages: TourPackage[];
  bookings: Booking[];
  feedbacks: CustomerFeedback[];
  onNavigateTab: (tab: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  packages,
  bookings,
  feedbacks,
  onNavigateTab
}) => {
  const totalRevenue = bookings.reduce((sum, b) => sum + b.invoice.amountPaid, 0);
  const pendingRevenue = bookings.reduce((sum, b) => sum + b.invoice.balanceDue, 0);
  const activePackagesCount = packages.filter((p) => p.status === 'Active').length;
  const confirmedBookingsCount = bookings.filter((b) => b.bookingStatus === 'Confirmed').length;

  return (
    <div className="space-y-8">
      {/* Overview Welcome Banner */}
      <div className="bg-[#0B1014] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sunset-coral/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-sans-body tracking-[0.25em] uppercase text-sunset-coral font-medium">
              Operations Control Tower
            </span>
            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-ivory tracking-wide leading-tight">
              Tour Operations & <br />
              <span className="italic font-normal text-white">Booking Management System</span>
            </h1>
            <p className="text-xs sm:text-sm text-sand-muted max-w-2xl font-light leading-relaxed">
              Integrated operational suite managing 6 core submodules: Tour Package Catalog, Booking Manifest, Itineraries & Schedules, Hotel/Transport Logistics, Billing & Invoices, and CSAT Feedback.
            </p>
          </div>
        </div>

        {/* Metric Cards (Editorial Luxury Alignment) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/[0.08]">
          <div className="bg-[#070B0E] p-5 rounded-xl border border-white/[0.06] space-y-2">
            <span className="text-[11px] font-sans-body tracking-wider uppercase text-sand-muted">
              Total Revenue Collected
            </span>
            <div className="font-serif-display text-3xl text-emerald-400">
              ₱{totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-sand-muted font-light">
              ₱{pendingRevenue.toLocaleString()} pending balance
            </div>
          </div>

          <div className="bg-[#070B0E] p-5 rounded-xl border border-white/[0.06] space-y-2">
            <span className="text-[11px] font-sans-body tracking-wider uppercase text-sand-muted">
              Active Manifest Bookings
            </span>
            <div className="font-serif-display text-3xl text-ivory">
              {confirmedBookingsCount} <span className="text-sm font-sans-body text-sand-muted font-light">Confirmed</span>
            </div>
            <div className="text-xs text-sand-muted font-light">
              {bookings.length} total registered records
            </div>
          </div>

          <div className="bg-[#070B0E] p-5 rounded-xl border border-white/[0.06] space-y-2">
            <span className="text-[11px] font-sans-body tracking-wider uppercase text-sand-muted">
              Active Tour Catalog
            </span>
            <div className="font-serif-display text-3xl text-sunset-coral">
              {activePackagesCount} <span className="text-sm font-sans-body text-sand-muted font-light">Packages</span>
            </div>
            <div className="text-xs text-sand-muted font-light">
              {packages.length} total inventory items
            </div>
          </div>

          <div className="bg-[#070B0E] p-5 rounded-xl border border-white/[0.06] space-y-2">
            <span className="text-[11px] font-sans-body tracking-wider uppercase text-sand-muted">
              Guest CSAT Rating
            </span>
            <div className="font-serif-display text-3xl text-amber-400 flex items-center gap-1.5">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-xs text-sand-muted font-light">
              {feedbacks.length} verified traveler reviews
            </div>
          </div>
        </div>
      </div>

      {/* Submodule Quick Access Hub */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-sans-body tracking-[0.25em] uppercase text-sand-muted font-medium">
            Core Submodules Directory
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Submodule: Packages */}
          <div
            onClick={() => onNavigateTab('packages')}
            className="bg-[#0B1014] border border-white/[0.06] hover:border-sunset-coral/60 p-6 rounded-2xl cursor-pointer transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-sunset-coral/10 text-sunset-coral">
                  <MapPin className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-sand-muted group-hover:text-sunset-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-serif-display text-xl text-ivory group-hover:text-white transition-colors">
                Tour Package & Catalog Management
              </h3>
              <p className="text-xs text-sand-muted mt-2 font-light leading-relaxed">
                Create and configure archipelago expeditions, itineraries, inclusions, pricing rules, and capacity limits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-sunset-coral font-medium">
              {packages.length} Packages Configured →
            </div>
          </div>

          {/* Submodule: Bookings */}
          <div
            onClick={() => onNavigateTab('bookings')}
            className="bg-[#0B1014] border border-white/[0.06] hover:border-sunset-coral/60 p-6 rounded-2xl cursor-pointer transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-sunset-coral/10 text-sunset-coral">
                  <UserCheck className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-sand-muted group-hover:text-sunset-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-serif-display text-xl text-ivory group-hover:text-white transition-colors">
                Booking & Passenger Manifest
              </h3>
              <p className="text-xs text-sand-muted mt-2 font-light leading-relaxed">
                Track guest reservations, manage passenger manifests, verify identities, and approve tour slots.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-sunset-coral font-medium">
              {bookings.length} Bookings on Record →
            </div>
          </div>

          {/* Submodule: Itineraries */}
          <div
            onClick={() => onNavigateTab('itineraries')}
            className="bg-[#0B1014] border border-white/[0.06] hover:border-sunset-coral/60 p-6 rounded-2xl cursor-pointer transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-sunset-coral/10 text-sunset-coral">
                  <Calendar className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-sand-muted group-hover:text-sunset-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-serif-display text-xl text-ivory group-hover:text-white transition-colors">
                Tour Scheduling & Guide Dispatch
              </h3>
              <p className="text-xs text-sand-muted mt-2 font-light leading-relaxed">
                Schedule departure dates, assign certified local guides, and monitor daily activity milestone timelines.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-sunset-coral font-medium">
              Live Guide Dispatch →
            </div>
          </div>

          {/* Submodule: Hotel & Transport */}
          <div
            onClick={() => onNavigateTab('reservations')}
            className="bg-[#0B1014] border border-white/[0.06] hover:border-sunset-coral/60 p-6 rounded-2xl cursor-pointer transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-sunset-coral/10 text-sunset-coral">
                  <Hotel className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-sand-muted group-hover:text-sunset-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-serif-display text-xl text-ivory group-hover:text-white transition-colors">
                Hotel & Transport Logistics
              </h3>
              <p className="text-xs text-sand-muted mt-2 font-light leading-relaxed">
                Issue partner hotel vouchers, arrange private coaster vans & speedboats, and manage logistics contacts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-sunset-coral font-medium">
              Vouchers & Vehicles →
            </div>
          </div>

          {/* Submodule: Payments */}
          <div
            onClick={() => onNavigateTab('payments')}
            className="bg-[#0B1014] border border-white/[0.06] hover:border-sunset-coral/60 p-6 rounded-2xl cursor-pointer transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-sunset-coral/10 text-sunset-coral">
                  <CreditCard className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-sand-muted group-hover:text-sunset-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-serif-display text-xl text-ivory group-hover:text-white transition-colors">
                Billing, Invoices & Payments
              </h3>
              <p className="text-xs text-sand-muted mt-2 font-light leading-relaxed">
                Generate official invoices, verify GCash, Maya, and bank transfers, and balance outstanding accounts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-sunset-coral font-medium">
              Ledger & Payments →
            </div>
          </div>

          {/* Submodule: Feedback */}
          <div
            onClick={() => onNavigateTab('feedback')}
            className="bg-[#0B1014] border border-white/[0.06] hover:border-sunset-coral/60 p-6 rounded-2xl cursor-pointer transition-all duration-300 group shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-sunset-coral/10 text-sunset-coral">
                  <Star className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-sand-muted group-hover:text-sunset-coral group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h3 className="font-serif-display text-xl text-ivory group-hover:text-white transition-colors">
                Customer Feedback & CSAT Moderation
              </h3>
              <p className="text-xs text-sand-muted mt-2 font-light leading-relaxed">
                Collect post-tour ratings, calculate Net Promoter Scores, and moderate customer testimonials.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-sunset-coral font-medium">
              {feedbacks.length} Feedback Submissions →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
