import React, { useState } from 'react';
import { Booking, DayItinerary, TourPackage } from '../../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  Printer, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  FileText,
  Briefcase
} from 'lucide-react';

interface ItineraryScheduleManagementProps {
  packages: TourPackage[];
  bookings: Booking[];
  onUpdateGuide: (bookingId: string, guideName: string) => void;
  isOperatorView: boolean;
}

export const ItineraryScheduleManagement: React.FC<ItineraryScheduleManagementProps> = ({
  packages,
  bookings,
  onUpdateGuide,
  isOperatorView
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(packages[0]?.id || '');
  const [editingGuideBookingId, setEditingGuideBookingId] = useState<string | null>(null);
  const [guideInput, setGuideInput] = useState<string>('');

  const selectedPkg = packages.find((p) => p.id === selectedPkgId) || packages[0];
  const relatedBookings = bookings.filter((b) => b.tourPackageId === selectedPkgId);

  const handleSaveGuide = (bookingId: string) => {
    if (!guideInput.trim()) return;
    onUpdateGuide(bookingId, guideInput.trim());
    setEditingGuideBookingId(null);
    setGuideInput('');
  };

  const handlePrintSchedule = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Submodule Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Submodule 03</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Itinerary & Schedule Management
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Organize day-by-day activity timelines, assign tour guides and leaders, and monitor departure group slots.
            </p>
          </div>

          <button
            onClick={handlePrintSchedule}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl border border-slate-700 transition"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Guide & Schedule Sheet</span>
          </button>
        </div>

        {/* Package Selector */}
        <div className="mt-6 flex items-center gap-3 pt-5 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-300">Select Tour Package:</span>
          <select
            value={selectedPkgId}
            onChange={(e) => setSelectedPkgId(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-cyan-400 font-bold focus:outline-none focus:border-cyan-500 max-w-md"
          >
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.code} — {pkg.title} ({pkg.destination})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedPkg && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Interactive Day-by-Day Itinerary Timeline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">{selectedPkg.code}</span>
                  <h2 className="text-lg font-bold text-white">{selectedPkg.title}</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {selectedPkg.destination} • {selectedPkg.durationDays} Days / {selectedPkg.durationNights} Nights
                  </p>
                </div>
              </div>

              {/* Day Timeline */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800 pt-2">
                {selectedPkg.itinerary.map((day) => (
                  <div key={day.dayNumber} className="relative pl-9">
                    {/* Circle Node */}
                    <div className="absolute left-1.5 top-1 w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-md shadow-cyan-500/30">
                      {day.dayNumber}
                    </div>

                    <div className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                          Day {day.dayNumber}: {day.title}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{day.meals}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {day.description}
                      </p>

                      {day.overnightHotel && (
                        <div className="text-[11px] text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 inline-block">
                          <strong>Overnight Stay:</strong> {day.overnightHotel}
                        </div>
                      )}

                      {/* Hourly Schedule Table */}
                      <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-3 space-y-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                          Detailed Activity Timetable
                        </span>
                        {day.activities.map((act, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
                            <span className="font-semibold text-cyan-300 w-24 shrink-0">{act.time}</span>
                            <span className="flex-1 text-slate-200">{act.activity}</span>
                            {act.location && (
                              <span className="text-[10px] text-slate-400 italic bg-slate-950 px-2 py-0.5 rounded">
                                {act.location}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Active Departure Groups & Tour Guide Assignments */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Tour Guide Assignments ({relatedBookings.length} Groups)</span>
              </h3>

              {relatedBookings.map((b) => (
                <div key={b.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-400">{b.bookingRef}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{b.travelDate}</span>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-white">{b.customer.fullName}</div>
                    <div className="text-[11px] text-slate-400">{b.numPax} Passengers • Contact: {b.customer.phone}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Assigned Tour Guide / Escort</span>
                    {editingGuideBookingId === b.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={guideInput}
                          onChange={(e) => setGuideInput(e.target.value)}
                          placeholder="Guide Name & Mobile No."
                          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                        />
                        <button
                          onClick={() => handleSaveGuide(b.id)}
                          className="px-3 py-1 bg-cyan-600 text-white rounded-lg text-xs font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <span className="text-xs text-emerald-300 font-medium">
                          {b.assignedGuide || 'Unassigned'}
                        </span>
                        {isOperatorView && (
                          <button
                            onClick={() => {
                              setEditingGuideBookingId(b.id);
                              setGuideInput(b.assignedGuide || '');
                            }}
                            className="text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {relatedBookings.length === 0 && (
                <div className="text-center py-6 text-slate-500 text-xs">
                  No active departure bookings for this tour package.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
