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
  Calendar
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
    <div className="space-y-6">
      {/* Overview Welcome Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Operations Control Tower
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight mt-2">
              Tour Operations & Customer Booking System
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Capstone Dashboard monitoring 6 integrated submodules: Package Catalog, Booking Manifest, Itineraries, Hotel/Transport Vouchers, Billing Ledger & Ratings.
            </p>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Revenue Collected</span>
            <div className="text-2xl font-black text-emerald-400">₱{totalRevenue.toLocaleString()}</div>
            <div className="text-[11px] text-slate-400">₱{pendingRevenue.toLocaleString()} pending balance</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Active Customer Bookings</span>
            <div className="text-2xl font-black text-cyan-400">{confirmedBookingsCount} Bookings</div>
            <div className="text-[11px] text-slate-400">{bookings.length} Total Registered</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Published Tour Packages</span>
            <div className="text-2xl font-black text-blue-400">{activePackagesCount} Packages</div>
            <div className="text-[11px] text-slate-400">{packages.length} Total Inventory</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Average CSAT Rating</span>
            <div className="text-2xl font-black text-amber-400 flex items-center gap-1">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div className="text-[11px] text-slate-400">{feedbacks.length} Verified Reviews</div>
          </div>
        </div>
      </div>

      {/* Submodule Quick Access Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => onNavigateTab('packages')}
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <MapPin className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-cyan-300">1. Tour Package Management</h3>
          <p className="text-xs text-slate-400 mt-1">Manage tour packages, pricing per pax, inclusions, and draft publishing.</p>
        </div>

        <div
          onClick={() => onNavigateTab('bookings')}
          className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-blue-300">2. Customer Booking Manifest</h3>
          <p className="text-xs text-slate-400 mt-1">Register passengers, generate reference codes, and track booking status.</p>
        </div>

        <div
          onClick={() => onNavigateTab('itineraries')}
          className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Calendar className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-indigo-300">3. Itinerary & Schedule</h3>
          <p className="text-xs text-slate-400 mt-1">Day-by-day activity timelines, tour guide assignments, and schedule sheets.</p>
        </div>

        <div
          onClick={() => onNavigateTab('reservations')}
          className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Hotel className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-purple-300">4. Hotel & Transport Vouchers</h3>
          <p className="text-xs text-slate-400 mt-1">Hotel room stay vouchers and vehicle/driver dispatch allocations.</p>
        </div>

        <div
          onClick={() => onNavigateTab('payments')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-emerald-300">5. Billing & Invoices</h3>
          <p className="text-xs text-slate-400 mt-1">Record deposits, verify reference numbers, and generate printable PDF invoices.</p>
        </div>

        <div
          onClick={() => onNavigateTab('feedback')}
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl cursor-pointer transition group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300">6. Ratings & Feedback</h3>
          <p className="text-xs text-slate-400 mt-1">Customer CSAT analytics, tour guide evaluations, and written reviews.</p>
        </div>
      </div>

      {/* Recent Bookings Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Recent Booking Registrations</h3>
        <div className="divide-y divide-slate-800/60">
          {bookings.slice(0, 3).map((b) => (
            <div key={b.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono font-bold text-cyan-400">{b.bookingRef}</span>
                <div className="font-semibold text-white">{b.customer.fullName} — {b.tourTitle}</div>
                <div className="text-slate-400 text-[11px]">{b.numPax} Passengers • Travel Date: {b.travelDate}</div>
              </div>

              <div className="text-right">
                <span className="font-bold text-emerald-400 block">₱{b.totalPrice.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 font-medium">{b.bookingStatus}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
