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
  User
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
      alert('Please complete the primary contact information.');
      return;
    }

    const refCode = `TT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalPrice = selectedPackage.pricePerPax * numPax;
    const depositRequired = Math.round(totalPrice * 0.5);
    const paidAmount = paymentOption === 'full' ? totalPrice : depositRequired;
    const balanceDue = totalPrice - paidAmount;
    const nowStr = new Date().toISOString().split('T')[0];

    // Default Hotel & Transport Reservations (Auto Provisioned by Operations)
    const initialHotel: HotelReservation = {
      id: `htl-${Date.now()}`,
      hotelName: `Partner Beachfront Resort (${selectedPackage.destination})`,
      roomType: numPax > 2 ? 'Family Suite' : 'Deluxe Ocean View Room',
      checkInDate: travelDate,
      checkOutDate: travelDate, // placeholder, adjusted by days
      nights: selectedPackage.durationNights,
      voucherCode: `HTL-VOUCH-${refCode.split('-')[2]}`,
      status: 'Confirmed',
      contactPhone: '+63 917 800 2000',
      notes: 'Standard check-in at 2:00 PM'
    };

    const initialTransport: TransportReservation = {
      id: `trp-${Date.now()}`,
      vehicleType: '14-Seater Tourist Coaster Van',
      driverName: 'Assigned Operator Driver',
      driverContact: '+63 918 777 4433',
      plateNumber: 'TTR-2026',
      pickupLocation: 'Airport Arrival Terminal',
      dropoffLocation: 'Hotel Lobby',
      pickupTime: '09:00 AM',
      status: 'Scheduled',
      notes: 'Driver will meet guests at arrival gate'
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
      assignedGuide: 'Tour Guide Assigned upon Arrival',
      hotelReservation: initialHotel,
      transportReservation: initialTransport,
      invoice: initialInvoice,
      specialInstructions: specialInstructions
    };

    onCreateBooking(newBooking);
    setConfirmedBooking(newBooking);
    setBookingStep(4); // Success step
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
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <UserCheck className="w-4 h-4" />
              <span>Submodule 02</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Customer Booking & Registration
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Book tour packages, register passenger manifest details, generate instant reference codes, and manage customer bookings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isOperatorView && (
              <button
                onClick={() => {
                  setSelectedPackage(packages[0] || null);
                  setBookingStep(1);
                  if (onClearPreSelectedPackage) onClearPreSelectedPackage();
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
              >
                <Plus className="w-4 h-4" />
                <span>New Tour Booking</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Booking Wizard Section */}
      {selectedPackage && (
        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative">
          <button
            onClick={() => {
              setSelectedPackage(null);
              if (onClearPreSelectedPackage) onClearPreSelectedPackage();
            }}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Wizard Step Bar */}
          <div className="flex items-center justify-between mb-8 max-w-xl mx-auto text-xs">
            <div className={`flex items-center gap-2 ${bookingStep >= 1 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${bookingStep >= 1 ? 'bg-cyan-500 text-slate-950 font-extrabold' : 'bg-slate-800'}`}>1</span>
              <span>Tour & Dates</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-800" />
            <div className={`flex items-center gap-2 ${bookingStep >= 2 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${bookingStep >= 2 ? 'bg-cyan-500 text-slate-950 font-extrabold' : 'bg-slate-800'}`}>2</span>
              <span>Passengers</span>
            </div>
            <div className="h-0.5 w-8 bg-slate-800" />
            <div className={`flex items-center gap-2 ${bookingStep >= 3 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${bookingStep >= 3 ? 'bg-cyan-500 text-slate-950 font-extrabold' : 'bg-slate-800'}`}>3</span>
              <span>Payment</span>
            </div>
          </div>

          {/* Step 1: Package & Schedule Selection */}
          {bookingStep === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <ImageWithLoader src={selectedPackage.bannerUrl} alt={selectedPackage.title} aspectRatio="h-20 w-20" />
                </div>
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">{selectedPackage.category}</span>
                  <h3 className="text-base font-bold text-white">{selectedPackage.title}</h3>
                  <p className="text-xs text-slate-300">{selectedPackage.destination}</p>
                  <p className="text-xs text-cyan-400 font-bold mt-1">₱{selectedPackage.pricePerPax.toLocaleString()} / passenger</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Travel Departure Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Number of Passengers (Pax)</label>
                  <select
                    value={numPax}
                    onChange={(e) => handlePaxCountChange(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((n) => (
                      <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Total Package Cost</span>
                  <span className="text-xl font-black text-cyan-400">
                    ₱{(selectedPackage.pricePerPax * numPax).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setBookingStep(2)}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
                >
                  Continue to Passengers Manifest →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Passenger Manifest Registration */}
          {bookingStep === 2 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                Primary Contact & Passenger Manifest ({numPax} Pax)
              </h3>

              {/* Lead Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-slate-300 block mb-1">Lead Passenger Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Maria Santos"
                    required
                    value={customerInfo.fullName}
                    onChange={(e) => {
                      setCustomerInfo({ ...customerInfo, fullName: e.target.value });
                      handlePassengerChange(0, 'fullName', e.target.value);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="maria.santos@gmail.com"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Mobile Contact No.</label>
                  <input
                    type="text"
                    placeholder="+63 917 555 0192"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-slate-300 block mb-1">Emergency Contact Person & Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. Roberto Santos (+63 918 222 9011)"
                    value={customerInfo.emergencyContact}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, emergencyContact: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Additional Passengers */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Passenger Manifest Details</h4>
                {passengers.map((p, idx) => (
                  <div key={p.id} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <span className="text-[11px] font-bold text-cyan-400 block">Passenger #{idx + 1}</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={p.fullName}
                          onChange={(e) => handlePassengerChange(idx, 'fullName', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Passport / ID No."
                          value={p.passportOrId}
                          onChange={(e) => handlePassengerChange(idx, 'passportOrId', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Special Requests (e.g. Vegetarian, Senior)"
                          value={p.specialRequirements || ''}
                          onChange={(e) => handlePassengerChange(idx, 'specialRequirements', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setBookingStep(1)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setBookingStep(3)}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20"
                >
                  Proceed to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Option & Simulator */}
          {bookingStep === 3 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6 max-w-2xl mx-auto">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                Select Payment Method & Option
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentOption('deposit')}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    paymentOption === 'deposit'
                      ? 'bg-cyan-500/10 border-cyan-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-bold text-cyan-400 block mb-1">50% Downpayment Deposit</span>
                  <span className="text-lg font-extrabold text-white">
                    ₱{Math.round((selectedPackage.pricePerPax * numPax) * 0.5).toLocaleString()}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">Reserve tour slots. Remaining balance due on departure date.</p>
                </div>

                <div
                  onClick={() => setPaymentOption('full')}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    paymentOption === 'full'
                      ? 'bg-cyan-500/10 border-cyan-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-xs font-bold text-cyan-400 block mb-1">100% Full Payment</span>
                  <span className="text-lg font-extrabold text-white">
                    ₱{(selectedPackage.pricePerPax * numPax).toLocaleString()}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">Instant priority booking confirmation with zero balance due.</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Payment Channel</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['GCash', 'PayMaya', 'Credit Card', 'Bank Transfer'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 rounded-xl border text-xs font-bold transition ${
                        paymentMethod === method
                          ? 'bg-blue-600 text-white border-blue-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Special Requests / Tour Instructions</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Airport pickup signage name, dietary restrictions, wheelchair access..."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setBookingStep(2)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Confirm & Generate Booking Reference ✓
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success & Reference Code Generation */}
          {bookingStep === 4 && confirmedBooking && (
            <div className="space-y-6 max-w-xl mx-auto text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                  Booking Reference Code
                </span>
                <h2 className="text-3xl font-black text-white tracking-widest mt-2">
                  {confirmedBooking.bookingRef}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tour booking registered successfully! An official confirmation receipt and invoice have been generated.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Lead Passenger:</span>
                  <span className="font-bold text-white">{confirmedBooking.customer.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tour Package:</span>
                  <span className="font-bold text-cyan-400">{confirmedBooking.tourTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Travel Date:</span>
                  <span className="font-bold text-white">{confirmedBooking.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Pax:</span>
                  <span className="font-bold text-white">{confirmedBooking.numPax} Passengers</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Amount Paid ({confirmedBooking.invoice.payments[0]?.method}):</span>
                  <span className="font-bold text-emerald-400">₱{confirmedBooking.invoice.amountPaid.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedPackage(null);
                    setConfirmedBooking(null);
                  }}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl"
                >
                  Done & Back to Bookings List
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bookings Management / Customer Lookup Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Luggage className="w-5 h-5 text-cyan-400" />
            <span>Customer Bookings Registry ({filteredBookingsList.length})</span>
          </h2>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search reference, customer name, tour..."
                value={bookingFilterRef}
                onChange={(e) => setBookingFilterRef(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={bookingStatusFilter}
              onChange={(e) => setBookingStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
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
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Reference</th>
                <th className="p-3.5">Lead Customer</th>
                <th className="p-3.5">Tour Package</th>
                <th className="p-3.5">Travel Date</th>
                <th className="p-3.5">Pax</th>
                <th className="p-3.5">Total / Paid</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBookingsList.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-mono font-bold text-cyan-400">
                    {b.bookingRef}
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-white">{b.customer.fullName}</div>
                    <div className="text-[11px] text-slate-400">{b.customer.phone}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-200">{b.tourTitle}</div>
                    <div className="text-[11px] text-slate-400">{b.destination}</div>
                  </td>
                  <td className="p-3.5 whitespace-nowrap text-slate-200 font-medium">
                    {b.travelDate}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {b.numPax} Pax
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-white">₱{b.totalPrice.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      Paid: ₱{b.invoice.amountPaid.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                      b.bookingStatus === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      b.bookingStatus === 'Completed' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      b.bookingStatus === 'Pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {isOperatorView && (
                      <select
                        value={b.bookingStatus}
                        onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300"
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
            <div className="text-center py-8 text-slate-500 text-xs">
              No customer bookings found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
