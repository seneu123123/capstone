import React, { useState } from 'react';
import { 
  Booking, 
  CustomerFeedback, 
  TourCategory, 
  TourPackage 
} from '../../types';
import { ClientTab } from './ClientNavbar';
import { ClientHero } from './ClientHero';
import { ClientBookingTracker } from './ClientBookingTracker';
import { TourPackageManagement } from '../submodules/TourPackageManagement';
import { CustomerBookingPortal } from '../submodules/CustomerBookingPortal';
import { CustomerFeedbackRating } from '../submodules/CustomerFeedbackRating';

interface ClientPortalProps {
  activeTab: ClientTab;
  onTabChange: (tab: ClientTab) => void;
  packages: TourPackage[];
  bookings: Booking[];
  feedbacks: CustomerFeedback[];
  onCreateBooking: (booking: Booking) => void;
  onSubmitFeedback: (feedback: CustomerFeedback) => void;
  preSelectedPackage: TourPackage | null;
  onSelectBookPackage: (pkg: TourPackage) => void;
  onClearPreSelectedPackage: () => void;
}

const CATEGORIES: TourCategory[] = [
  'Island Hopping',
  'Adventure & Nature',
  'Heritage & Culture',
  'Luxury & Wellness',
  'City Tour'
];

export const ClientPortal: React.FC<ClientPortalProps> = ({
  activeTab,
  onTabChange,
  packages,
  bookings,
  feedbacks,
  onCreateBooking,
  onSubmitFeedback,
  preSelectedPackage,
  onSelectBookPackage,
  onClearPreSelectedPackage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter packages for customer catalog
  const filteredPackages = packages.filter((pkg) => {
    if (pkg.status !== 'Active') return false; // Only show Active packages to customers
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || pkg.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* 1. Hero Section (Shown on Explore Tours) */}
      {activeTab === 'tours' && (
        <ClientHero
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={CATEGORIES}
          totalPackagesCount={packages.filter((p) => p.status === 'Active').length}
        />
      )}

      {/* 2. Main Tab Content */}
      {activeTab === 'tours' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Featured Tour Packages & Island Getaways
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Transparent per-pax rates, verified itineraries, and instant reservation vouchers.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-cyan-400 rounded-full border border-slate-700">
              {filteredPackages.length} tours available
            </span>
          </div>

          <TourPackageManagement
            packages={packages}
            onSavePackage={() => {}}
            onDeletePackage={() => {}}
            onDuplicatePackage={() => {}}
            isOperatorView={false} // Client mode: No delete/edit buttons, only View & Book
            onSelectBookPackage={(pkg) => {
              onSelectBookPackage(pkg);
              onTabChange('book');
            }}
          />
        </div>
      )}

      {activeTab === 'book' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Reserve Your Tour Package
            </h2>
            <p className="text-sm text-slate-400">
              Select your travel dates, input passenger manifest details, choose payment options, and receive an instant booking voucher.
            </p>
          </div>

          <CustomerBookingPortal
            packages={packages.filter((p) => p.status === 'Active')}
            bookings={bookings}
            onCreateBooking={(newBooking) => {
              onCreateBooking(newBooking);
              // After booking, seamlessly switch to tracking tab so they see their voucher
              onTabChange('track');
            }}
            onUpdateBookingStatus={() => {}}
            isOperatorView={false} // Customer booking wizard
            preSelectedPackage={preSelectedPackage}
            onClearPreSelectedPackage={onClearPreSelectedPackage}
          />
        </div>
      )}

      {activeTab === 'track' && (
        <ClientBookingTracker
          bookings={bookings}
          onNavigateToBook={() => onTabChange('tours')}
        />
      )}

      {activeTab === 'feedback' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Traveler Reviews & Feedback
            </h2>
            <p className="text-sm text-slate-400">
              Real feedback from verified guests who explored the Philippine islands with Holiday Travelers.
            </p>
          </div>

          <CustomerFeedbackRating
            feedbacks={feedbacks}
            bookings={bookings}
            onSubmitFeedback={onSubmitFeedback}
            isOperatorView={false} // Customer view: review form & testimonials
          />
        </div>
      )}
    </div>
  );
};
