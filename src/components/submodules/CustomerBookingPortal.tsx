import React, { useState } from 'react';
import { Booking, Customer, Passenger, TourPackage, HotelReservation, TransportReservation, PaymentInvoice } from '../../types';
import { ImageWithLoader } from '../common/ImageWithLoader';
import { 
  UserCheck, 
  Calendar, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  Luggage, 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  X, 
  Download, 
  Printer, 
  Sparkles,
  Phone,
  Mail,
  User,
  ArrowRight,
  Compass,
  ArrowUpRight,
  Check
} from 'lucide-react';

interface CustomerBookingPortalProps {
  packages: TourPackage[];
  bookings: Booking[];
  onCreateBooking: (booking: Booking) => void;
  onUpdateBookingStatus: (id: string, status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => void;
  isOperatorView: boolean;
  preSelectedPackage?: TourPackage | null;
  onClearPreSelectedPackage?: () => void;
}

export const CustomerBookingPortal: React.FC<CustomerBookingPortalProps> = ({
  packages,
  bookings,
  onCreateBooking,
  onUpdateBookingStatus,
  isOperatorView,
  preSelectedPackage,
  onClearPreSelectedPackage
}) => {
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(preSelectedPackage || null);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookingFilterRef, setBookingFilterRef] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');

  // Booking Form State
  const [travelDate, setTravelDate] = useState<string>('2026-08-20');
  const [numPax, setNumPax] = useState<number>(2);
  const [paymentOption, setPaymentOption] = useState<'full' | 'deposit'>('deposit');
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'PayMaya' | 'Credit Card' | 'Bank Transfer'>('GCash');

  // Customer Contact State
  const [customerInfo, setCustomerInfo] = useState<Customer>({
    fullName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    nationality: 'Filipino'
  });

