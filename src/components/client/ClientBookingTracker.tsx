import React, { useState } from 'react';
import { 
  Booking, 
  PaymentRecord 
} from '../../types';
import { 
  Search, 
  FileCheck, 
  Calendar, 
  MapPin, 
  Users, 
  User, 
  CreditCard, 
  Printer, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Hotel, 
  Car, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface ClientBookingTrackerProps {
  bookings: Booking[];
  onNavigateToBook: () => void;
}

export const ClientBookingTracker: React.FC<ClientBookingTrackerProps> = ({
  bookings,
  onNavigateToBook
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
    bookings.length > 0 ? bookings[0] : null
  );

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.bookingRef.toLowerCase().includes(q) ||
      b.customer.fullName.toLowerCase().includes(q) ||
      b.customer.email.toLowerCase().includes(q) ||
      b.tourTitle.toLowerCase().includes(q) ||
      b.destination.toLowerCase().includes(q)
    );
  });

  const handlePrintVoucher = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Self-Service Traveler Portal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Track Booking & Download Tour Voucher
          </h2>
          <p className="text-sm text-slate-300">
            Enter your booking reference code (e.g., <code className="text-cyan-400 font-mono">TT-2026-XXXX</code>) or email address to access your itinerary, tour guide details, and printable hotel/transport vouchers.
          </p>

          {/* Search Box */}
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-950 rounded-2xl border border-slate-700/80 focus-within:border-cyan-500 transition-colors">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reference (e.g. TT-2026-8942), customer name, or email..."
                className="bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none w-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Click Samples */}
          {bookings.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span>Quick sample refs:</span>
              {bookings.slice(0, 3).map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBooking(b);
                    setSearchQuery(b.bookingRef);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono border border-slate-700/60 transition-colors"
                >
                  {b.bookingRef} ({b.customer.fullName.split(' ')[0]})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-900/50 border border-slate-800 rounded-3xl">
          <FileCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Bookings Registered Yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            Ready to explore the islands? Browse our curated tour packages and book your dream trip today.
          </p>
          <button
            onClick={onNavigateToBook}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
          >
            Explore Packages Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Search Results List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                Matching Bookings ({filteredBookings.length})
              </h3>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400 text-sm">
                No bookings matched your search query. Please double check the reference code.
              </div>
            ) : (
              filteredBookings.map((b) => {
                const isSelected = selectedBooking?.id === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                          {b.bookingRef}
                        </span>
                        <h4 className="font-bold text-slate-100 text-sm mt-1.5 line-clamp-1">
                          {b.tourTitle}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        b.bookingStatus === 'Confirmed'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : b.bookingStatus === 'Completed'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {b.bookingStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5 truncate">
                        <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{b.customer.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{b.travelDate}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Voucher & Itinerary Card */}
          <div className="lg:col-span-7">
            {selectedBooking ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                {/* Voucher Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono">OFFICIAL TOUR VOUCHER</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {selectedBooking.bookingStatus}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {selectedBooking.tourTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {selectedBooking.destination}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-cyan-300 font-bold">
                        Ref: {selectedBooking.bookingRef}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintVoucher}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Printer className="w-4 h-4 text-cyan-400" />
                      <span>Print Voucher</span>
                    </button>
                  </div>
                </div>

                {/* Primary Booking Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      Travel Date
                    </div>
                    <div className="text-sm font-bold text-white">{selectedBooking.travelDate}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Confirmed Departure</div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      Party Size
                    </div>
                    <div className="text-sm font-bold text-white">{selectedBooking.numPax} Passengers</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Full Group Included</div>
                  </div>

                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                      Payment Status
                    </div>
                    <div className="text-sm font-bold text-emerald-400">
                      ₱{selectedBooking.invoice.amountPaid.toLocaleString()} Paid
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {selectedBooking.invoice.balanceDue > 0
                        ? `Balance: ₱${selectedBooking.invoice.balanceDue.toLocaleString()}`
                        : 'Fully Settled'}
                    </div>
                  </div>
                </div>

                {/* Lead Traveler & Contact */}
                <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    Lead Passenger & Contact Info
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Name:</span>
                      <span className="font-bold text-white text-sm">{selectedBooking.customer.fullName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Nationality:</span>
                      <span className="font-medium text-slate-200">{selectedBooking.customer.nationality || 'Filipino'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300">{selectedBooking.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300">{selectedBooking.customer.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Hotel & Transport Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Hotel className="w-4 h-4 text-cyan-400" />
                        Hotel Accommodation
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                        {selectedBooking.hotelReservation?.status || 'Assigned'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      {selectedBooking.hotelReservation?.hotelName || 'Partner Beachfront Resort'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Room: {selectedBooking.hotelReservation?.roomType || 'Standard Deluxe Room'}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">
                      Voucher Code: {selectedBooking.hotelReservation?.voucherCode || 'HTL-PENDING'}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Car className="w-4 h-4 text-blue-400" />
                        Vehicle & Transport
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                        {selectedBooking.transportReservation?.status || 'Scheduled'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      {selectedBooking.transportReservation?.vehicleType || '14-Seater Tourist Van'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Driver: {selectedBooking.transportReservation?.driverName || 'Assigned Operator Guide'} ({selectedBooking.transportReservation?.plateNumber || 'TTR-2026'})
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      Pickup: {selectedBooking.transportReservation?.pickupLocation || 'Airport / Hotel Lobby'}
                    </div>
                  </div>
                </div>

                {/* Assigned Tour Guide */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-950 to-blue-950/40 border border-cyan-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                      TG
                    </div>
                    <div>
                      <div className="text-xs text-cyan-400 font-semibold">Assigned Tour Leader / Guide</div>
                      <div className="text-sm font-bold text-white">
                        {selectedBooking.assignedGuide || 'Licensed DOT Tour Guide (Briefing at Hotel)'}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800">
                    Active on Trip
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl text-slate-400">
                Select a booking to view its details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
