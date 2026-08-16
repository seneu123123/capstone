import React, { useState } from 'react';
import { 
  Booking, 
  CustomerFeedback, 
  TourPackage 
} from '../../types';
import { ClientHero } from './ClientHero';
import { ClientEthos } from './ClientEthos';
import { ClientDestinations } from './ClientDestinations';
import { ClientExpeditions } from './ClientExpeditions';
import { ClientBookingTracker } from './ClientBookingTracker';
import { CustomerBookingPortal } from '../submodules/CustomerBookingPortal';
import { CustomerFeedbackRating } from '../submodules/CustomerFeedbackRating';
import { X, Calendar, Compass, MessageSquareQuote } from 'lucide-react';

interface ClientPortalProps {
  packages: TourPackage[];
  bookings: Booking[];
  feedbacks: CustomerFeedback[];
  onCreateBooking: (booking: Booking) => void;
  onSubmitFeedback: (feedback: CustomerFeedback) => void;
  preSelectedPackage: TourPackage | null;
  onSelectBookPackage: (pkg: TourPackage) => void;
  onClearPreSelectedPackage: () => void;
  isTrackerOpen: boolean;
  onCloseTracker: () => void;
  isBookingModalOpen: boolean;
  onCloseBookingModal: () => void;
  onOpenBookingModal: (pkg?: TourPackage) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  packages,
  bookings,
  feedbacks,
  onCreateBooking,
  onSubmitFeedback,
  preSelectedPackage,
  onSelectBookPackage,
  onClearPreSelectedPackage,
  isTrackerOpen,
  onCloseTracker,
  isBookingModalOpen,
  onCloseBookingModal,
  onOpenBookingModal,
}) => {
  const [showReviewsSection, setShowReviewsSection] = useState(false);

  const activePackages = packages.filter((p) => p.status === 'Active');

  return (
    <div className="w-full bg-obsidian-deep overflow-hidden">
      {/* 1. Cinematic Full-Screen Hero */}
      <ClientHero
        onExploreClick={() => {
          const ethos = document.getElementById('ethos');
          if (ethos) ethos.scrollIntoView({ behavior: 'smooth' });
        }}
        onBookClick={() => onOpenBookingModal()}
      />

      {/* 2. Slow Travel Manifesto Ethos */}
      <ClientEthos />

      {/* 3. Featured Island Destinations Spotlight */}
      <ClientDestinations />

      {/* 4. Curated Expeditions (2-Column Emergent Journey Cards) */}
      <ClientExpeditions
        packages={activePackages}
        onSelectPackage={(pkg) => {
          onSelectBookPackage(pkg);
          onOpenBookingModal(pkg);
        }}
      />

      {/* 5. Guest Reviews & Ratings Section */}
      <section id="reviews" className="py-24 px-6 sm:px-8 bg-[#06090C] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs font-sans-body tracking-[0.25em] uppercase text-sunset-coral font-medium">
                Guest Impressions
              </p>
              <h2 className="font-serif-display text-4xl sm:text-5xl font-light text-ivory">
                Stories from <span className="italic font-normal">the sea</span>
              </h2>
            </div>
            <button
              onClick={() => setShowReviewsSection(!showReviewsSection)}
              className="text-xs font-sans-body tracking-wider text-sand-muted hover:text-ivory flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full"
            >
              <MessageSquareQuote className="w-4 h-4 text-sunset-coral" />
              <span>{showReviewsSection ? 'Collapse Review Feed' : 'View All Guest Feedbacks & Leave Review'}</span>
            </button>
          </div>

          {showReviewsSection ? (
            <div className="glass-obsidian rounded-2xl p-6 sm:p-8">
              <CustomerFeedbackRating
                feedbacks={feedbacks}
                bookings={bookings}
                onSubmitFeedback={onSubmitFeedback}
                isOperatorView={false}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {feedbacks.slice(0, 3).map((fb) => (
                <div
                  key={fb.id}
                  className="bg-[#0B1014] p-6 rounded-xl border border-white/[0.06] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-serif-display text-lg text-ivory font-light">{fb.customerName}</p>
                    <span className="text-xs text-sunset-coral font-medium">★ {fb.overallRating}.0</span>
                  </div>
                  <p className="text-sand-muted text-xs leading-relaxed font-light italic">
                    "{fb.reviewText}"
                  </p>
                  <p className="text-[11px] text-white/30 tracking-wider uppercase">{fb.tourTitle}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL 1: RESERVATION & BOOKING WIZARD */}
      {/* ========================================================================= */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#090E13] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-sans-body tracking-[0.25em] uppercase text-sunset-coral font-medium">
                  Direct Guest Checkout
                </p>
                <h3 className="font-serif-display text-3xl sm:text-4xl text-ivory mt-1">
                  Begin Your Expedition
                </h3>
              </div>
              <button
                onClick={() => {
                  onCloseBookingModal();
                  onClearPreSelectedPackage();
                }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-sand-muted hover:text-ivory hover:bg-white/5 transition-all"
                id="close-booking-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Booking Wizard Form */}
            <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
              <CustomerBookingPortal
                packages={activePackages}
                bookings={bookings}
                onCreateBooking={(newBooking) => {
                  onCreateBooking(newBooking);
                  onCloseBookingModal();
                }}
                onUpdateBookingStatus={() => {}}
                isOperatorView={false}
                preSelectedPackage={preSelectedPackage}
                onClearPreSelectedPackage={onClearPreSelectedPackage}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: GUEST BOOKING & VOUCHER TRACKER */}
      {/* ========================================================================= */}
      {isTrackerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#090E13] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div>
                <p className="text-xs font-sans-body tracking-[0.25em] uppercase text-sunset-coral font-medium">
                  Self-Service Portal
                </p>
                <h3 className="font-serif-display text-3xl sm:text-4xl text-ivory mt-1">
                  Track Official Voucher & Itinerary
                </h3>
              </div>
              <button
                onClick={onCloseTracker}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-sand-muted hover:text-ivory hover:bg-white/5 transition-all"
                id="close-tracker-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Voucher Tracker Component */}
            <div className="max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
              <ClientBookingTracker
                bookings={bookings}
                onNavigateToBook={() => {
                  onCloseTracker();
                  onOpenBookingModal();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