  // Passengers State
  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: 'p1', fullName: '', age: 28, gender: 'Female', passportOrId: '', specialRequirements: '' },
    { id: 'p2', fullName: '', age: 30, gender: 'Male', passportOrId: '', specialRequirements: '' }
  ]);

  const [specialInstructions, setSpecialInstructions] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  React.useEffect(() => {
    if (preSelectedPackage) {
      setSelectedPackage(preSelectedPackage);
      setBookingStep(1);
    }
  }, [preSelectedPackage]);

  const handlePaxCountChange = (count: number) => {
    setNumPax(count);
    const newPassengers: Passenger[] = [];
    for (let i = 0; i < count; i++) {
      if (passengers[i]) {
        newPassengers.push(passengers[i]);
      } else {
        newPassengers.push({
          id: `p-${i + 1}`,
          fullName: i === 0 ? customerInfo.fullName : '',
          age: 25,
          gender: 'Female',
          passportOrId: '',
          specialRequirements: ''
        });
      }
    }
    setPassengers(newPassengers);
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.phone) {
      return;
    }

    const refCode = `TT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalPrice = (selectedPackage.pricePerPax || 0) * numPax;
    const depositRequired = Math.round(totalPrice * 0.5);
    const paidAmount = paymentOption === 'full' ? totalPrice : depositRequired;
    const balanceDue = totalPrice - paidAmount;
    const nowStr = new Date().toISOString().split('T')[0];

    // Default Hotel & Transport Reservations
    const initialHotel: HotelReservation = {
      id: `htl-${Date.now()}`,
      hotelName: `Partner Eco-Resort (${selectedPackage.destination})`,
      roomType: numPax > 2 ? 'Family Lagoon Suite' : 'Deluxe Ocean View Villa',
      checkInDate: travelDate,
      checkOutDate: travelDate,
      nights: selectedPackage.durationNights,
      voucherCode: `HTL-VOUCH-${refCode.split('-')[2]}`,
      status: 'Confirmed',
      contactPhone: '+63 917 800 2000',
      notes: 'Check-in welcome drink provided'
    };

    const initialTransport: TransportReservation = {
      id: `trp-${Date.now()}`,
      vehicleType: '14-Seater Air-Conditioned Coaster Van',
      driverName: 'Kuya Ronald Mendoza',
      driverContact: '+63 918 777 4433',
      plateNumber: 'TTR-2026',
      pickupLocation: 'Airport Arrival Terminal',
      dropoffLocation: 'Resort Lobby / Wharf',
      pickupTime: '09:00 AM',
      status: 'Scheduled',
      notes: 'Driver will meet guests at arrival exit'
    };

    const initialInvoice: PaymentInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${refCode.split('-')[2]}`,
      issueDate: nowStr,
      dueDate: travelDate,
      totalAmount: totalPrice,
      amountPaid: paidAmount,
      balanceDue: balanceDue,
      status: balanceDue === 0 ? 'Paid' : 'Partial',
      items: [
        {
          description: `${selectedPackage.title} (${numPax} Passengers)`,
          quantity: numPax,
          unitPrice: selectedPackage.pricePerPax,
          totalPrice: totalPrice
        }
      ],
      payments: [
        {
          id: `pmt-${Date.now()}`,
          date: nowStr,
          amount: paidAmount,
          method: paymentMethod,
          referenceNo: `${paymentMethod.substring(0, 2).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'Verified',
          notes: paymentOption === 'full' ? 'Full Payment' : '50% Confirmation Deposit'
        }
      ]
    };

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingRef: refCode,
      tourPackageId: selectedPackage.id,
      tourTitle: selectedPackage.title,
      destination: selectedPackage.destination,
      customer: customerInfo,
      passengers: passengers,
      travelDate: travelDate,
      numPax: numPax,
      totalPrice: totalPrice,
      depositRequired: depositRequired,
      bookingStatus: 'Confirmed',
      paymentStatus: balanceDue === 0 ? 'Paid' : 'Partial',
      createdAt: nowStr,
      assignedGuide: 'Designated Local Island Guide',
      hotelReservation: initialHotel,
      transportReservation: initialTransport,
      invoice: initialInvoice,
      specialInstructions: specialInstructions
    };

    onCreateBooking(newBooking);
    setConfirmedBooking(newBooking);
    setBookingStep(4);
  };

  const filteredBookingsList = bookings.filter((b) => {
    const matchesRef = 
      b.bookingRef.toLowerCase().includes(bookingFilterRef.toLowerCase()) ||
      b.customer.fullName.toLowerCase().includes(bookingFilterRef.toLowerCase()) ||
      b.tourTitle.toLowerCase().includes(bookingFilterRef.toLowerCase());
    const matchesStatus = bookingStatusFilter === 'All' || b.bookingStatus === bookingStatusFilter;
    return matchesRef && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0B1014] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sunset-coral text-xs font-sans-body tracking-[0.25em] uppercase font-medium">
              <UserCheck className="w-4 h-4" />
              <span>Booking & Passenger Manifest</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-ivory tracking-wide">
              Booking & Passenger Manifest Management
            </h1>
            <p className="text-xs sm:text-sm text-sand-muted max-w-2xl font-light leading-relaxed">
              Book Philippine archipelago expeditions, register passenger manifests with Coast Guard / DOT details, and issue certified booking references.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedPackage(packages[0] || null);
                setBookingStep(1);
                if (onClearPreSelectedPackage) onClearPreSelectedPackage();
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-sunset-coral hover:bg-[#D95339] text-white font-medium text-xs rounded-full shadow-lg shadow-sunset-coral/20 transition tracking-wider"
            >
              <Plus className="w-4 h-4" />
              <span>New Expedition Booking</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booking Wizard Section */}
      {selectedPackage && (
        <div className="bg-[#0B1014] border border-sunset-coral/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <button
            onClick={() => {
              setSelectedPackage(null);
              if (onClearPreSelectedPackage) onClearPreSelectedPackage();
            }}
            className="absolute top-4 right-4 text-sand-muted hover:text-ivory p-2 rounded-full hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Wizard Step Bar */}
          <div className="flex items-center justify-between mb-8 max-w-xl mx-auto text-xs font-sans-body">
            <div className={`flex items-center gap-2 ${bookingStep >= 1 ? 'text-sunset-coral font-medium' : 'text-sand-muted'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${bookingStep >= 1 ? 'bg-sunset-coral text-white' : 'bg-white/5'}`}>1</span>
              <span>Tour & Dates</span>
            </div>
            <div className="h-0.5 w-8 bg-white/10" />
            <div className={`flex items-center gap-2 ${bookingStep >= 2 ? 'text-sunset-coral font-medium' : 'text-sand-muted'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${bookingStep >= 2 ? 'bg-sunset-coral text-white' : 'bg-white/5'}`}>2</span>
              <span>Passengers</span>
            </div>
            <div className="h-0.5 w-8 bg-white/10" />
            <div className={`flex items-center gap-2 ${bookingStep >= 3 ? 'text-sunset-coral font-medium' : 'text-sand-muted'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${bookingStep >= 3 ? 'bg-sunset-coral text-white' : 'bg-white/5'}`}>3</span>
              <span>Payment</span>
            </div>
          </div>

          {/* Step 1: Package & Schedule Selection */}
          {bookingStep === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-[#070B0E] p-4 rounded-xl border border-white/[0.06] flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-black/40">
                  <ImageWithLoader src={selectedPackage.bannerUrl} alt={selectedPackage.title} aspectRatio="h-20 w-20" />
                </div>
                <div>
                  <span className="text-[10px] text-sunset-coral font-semibold uppercase tracking-wider">{selectedPackage.category}</span>
                  <h3 className="font-serif-display text-xl text-ivory">{selectedPackage.title}</h3>
                  <p className="text-xs text-sand-muted font-light">{selectedPackage.destination}</p>
                  <p className="text-xs text-sunset-coral font-mono font-bold mt-1">₱{selectedPackage.pricePerPax.toLocaleString()} / passenger</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-sans-body uppercase tracking-wider text-sand-muted block mb-1.5">Travel Departure Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-[#070B0E] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-ivory focus:outline-none focus:border-sunset-coral"
                  />
                </div>

                <div>
                  <label className="text-xs font-sans-body uppercase tracking-wider text-sand-muted block mb-1.5">Number of Passengers (Pax)</label>
                  <select
                    value={numPax}
                    onChange={(e) => handlePaxCountChange(Number(e.target.value))}
                    className="w-full bg-[#070B0E] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-ivory focus:outline-none focus:border-sunset-coral"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((n) => (
                      <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="bg-gradient-to-r from-[#0C1217] via-[#0E151C] to-[#0C1217] p-6 rounded-2xl border border-sunset-coral/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-sans-body uppercase tracking-[0.2em] text-sunset-coral font-medium">Total Expedition Investment</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-sunset-coral/15 text-sunset-coral font-mono">All Fees & Inclusions</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif-display text-3xl sm:text-4xl text-ivory font-normal">
                      ₱{(selectedPackage.pricePerPax * numPax).toLocaleString()}
                    </span>
                    <span className="text-xs text-sand-muted font-light">
                      (₱{selectedPackage.pricePerPax.toLocaleString()} × {numPax} {numPax > 1 ? 'passengers' : 'passenger'})
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setBookingStep(2)}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 bg-sunset-coral hover:bg-[#ff765b] text-white px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase shadow-xl shadow-sunset-coral/30 hover:shadow-sunset-coral/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/10"
                >
                  <span>Continue to Manifest</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Passenger Manifest Registration */}
          {bookingStep === 2 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <h3 className="font-serif-display text-2xl text-ivory border-b border-white/[0.06] pb-3">
                Lead Contact & Passenger Manifest ({numPax} Pax)
              </h3>

              {/* Lead Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#070B0E] p-5 rounded-xl border border-white/[0.06]">
                <div className="sm:col-span-2">
                  <label className="text-xs font-sans-body uppercase tracking-wider text-sand-muted block mb-1">Lead Passenger Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Maria Santos"
                    required
                    value={customerInfo.fullName}
                    onChange={(e) => {
                      setCustomerInfo({ ...customerInfo, fullName: e.target.value });
                      handlePassengerChange(0, 'fullName', e.target.value);
                    }}
                    className="w-full bg-[#0B1014] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-ivory focus:outline-none focus:border-sunset-coral"
                  />
                </div>
                <div>
                  <label className="text-xs font-sans-body uppercase tracking-wider text-sand-muted block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="maria.santos@gmail.com"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full bg-[#0B1014] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-ivory focus:outline-none focus:border-sunset-coral"
                  />
                </div>
                <div>
                  <label className="text-xs font-sans-body uppercase tracking-wider text-sand-muted block mb-1">Mobile Contact No.</label>
                  <input
                    type="text"
                    placeholder="+63 917 555 0192"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-[#0B1014] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-ivory focus:outline-none focus:border-sunset-coral"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-sans-body uppercase tracking-wider text-sand-muted block mb-1">Emergency Contact Person & Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. Roberto Santos (+63 918 222 9011)"
                    value={customerInfo.emergencyContact}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, emergencyContact: e.target.value })}
                    className="w-full bg-[#0B1014] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-ivory focus:outline-none focus:border-sunset-coral"
                  />
                </div>
              </div>

              {/* Additional Passengers */}
              <div className="space-y-4">
                <span className="text-xs font-sans-body uppercase tracking-wider text-sand-muted block">Passenger Manifest Details</span>
                {passengers.map((p, idx) => (
                  <div key={p.id} className="p-4 bg-[#070B0E] border border-white/[0.06] rounded-xl space-y-3">
                    <span className="text-xs font-mono text-sunset-coral font-bold block">Passenger #{idx + 1}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Legal Name"
                          value={p.fullName}
                          onChange={(e) => handlePassengerChange(idx, 'fullName', e.target.value)}
                          className="w-full bg-[#0B1014] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-ivory"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Passport / Valid ID No."
                          value={p.passportOrId}
                          onChange={(e) => handlePassengerChange(idx, 'passportOrId', e.target.value)}
                          className="w-full bg-[#0B1014] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-ivory font-mono"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Dietary or Special Requests"
                          value={p.specialRequirements || ''}
                          onChange={(e) => handlePassengerChange(idx, 'specialRequirements', e.target.value)}
                          className="w-full bg-[#0B1014] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-ivory"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => setBookingStep(1)}
                  className="px-5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-sand-muted hover:text-ivory text-xs rounded-full transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setBookingStep(3)}
                  className="group inline-flex items-center justify-center gap-2 bg-sunset-coral hover:bg-[#ff765b] text-white px-7 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase shadow-xl shadow-sunset-coral/30 hover:shadow-sunset-coral/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/10"
                >
                  <span>Proceed to Payment</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Option & Simulator */}
          {bookingStep === 3 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6 max-w-2xl mx-auto">
              <div className="border-b border-white/[0.06] pb-3 flex items-center justify-between">
                <h3 className="font-serif-display text-2xl text-ivory">
                  Payment Option & Gateway Selection
                </h3>
                <span className="text-xs font-mono text-sunset-coral font-semibold">Step 3 of 3</span>
              </div>

              {/* Enhanced Interactive Payment Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentOption('deposit')}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative ${
                    paymentOption === 'deposit'
                      ? 'bg-gradient-to-b from-sunset-coral/15 to-sunset-coral/5 border-sunset-coral shadow-lg shadow-sunset-coral/10'
                      : 'bg-[#0B1014] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-sans-body uppercase tracking-[0.2em] text-sunset-coral font-medium">50% Downpayment Deposit</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      paymentOption === 'deposit' ? 'border-sunset-coral bg-sunset-coral text-white' : 'border-white/20'
                    }`}>
                      {paymentOption === 'deposit' && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="font-serif-display text-3xl text-ivory font-normal block">
                      ₱{Math.round((selectedPackage.pricePerPax * numPax) * 0.5).toLocaleString()}
                    </span>
                    <p className="text-[11px] text-sand-muted font-light leading-relaxed">
                      Secures and guarantees tour slot. Settle remainder ₱{Math.round((selectedPackage.pricePerPax * numPax) * 0.5).toLocaleString()} upon arrival.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentOption('full')}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative ${
                    paymentOption === 'full'
                      ? 'bg-gradient-to-b from-sunset-coral/15 to-sunset-coral/5 border-sunset-coral shadow-lg shadow-sunset-coral/10'
                      : 'bg-[#0B1014] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-sans-body uppercase tracking-[0.2em] text-sunset-coral font-medium">100% Full Payment</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      paymentOption === 'full' ? 'border-sunset-coral bg-sunset-coral text-white' : 'border-white/20'
                    }`}>
                      {paymentOption === 'full' && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="font-serif-display text-3xl text-ivory font-normal block">
                      ₱{(selectedPackage.pricePerPax * numPax).toLocaleString()}
                    </span>
                    <p className="text-[11px] text-sand-muted font-light leading-relaxed">
                      Zero balance upon departure. Instant priority automated voucher and e-ticket dispatch.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-sans-body uppercase tracking-[0.2em] text-sand-muted block mb-3">Select Authorized Payment Channel</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['GCash', 'PayMaya', 'Credit Card', 'Bank Transfer'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 rounded-xl border text-xs tracking-wider transition-all duration-200 font-medium ${
                        paymentMethod === method
                          ? 'bg-sunset-coral text-white border-sunset-coral shadow-md shadow-sunset-coral/20'
                          : 'bg-[#0B1014] border-white/[0.08] text-sand-muted hover:text-ivory hover:border-white/20'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-sans-body uppercase tracking-[0.2em] text-sand-muted block mb-2">Special Tour Inquiries & Requests</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Airport signage name, vegetarian diet, diving gear size..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-[#0B1014] border border-white/[0.08] rounded-xl p-3.5 text-xs text-ivory placeholder-sand-muted/50 focus:outline-none focus:border-sunset-coral"
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setBookingStep(2)}
                  className="px-5 py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-sand-muted hover:text-ivory text-xs rounded-full transition"
                >
                  ← Back to Manifest
                </button>
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 bg-sunset-coral hover:bg-[#ff765b] text-white px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase shadow-2xl shadow-sunset-coral/30 hover:shadow-sunset-coral/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border border-white/10"
                >
                  <span>Confirm & Secure Reservation</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success & Reference Code Generation */}
          {bookingStep === 4 && confirmedBooking && (
            <div className="space-y-6 max-w-xl mx-auto text-center py-4">
              <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/40 rounded-full text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-sans-body uppercase tracking-[0.25em] text-sunset-coral font-medium">
                  Confirmed Booking Reference
                </span>
                <h2 className="font-serif-display text-4xl text-ivory tracking-wider mt-2">
                  {confirmedBooking.bookingRef}
                </h2>
                <p className="text-xs text-sand-muted mt-2 font-light">
                  Expedition booking recorded in operations system. E-tickets and invoice have been dispatched.
                </p>
              </div>

              <div className="bg-[#070B0E] p-5 rounded-xl border border-white/[0.06] text-left text-xs space-y-2.5 font-light">
                <div className="flex justify-between">
                  <span className="text-sand-muted">Lead Guest:</span>
                  <span className="text-ivory font-normal">{confirmedBooking.customer.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-muted">Tour Expedition:</span>
                  <span className="text-sunset-coral">{confirmedBooking.tourTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-muted">Departure Date:</span>
                  <span className="text-ivory">{confirmedBooking.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-muted">Manifest Count:</span>
                  <span className="text-ivory">{confirmedBooking.numPax} Passengers</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-sand-muted">Paid ({confirmedBooking.invoice.payments[0]?.method}):</span>
                  <span className="text-emerald-400 font-mono font-bold">₱{confirmedBooking.invoice.amountPaid.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedPackage(null);
                    setConfirmedBooking(null);
                  }}
                  className="px-6 py-2.5 bg-sunset-coral hover:bg-[#D95339] text-white text-xs font-medium tracking-wider rounded-full transition shadow-lg shadow-sunset-coral/20"
                >
                  Done & Back to Registry
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bookings Management / Customer Lookup Table */}
      <div className="bg-[#0B1014] border border-white/[0.06] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-sans-body uppercase tracking-[0.2em] text-sunset-coral font-medium">
              Registered Expeditions
            </span>
            <h2 className="font-serif-display text-2xl text-ivory">
              Customer Bookings & Passenger Manifest ({filteredBookingsList.length})
            </h2>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-sand-muted" />
              <input
                type="text"
                placeholder="Search reference, guest name..."
                value={bookingFilterRef}
                onChange={(e) => setBookingFilterRef(e.target.value)}
                className="w-full bg-[#070B0E] border border-white/[0.08] rounded-full pl-9 pr-3 py-1.5 text-xs text-ivory placeholder-sand-muted/50 focus:outline-none focus:border-sunset-coral"
              />
            </div>

            <select
              value={bookingStatusFilter}
              onChange={(e) => setBookingStatusFilter(e.target.value)}
              className="bg-[#070B0E] border border-white/[0.08] rounded-full px-3 py-1.5 text-xs text-sand-muted focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070B0E] text-sand-muted text-[10px] uppercase font-sans-body tracking-wider border-b border-white/[0.06]">
              <tr>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Lead Guest</th>
                <th className="py-3.5 px-4">Expedition Package</th>
                <th className="py-3.5 px-4">Travel Date</th>
                <th className="py-3.5 px-4">Pax</th>
                <th className="py-3.5 px-4">Total / Paid</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Operations Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-sand-muted">
              {filteredBookingsList.map((b) => (
                <tr key={b.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 px-4 font-mono font-bold text-sunset-coral">
                    {b.bookingRef}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-ivory font-medium">{b.customer.fullName}</div>
                    <div className="text-[11px] text-sand-muted font-light">{b.customer.phone}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-ivory font-light">{b.tourTitle}</div>
                    <div className="text-[11px] text-sand-muted">{b.destination}</div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-ivory font-mono">
                    {b.travelDate}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] text-ivory border border-white/10 font-mono text-[11px]">
                      {b.numPax} Pax
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-serif-display text-base text-ivory">₱{b.totalPrice.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-400 font-mono">
                      Paid: ₱{b.invoice.amountPaid.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      b.bookingStatus === 'Confirmed' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' :
                      b.bookingStatus === 'Completed' ? 'bg-blue-950/80 text-blue-300 border border-blue-500/30' :
                      b.bookingStatus === 'Pending' ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30' :
                      'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                    }`}>
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {isOperatorView && (
                      <select
                        value={b.bookingStatus}
                        onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                        className="bg-[#070B0E] border border-white/[0.08] rounded-lg px-2.5 py-1 text-xs text-sand-muted focus:outline-none focus:border-sunset-coral"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookingsList.length === 0 && (
            <div className="text-center py-12 text-sand-muted text-xs font-light">
              No registered bookings match your search query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
