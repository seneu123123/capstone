import React, { useState } from 'react';
import { CustomerFeedback, Booking } from '../../types';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  User, 
  Calendar, 
  Plus, 
  X,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface CustomerFeedbackRatingProps {
  feedbacks: CustomerFeedback[];
  bookings: Booking[];
  onSubmitFeedback: (fb: CustomerFeedback) => void;
  isOperatorView: boolean;
}

export const CustomerFeedbackRating: React.FC<CustomerFeedbackRatingProps> = ({
  feedbacks,
  bookings,
  onSubmitFeedback,
  isOperatorView
}) => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Form State
  const [selectedBookingRef, setSelectedBookingRef] = useState(bookings[0]?.bookingRef || '');
  const [overallRating, setOverallRating] = useState(5);
  const [guideRating, setGuideRating] = useState(5);
  const [hotelRating, setHotelRating] = useState(5);
  const [transportRating, setTransportRating] = useState(5);
  const [valueRating, setValueRating] = useState(5);
  const [comment, setComment] = useState('');
  const [npsScore, setNpsScore] = useState(10);

  const avgOverall = (feedbacks.reduce((sum, f) => sum + f.overallRating, 0) / (feedbacks.length || 1)).toFixed(1);
  const avgGuide = (feedbacks.reduce((sum, f) => sum + f.guideRating, 0) / (feedbacks.length || 1)).toFixed(1);
  const avgHotel = (feedbacks.reduce((sum, f) => sum + f.hotelRating, 0) / (feedbacks.length || 1)).toFixed(1);
  const avgTransport = (feedbacks.reduce((sum, f) => sum + f.transportRating, 0) / (feedbacks.length || 1)).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const relatedBooking = bookings.find((b) => b.bookingRef === selectedBookingRef) || bookings[0];

    const newFeedback: CustomerFeedback = {
      id: `fb-${Date.now()}`,
      bookingRef: selectedBookingRef,
      customerName: relatedBooking ? relatedBooking.customer.fullName : 'Valued Tourist',
      tourTitle: relatedBooking ? relatedBooking.tourTitle : 'Travel Tour Package',
      date: new Date().toISOString().split('T')[0],
      overallRating: overallRating,
      guideRating: guideRating,
      hotelRating: hotelRating,
      transportRating: transportRating,
      valueRating: valueRating,
      comment: comment || 'Wonderful experience!',
      recommendationScore: npsScore,
      status: 'Approved'
    };

    onSubmitFeedback(newFeedback);
    setIsSubmitModalOpen(false);
    setComment('');
  };

  const renderStars = (rating: number, onSelect?: (r: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onClick={() => onSelect && onSelect(star)}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-700'
            } ${onSelect ? 'cursor-pointer hover:scale-110 transition' : ''}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Submodule Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Submodule 06</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Customer Feedback & Rating System
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Post-tour rating submissions, multi-criteria evaluations (tour guide, hotel, transport, value for money), and CSAT analytics.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition group shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Tour Review</span>
          </button>
        </div>

        {/* Feedback Analytics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Overall Tour CSAT</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-amber-400">{avgOverall}</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Tour Guide Rating</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-cyan-400">{avgGuide}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Hotel Stay Rating</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-indigo-400">{avgHotel}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Transport Rating</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-400">{avgTransport}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          <span>Verified Customer Reviews & Testimonials</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{fb.customerName}</div>
                  <span className="text-[11px] text-cyan-400 font-medium">{fb.tourTitle}</span>
                </div>
                <div className="text-right">
                  {renderStars(fb.overallRating)}
                  <span className="text-[10px] text-slate-500 block mt-0.5">{fb.date}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                "{fb.comment}"
              </p>

              <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                <div>Guide: <strong className="text-slate-200">{fb.guideRating}/5</strong></div>
                <div>Hotel: <strong className="text-slate-200">{fb.hotelRating}/5</strong></div>
                <div>Transport: <strong className="text-slate-200">{fb.transportRating}/5</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-white mb-4">Submit Post-Tour Customer Feedback</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-medium text-slate-300 block mb-1">Select Completed Booking Reference</label>
                <select
                  value={selectedBookingRef}
                  onChange={(e) => setSelectedBookingRef(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  {bookings.map((b) => (
                    <option key={b.id} value={b.bookingRef}>
                      {b.bookingRef} — {b.customer.fullName} ({b.tourTitle})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block mb-1">Overall Tour Experience</span>
                  {renderStars(overallRating, setOverallRating)}
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Tour Guide Service</span>
                  {renderStars(guideRating, setGuideRating)}
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Hotel & Stay</span>
                  {renderStars(hotelRating, setHotelRating)}
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Transport Comfort</span>
                  {renderStars(transportRating, setTransportRating)}
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-300 block mb-1">Your Written Feedback / Review</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share your experience during the tour..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-300 block mb-1">
                  How likely are you to recommend us to friends? (NPS: {npsScore}/10)
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={npsScore}
                  onChange={(e) => setNpsScore(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-200 text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Post Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
