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
  ViewMode,
  AppSettings
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
import { CapstoneInfoModal } from './components/CapstoneInfoModal';
import { ClientNavbar } from './components/client/ClientNavbar';
import { ClientPortal } from './components/client/ClientPortal';
import { ClientFooter } from './components/client/ClientFooter';
import { AdminNavbar } from './components/admin/AdminNavbar';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { SkeletonLoader } from './components/common/SkeletonLoader';

const DEFAULT_SETTINGS: AppSettings = {
  agency: {
    companyName: 'Holiday Travelers Travel and Tours Inc',
    shortName: 'Holiday Archipelago',
    accreditationNo: 'DOT-ACCR-RO7-2026-8819',
    tagline: 'Curated Island Expeditions Across the Philippine Seas',
    email: 'bookings@holidaytravelers.ph',
    phone: '+63 (032) 412-8899 / +63 917 888 7766',
    address: 'Suite 402, Holiday Tower, Maxilom Avenue, Cebu City, Philippines',
    currencySymbol: '₱',
    defaultDownpaymentPct: 30
  },
  theme: {
    colorScheme: 'cyan',
    density: 'spacious',
    bgTone: 'slate-950',
    showBorders: true,
    enableAnimations: true
  }
};

export default function App() {
  // Navigation & View Mode State (Check URL param ?view=admin or /admin for isolation)
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('view') === 'admin' || window.location.pathname.includes('/admin')) {
      return 'operator';
    }
    const saved = localStorage.getItem('holiday_view_mode');
    return saved === 'operator' ? 'operator' : 'customer';
  });

  const [adminTab, setAdminTab] = useState<SubmoduleTab>('overview');
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

  // Modals & Client State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isCapstoneModalOpen, setIsCapstoneModalOpen] = useState<boolean>(false);

  const [adminSession, setAdminSession] = useState<{ email: string; role: string } | null>(() => {
    const saved = localStorage.getItem('holiday_admin_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // App Settings Customization
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('holiday_travelers_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('holiday_travelers_settings', JSON.stringify(appSettings));
  }, [appSettings]);

  useEffect(() => {
    localStorage.setItem('holiday_view_mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (adminSession) {
      localStorage.setItem('holiday_admin_session', JSON.stringify(adminSession));
    } else {
      localStorage.removeItem('holiday_admin_session');
    }
  }, [adminSession]);

  // Persistent Data Collections
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

  // CRUD Handlers for Packages
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

  // Booking Operations Handlers
  const handleCreateBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (id: string, status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, bookingStatus: status } : b))
    );
  };

  // Dispatch & Allocations Handlers
  const handleUpdateGuide = (bookingId: string, guideName: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, assignedGuide: guideName } : b))
    );
  };

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

  // Invoices & Payments Handler
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

  // Feedback Handler
  const handleSubmitFeedback = (newFeedback: CustomerFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  // Reset Demo Data
  const handleResetData = () => {
    resetAllData();
    window.location.reload();
  };

  const handleAdminTabChange = (newTab: SubmoduleTab) => {
    if (newTab === adminTab) return;
    setIsTabLoading(true);
    setAdminTab(newTab);
    setTimeout(() => setIsTabLoading(false), 150);
  };

  // Auth Operations
  const handleLoginSuccess = (email: string, role: string) => {
    setAdminSession({ email, role });
    setViewMode('operator');
    setAdminTab('overview');
  };

  const handleLogout = () => {
    setAdminSession(null);
    setViewMode('customer');
  };

  const pendingPaymentsCount = bookings.filter((b) => b.invoice.balanceDue > 0).length;

  return (
    <div className="min-h-screen bg-[#070B0E] text-[#F4F1EA] font-sans antialiased selection:bg-[#F26A4F] selection:text-white flex flex-col">
      {/* ========================================================================= */}
      {/* MODE 1: 100% IMMERSIVE CLIENT WEBSITE (Archipelago Emergent Design)       */}
      {/* ========================================================================= */}
      {viewMode === 'customer' ? (
        <>
          <ClientNavbar
            onOpenBooking={(pkgId) => {
              if (pkgId) {
                const found = packages.find((p) => p.id === pkgId);
                if (found) setPreSelectedPackage(found);
              }
              setIsBookingModalOpen(true);
            }}
            onOpenTracker={() => setIsTrackerOpen(true)}
            onOpenAdminAuth={() => setIsLoginModalOpen(true)}
            isStaffLoggedIn={Boolean(adminSession)}
            onOpenAdminPortal={() => setViewMode('operator')}
          />

          <main className="flex-1 w-full">
            <ClientPortal
              packages={packages}
              bookings={bookings}
              feedbacks={feedbacks}
              onCreateBooking={handleCreateBooking}
              onSubmitFeedback={handleSubmitFeedback}
              preSelectedPackage={preSelectedPackage}
              onSelectBookPackage={(pkg) => setPreSelectedPackage(pkg)}
              onClearPreSelectedPackage={() => setPreSelectedPackage(null)}
              isTrackerOpen={isTrackerOpen}
              onCloseTracker={() => setIsTrackerOpen(false)}
              isBookingModalOpen={isBookingModalOpen}
              onCloseBookingModal={() => setIsBookingModalOpen(false)}
              onOpenBookingModal={(pkg) => {
                if (pkg) setPreSelectedPackage(pkg);
                setIsBookingModalOpen(true);
              }}
            />
          </main>

          <ClientFooter
            onOpenAdminAuth={() => setIsLoginModalOpen(true)}
            onOpenTracker={() => setIsTrackerOpen(true)}
            isStaffLoggedIn={Boolean(adminSession)}
            onOpenAdminPortal={() => setViewMode('operator')}
          />
        </>
      ) : (
        /* ========================================================================= */
        /* MODE 2: ISOLATED ADMIN TOUR OPERATIONS ENTERPRISE PORTAL                  */
        /* ========================================================================= */
        <div className="min-h-screen bg-slate-950 flex flex-col">
          <AdminNavbar
            activeTab={adminTab}
            onTabChange={handleAdminTabChange}
            onOpenCapstoneModal={() => setIsCapstoneModalOpen(true)}
            onLogout={handleLogout}
            bookingCount={bookings.length}
            pendingPaymentCount={pendingPaymentsCount}
            adminEmail={adminSession?.email || 'admin@holidaytravelers.ph'}
            adminRole={adminSession?.role || 'Senior Tour Operations Manager'}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {isTabLoading ? (
              <div className="space-y-6">
                <SkeletonLoader type="banner" />
                <SkeletonLoader type="card" count={3} />
              </div>
            ) : (
              <AdminPortal
                activeTab={adminTab}
                onTabChange={handleAdminTabChange}
                packages={packages}
                bookings={bookings}
                feedbacks={feedbacks}
                appSettings={appSettings}
                onSavePackage={handleSavePackage}
                onDeletePackage={handleDeletePackage}
                onDuplicatePackage={handleDuplicatePackage}
                onUpdateBookingStatus={handleUpdateBookingStatus}
                onUpdateGuide={handleUpdateGuide}
                onUpdateHotelReservation={handleUpdateHotelReservation}
                onUpdateTransportReservation={handleUpdateTransportReservation}
                onAddPaymentRecord={handleAddPaymentRecord}
                onSubmitFeedback={handleSubmitFeedback}
                onUpdateSettings={(newSettings) => setAppSettings(newSettings)}
                onResetSettings={() => setAppSettings(DEFAULT_SETTINGS)}
              />
            )}
          </main>

          <footer className="border-t border-slate-900 bg-slate-950 py-5 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <strong>{appSettings.agency.companyName}</strong> — Operator Command Center ({appSettings.agency.accreditationNo})
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <button
                  onClick={() => setIsCapstoneModalOpen(true)}
                  className="text-cyan-400 hover:underline"
                >
                  System Specs
                </button>
                <span>•</span>
                <button
                  onClick={() => setViewMode('customer')}
                  className="text-sunset-coral hover:underline"
                >
                  Return to Public Website
                </button>
                <span>•</span>
                <button
                  onClick={handleLogout}
                  className="text-rose-400 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Admin Login Modal (Accessible from discreet staff access trigger) */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Capstone Info Modal */}
      <CapstoneInfoModal
        isOpen={isCapstoneModalOpen}
        onClose={() => setIsCapstoneModalOpen(false)}
        onResetData={handleResetData}
      />
    </div>
  );
}
