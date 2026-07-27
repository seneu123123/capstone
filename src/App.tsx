import React, { useState, useEffect } from 'react';
import { 
  Booking, 
  CustomerFeedback, 
  HotelReservation, 
  PaymentInvoice, 
  PaymentRecord, 
  SubmoduleTab, 
  TourPackage, 
  TransportReservation, 
  ViewMode 
} from './types';
import { 
  getStoredBookings, 
  getStoredFeedbacks, 
  getStoredPackages, 
  resetAllData, 
  saveBookings, 
  saveFeedbacks, 
  savePackages 
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { CapstoneInfoModal } from './components/CapstoneInfoModal';
import { AdminDashboard } from './components/AdminDashboard';
import { TourPackageManagement } from './components/submodules/TourPackageManagement';
import { CustomerBookingPortal } from './components/submodules/CustomerBookingPortal';
import { ItineraryScheduleManagement } from './components/submodules/ItineraryScheduleManagement';
import { HotelTransportReservation } from './components/submodules/HotelTransportReservation';
import { PaymentInvoiceManagement } from './components/submodules/PaymentInvoiceManagement';
import { CustomerFeedbackRating } from './components/submodules/CustomerFeedbackRating';
import { LaravelIntegrationHub } from './components/submodules/LaravelIntegrationHub';
import { SkeletonLoader } from './components/common/SkeletonLoader';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('customer');
  const [activeTab, setActiveTab] = useState<SubmoduleTab>('packages');
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);
  const [isCapstoneModalOpen, setIsCapstoneModalOpen] = useState<boolean>(false);

  // Persistent State
  const [packages, setPackages] = useState<TourPackage[]>(() => getStoredPackages());
  const [bookings, setBookings] = useState<Booking[]>(() => getStoredBookings());
  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>(() => getStoredFeedbacks());

  const [preSelectedPackage, setPreSelectedPackage] = useState<TourPackage | null>(null);

  useEffect(() => {
    savePackages(packages);
  }, [packages]);

  useEffect(() => {
    saveBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    saveFeedbacks(feedbacks);
  }, [feedbacks]);

  // Handler Submodule 01: Save/Edit Package
  const handleSavePackage = (newPkg: TourPackage) => {
    setPackages((prev) => {
      const idx = prev.findIndex((p) => p.id === newPkg.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = newPkg;
        return updated;
      }
      return [newPkg, ...prev];
    });
  };

  const handleDeletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDuplicatePackage = (pkg: TourPackage) => {
    const duplicated: TourPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
      code: `${pkg.code}-COPY`,
      title: `${pkg.title} (Copy)`
    };
    setPackages((prev) => [duplicated, ...prev]);
  };

  // Handler Submodule 02: Create Booking
  const handleCreateBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (id: string, status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, bookingStatus: status } : b))
    );
  };

  // Handler Submodule 03: Update Guide Assignment
  const handleUpdateGuide = (bookingId: string, guideName: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, assignedGuide: guideName } : b))
    );
  };

  // Handler Submodule 04: Update Hotel & Transport
  const handleUpdateHotelReservation = (bookingId: string, hotel: HotelReservation) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, hotelReservation: hotel } : b))
    );
  };

  const handleUpdateTransportReservation = (bookingId: string, transport: TransportReservation) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, transportReservation: transport } : b))
    );
  };

  // Handler Submodule 05: Add Payment Record
  const handleAddPaymentRecord = (bookingId: string, payment: PaymentRecord) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const newPayments = [...b.invoice.payments, payment];
        const newPaid = newPayments.reduce((sum, p) => sum + p.amount, 0);
        const newBalance = Math.max(0, b.invoice.totalAmount - newPaid);
        const newInvoiceStatus = newBalance === 0 ? 'Paid' : newPaid > 0 ? 'Partial' : 'Unpaid';

        const updatedInvoice: PaymentInvoice = {
          ...b.invoice,
          amountPaid: newPaid,
          balanceDue: newBalance,
          status: newInvoiceStatus as any,
          payments: newPayments
        };

        return {
          ...b,
          paymentStatus: newInvoiceStatus === 'Paid' ? 'Paid' : 'Partial',
          invoice: updatedInvoice
        };
      })
    );
  };

  // Handler Submodule 06: Submit Feedback
  const handleSubmitFeedback = (newFeedback: CustomerFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  // Reset Demo Data
  const handleResetData = () => {
    resetAllData();
    window.location.reload();
  };

  const handleTabChange = (newTab: SubmoduleTab) => {
    if (newTab === activeTab) return;
    setIsTabLoading(true);
    setActiveTab(newTab);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 200);
  };

  const handleSelectBookPackage = (pkg: TourPackage) => {
    setPreSelectedPackage(pkg);
    handleTabChange('bookings');
  };

  const pendingPaymentsCount = bookings.filter((b) => b.invoice.balanceDue > 0).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 flex flex-col">
      {/* Top Navigation */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenCapstoneModal={() => setIsCapstoneModalOpen(true)}
        bookingCount={bookings.length}
        pendingPaymentCount={pendingPaymentsCount}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {isTabLoading ? (
          <div className="space-y-6">
            <SkeletonLoader type="banner" />
            <SkeletonLoader type={activeTab === 'packages' ? 'card' : 'table'} count={3} />
          </div>
        ) : (
          <>
            {/* Overview Tab (Operator Dashboard) */}
            {viewMode === 'operator' && activeTab === 'overview' && (
              <AdminDashboard
                packages={packages}
                bookings={bookings}
                feedbacks={feedbacks}
                onNavigateTab={handleTabChange}
              />
            )}

            {/* Submodule 1: Tour Package Management */}
            {activeTab === 'packages' && (
              <TourPackageManagement
                packages={packages}
                onSavePackage={handleSavePackage}
                onDeletePackage={handleDeletePackage}
                onDuplicatePackage={handleDuplicatePackage}
                isOperatorView={viewMode === 'operator'}
                onSelectBookPackage={handleSelectBookPackage}
              />
            )}

            {/* Submodule 2: Customer Booking and Registration */}
            {activeTab === 'bookings' && (
              <CustomerBookingPortal
                packages={packages}
                bookings={bookings}
                onCreateBooking={handleCreateBooking}
                onUpdateBookingStatus={handleUpdateBookingStatus}
                isOperatorView={viewMode === 'operator'}
                preSelectedPackage={preSelectedPackage}
                onClearPreSelectedPackage={() => setPreSelectedPackage(null)}
              />
            )}

            {/* Submodule 3: Itinerary and Schedule Management */}
            {activeTab === 'itineraries' && (
              <ItineraryScheduleManagement
                packages={packages}
                bookings={bookings}
                onUpdateGuide={handleUpdateGuide}
                isOperatorView={viewMode === 'operator'}
              />
            )}

            {/* Submodule 4: Hotel and Transport Reservation */}
            {activeTab === 'reservations' && (
              <HotelTransportReservation
                bookings={bookings}
                onUpdateHotelReservation={handleUpdateHotelReservation}
                onUpdateTransportReservation={handleUpdateTransportReservation}
                isOperatorView={viewMode === 'operator'}
              />
            )}

            {/* Submodule 5: Payment and Invoice Management */}
            {activeTab === 'payments' && (
              <PaymentInvoiceManagement
                bookings={bookings}
                onAddPaymentRecord={handleAddPaymentRecord}
                isOperatorView={viewMode === 'operator'}
              />
            )}

            {/* Submodule 6: Customer Feedback and Rating System */}
            {activeTab === 'feedback' && (
              <CustomerFeedbackRating
                feedbacks={feedbacks}
                bookings={bookings}
                onSubmitFeedback={handleSubmitFeedback}
                isOperatorView={viewMode === 'operator'}
              />
            )}

            {/* Colleague Integration: Laravel + Sanctum + PostgreSQL Hub */}
            {activeTab === 'laravel_integration' && (
              <LaravelIntegrationHub />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>VoyageCraft Capstone</strong> — Tour Operations and Customer Booking System
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>6/6 Submodules Verified</span>
            <span>•</span>
            <button
              onClick={() => setIsCapstoneModalOpen(true)}
              className="text-cyan-400 hover:underline"
            >
              View System Specs
            </button>
          </div>
        </div>
      </footer>

      {/* Capstone Info Modal */}
      <CapstoneInfoModal
        isOpen={isCapstoneModalOpen}
        onClose={() => setIsCapstoneModalOpen(false)}
        onResetData={handleResetData}
      />
    </div>
  );
}
