import React from 'react';
import { 
  Booking, 
  CustomerFeedback, 
  HotelReservation, 
  PaymentRecord, 
  SubmoduleTab, 
  TourPackage, 
  TransportReservation,
  AppSettings
} from '../../types';
import { AdminDashboard } from '../AdminDashboard';
import { TourPackageManagement } from '../submodules/TourPackageManagement';
import { CustomerBookingPortal } from '../submodules/CustomerBookingPortal';
import { ItineraryScheduleManagement } from '../submodules/ItineraryScheduleManagement';
import { HotelTransportReservation } from '../submodules/HotelTransportReservation';
import { PaymentInvoiceManagement } from '../submodules/PaymentInvoiceManagement';
import { CustomerFeedbackRating } from '../submodules/CustomerFeedbackRating';
import { LaravelIntegrationHub } from '../submodules/LaravelIntegrationHub';
import { SystemSettings } from '../submodules/SystemSettings';

interface AdminPortalProps {
  activeTab: SubmoduleTab;
  onTabChange: (tab: SubmoduleTab) => void;
  packages: TourPackage[];
  bookings: Booking[];
  feedbacks: CustomerFeedback[];
  appSettings: AppSettings;
  onSavePackage: (pkg: TourPackage) => void;
  onDeletePackage: (id: string) => void;
  onDuplicatePackage: (pkg: TourPackage) => void;
  onUpdateBookingStatus: (id: string, status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => void;
  onUpdateGuide: (bookingId: string, guideName: string) => void;
  onUpdateHotelReservation: (bookingId: string, hotel: HotelReservation) => void;
  onUpdateTransportReservation: (bookingId: string, transport: TransportReservation) => void;
  onAddPaymentRecord: (bookingId: string, payment: PaymentRecord) => void;
  onSubmitFeedback: (feedback: CustomerFeedback) => void;
  onUpdateSettings: (settings: AppSettings) => void;
  onResetSettings: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  activeTab,
  onTabChange,
  packages,
  bookings,
  feedbacks,
  appSettings,
  onSavePackage,
  onDeletePackage,
  onDuplicatePackage,
  onUpdateBookingStatus,
  onUpdateGuide,
  onUpdateHotelReservation,
  onUpdateTransportReservation,
  onAddPaymentRecord,
  onSubmitFeedback,
  onUpdateSettings,
  onResetSettings
}) => {
  return (
    <div className="space-y-8">
      {/* 0. Operations Overview */}
      {activeTab === 'overview' && (
        <AdminDashboard
          packages={packages}
          bookings={bookings}
          feedbacks={feedbacks}
          onNavigateTab={onTabChange}
        />
      )}

      {/* 1. Tour Package Management (Full Operator CRUD) */}
      {activeTab === 'packages' && (
        <TourPackageManagement
          packages={packages}
          onSavePackage={onSavePackage}
          onDeletePackage={onDeletePackage}
          onDuplicatePackage={onDuplicatePackage}
          isOperatorView={true} // Full admin CRUD enabled
          onSelectBookPackage={() => {}}
        />
      )}

      {/* 2. Customer Bookings & Passenger Manifest */}
      {activeTab === 'bookings' && (
        <CustomerBookingPortal
          packages={packages}
          bookings={bookings}
          onCreateBooking={() => {}}
          onUpdateBookingStatus={onUpdateBookingStatus}
          isOperatorView={true} // Manifest table with status management & print actions
        />
      )}

      {/* 3. Itinerary & Tour Guide Dispatch */}
      {activeTab === 'itineraries' && (
        <ItineraryScheduleManagement
          packages={packages}
          bookings={bookings}
          onUpdateGuide={onUpdateGuide}
          isOperatorView={true}
        />
      )}

      {/* 4. Hotel & Transport Allocations */}
      {activeTab === 'reservations' && (
        <HotelTransportReservation
          bookings={bookings}
          onUpdateHotelReservation={onUpdateHotelReservation}
          onUpdateTransportReservation={onUpdateTransportReservation}
          isOperatorView={true}
        />
      )}

      {/* 5. Payment & Invoices Ledger */}
      {activeTab === 'payments' && (
        <PaymentInvoiceManagement
          bookings={bookings}
          onAddPaymentRecord={onAddPaymentRecord}
          isOperatorView={true}
        />
      )}

      {/* 6. Customer Feedback & CSAT Moderation */}
      {activeTab === 'feedback' && (
        <CustomerFeedbackRating
          feedbacks={feedbacks}
          bookings={bookings}
          onSubmitFeedback={onSubmitFeedback}
          isOperatorView={true}
        />
      )}

      {/* 7. Laravel + Sanctum Integration Hub */}
      {activeTab === 'laravel_integration' && (
        <LaravelIntegrationHub />
      )}

      {/* 8. System Settings & Agency Branding */}
      {activeTab === 'settings' && (
        <SystemSettings
          settings={appSettings}
          onUpdateSettings={onUpdateSettings}
          onResetSettings={onResetSettings}
        />
      )}
    </div>
  );
};
