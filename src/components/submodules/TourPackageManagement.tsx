import React, { useState } from 'react';
import { TourPackage, TourCategory, DayItinerary } from '../../types';
import { ImageWithLoader } from '../common/ImageWithLoader';
import { 
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  X, 
  Eye, 
  Calendar,
  Layers,
  Sparkles,
  Tag,
  Star
} from 'lucide-react';

interface TourPackageManagementProps {
  packages: TourPackage[];
  onSavePackage: (pkg: TourPackage) => void;
  onDeletePackage: (id: string) => void;
  onDuplicatePackage: (pkg: TourPackage) => void;
  isOperatorView: boolean;
  onSelectBookPackage?: (pkg: TourPackage) => void;
}

export const TourPackageManagement: React.FC<TourPackageManagementProps> = ({
  packages,
  onSavePackage,
  onDeletePackage,
  onDuplicatePackage,
  isOperatorView,
  onSelectBookPackage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingPackage, setViewingPackage] = useState<TourPackage | null>(null);

  // Form State for Create / Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TourPackage>>({
    code: '',
    title: '',
    destination: '',
    category: 'Island Hopping',
    durationDays: 3,
    durationNights: 2,
    pricePerPax: 5000,
    maxCapacity: 15,
    status: 'Active',
    bannerUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
    inclusions: ['Hotel Stay', 'Tour Guide', 'Buffet Breakfast'],
    exclusions: ['Airfare', 'Personal Expenses'],
    itinerary: []
  });

  const [inclusionInput, setInclusionInput] = useState('');
  const [exclusionInput, setExclusionInput] = useState('');

  const categories: string[] = ['All', 'Island Hopping', 'Adventure & Nature', 'Heritage & Culture', 'Luxury & Wellness', 'City Tour'];

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = 
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({
      code: `PKG-NEW-${Math.floor(100 + Math.random() * 900)}`,
      title: '',
      destination: '',
      category: 'Island Hopping',
      durationDays: 3,
      durationNights: 2,
      pricePerPax: 8500,
      maxCapacity: 15,
      status: 'Active',
      featured: false,
      bannerUrl: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
      inclusions: ['3-Night Hotel Accommodation', 'Daily Breakfast', 'Guided Island Hopping Tour', 'Airport Van Transfers'],
      exclusions: ['Airfare tickets', 'Personal Expenses'],
      itinerary: [
        {
          dayNumber: 1,
          title: 'Arrival & Welcome Orientation',
          description: 'Airport van pick-up and check-in to resort.',
          meals: 'Dinner included',
          activities: [
            { time: '10:00 AM', activity: 'Airport Pick-up & Van Transfer' },
            { time: '02:00 PM', activity: 'Hotel Check-in & Rest' }
          ]
        },
        {
          dayNumber: 2,
          title: 'Full Day Sightseeing Tour',
          description: 'Explore key spots and enjoy local seafood lunch.',
          meals: 'Breakfast & Lunch',
          activities: [
            { time: '08:30 AM', activity: 'Departure for Main Tour' },
            { time: '12:00 PM', activity: 'Seafood Picnic Lunch' }
          ]
        }
      ]
    });
    setInclusionInput('');
    setExclusionInput('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (pkg: TourPackage) => {
    setEditingId(pkg.id);
    setFormData({ ...pkg });
    setInclusionInput('');
    setExclusionInput('');
    setIsModalOpen(true);
  };

  const handleAddInclusion = () => {
    if (!inclusionInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      inclusions: [...(prev.inclusions || []), inclusionInput.trim()]
    }));
    setInclusionInput('');
  };

  const handleRemoveInclusion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      inclusions: (prev.inclusions || []).filter((_, i) => i !== index)
    }));
  };

  const handleAddExclusion = () => {
    if (!exclusionInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      exclusions: [...(prev.exclusions || []), exclusionInput.trim()]
    }));
    setExclusionInput('');
  };

  const handleRemoveExclusion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      exclusions: (prev.exclusions || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.destination) {
      alert('Please fill in the Package Title and Destination.');
      return;
    }

    const newPackage: TourPackage = {
      id: editingId || `pkg-${Date.now()}`,
      code: formData.code || `PKG-${Date.now()}`,
      title: formData.title || 'Untitled Tour Package',
      destination: formData.destination || 'Destination',
      category: (formData.category as TourCategory) || 'Island Hopping',
      durationDays: Number(formData.durationDays) || 1,
      durationNights: Number(formData.durationNights) || 0,
      pricePerPax: Number(formData.pricePerPax) || 0,
      maxCapacity: Number(formData.maxCapacity) || 10,
      inclusions: formData.inclusions || [],
      exclusions: formData.exclusions || [],
      bannerUrl: formData.bannerUrl || 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
      rating: formData.rating || 5.0,
      reviewCount: formData.reviewCount || 0,
      status: formData.status || 'Active',
      featured: formData.featured || false,
      itinerary: formData.itinerary || []
    };

    onSavePackage(newPackage);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Submodule Title Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Submodule 01</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Tour Package Creation & Management
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Design, organize, set pricing, and publish tour packages with custom day-by-day itineraries and capacity settings.
            </p>
          </div>

          {isOperatorView && (
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition group shrink-0"
            >
              <Plus className="w-4 h-4 group-hover:scale-110 transition" />
              <span>Create New Package</span>
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-slate-800">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by tour name, code, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-200 flex flex-col group shadow-lg"
          >
            {/* Image Header */}
            <div className="relative h-48 overflow-hidden bg-slate-950">
              <ImageWithLoader
                src={pkg.bannerUrl}
                alt={pkg.title}
                aspectRatio="h-48"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40 pointer-events-none" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/80 backdrop-blur text-cyan-300 border border-cyan-500/30">
                  {pkg.code}
                </span>
                {pkg.featured && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/80 text-slate-950 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur ${
                  pkg.status === 'Active' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-slate-800/80 text-slate-400 border border-slate-700'
                }`}>
                  {pkg.status}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5 text-xs text-slate-200 bg-slate-950/60 backdrop-blur px-2.5 py-1 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate max-w-[180px]">{pkg.destination}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-300 bg-slate-950/60 backdrop-blur px-2 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{pkg.rating}</span>
                  <span className="text-slate-400 text-[10px]">({pkg.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{pkg.category}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
                  {pkg.title}
                </h3>

                {/* Spec Icons */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Max {pkg.maxCapacity} Pax</span>
                  </div>
                </div>

                {/* Inclusions snippet */}
                <div className="mt-3">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Key Inclusions:
                  </p>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {pkg.inclusions.slice(0, 2).map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-slate-300">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </li>
                    ))}
                    {pkg.inclusions.length > 2 && (
                      <span className="text-[11px] text-cyan-400 font-medium">
                        +{pkg.inclusions.length - 2} more inclusions
                      </span>
                    )}
                  </ul>
                </div>
              </div>

              {/* Footer Price & Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Price per Pax</span>
                  <span className="text-lg font-extrabold text-cyan-400">
                    ₱{pkg.pricePerPax.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setViewingPackage(pkg)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition"
                    title="View Package Details & Itinerary"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {isOperatorView ? (
                    <>
                      <button
                        onClick={() => onDuplicatePackage(pkg)}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs transition"
                        title="Duplicate Package"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(pkg)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-xs border border-blue-500/30 transition"
                        title="Edit Package"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete package "${pkg.title}"?`)) {
                            onDeletePackage(pkg.id);
                          }
                        }}
                        className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-xs border border-rose-500/30 transition"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => onSelectBookPackage && onSelectBookPackage(pkg)}
                      className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-lg shadow-md shadow-cyan-500/20 transition"
                    >
                      Book Tour
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
          <MapPin className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300">No tour packages found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search filter or create a new package.</p>
        </div>
      )}

      {/* Package Detail Modal View */}
      {viewingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewingPackage(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-56 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl">
              <img
                src={viewingPackage.bannerUrl}
                alt={viewingPackage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                  {viewingPackage.category} • {viewingPackage.code}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">{viewingPackage.title}</h2>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {viewingPackage.destination}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Price per pax</span>
                <span className="text-lg font-bold text-cyan-400">₱{viewingPackage.pricePerPax.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Duration</span>
                <span className="text-sm font-semibold text-slate-200">{viewingPackage.durationDays} Days / {viewingPackage.durationNights} Nights</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Max Group Capacity</span>
                <span className="text-sm font-semibold text-slate-200">{viewingPackage.maxCapacity} Passengers</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Day-by-day Itinerary */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  Day-by-Day Activity Itinerary
                </h3>
                <div className="space-y-3">
                  {viewingPackage.itinerary.map((day) => (
                    <div key={day.dayNumber} className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                          Day {day.dayNumber}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{day.meals}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-100">{day.title}</h4>
                      <p className="text-xs text-slate-300 mt-1">{day.description}</p>
                      
                      {day.activities && day.activities.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-slate-700/60 space-y-1.5">
                          {day.activities.map((act, idx) => (
                            <div key={idx} className="flex items-center text-[11px] text-slate-300">
                              <span className="w-20 font-semibold text-cyan-300">{act.time}</span>
                              <span className="flex-1">{act.activity}</span>
                              {act.location && <span className="text-slate-400 text-[10px] italic">({act.location})</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">Inclusions</h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {viewingPackage.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-rose-400 mb-2 uppercase tracking-wider">Exclusions</h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {viewingPackage.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setViewingPackage(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition"
              >
                Close
              </button>
              {!isOperatorView && onSelectBookPackage && (
                <button
                  onClick={() => {
                    const pkgToBook = viewingPackage;
                    setViewingPackage(null);
                    onSelectBookPackage(pkgToBook);
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
                >
                  Proceed to Book
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-white mb-4">
              {editingId ? 'Edit Tour Package' : 'Create New Tour Package'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Package Code</label>
                  <input
                    type="text"
                    required
                    value={formData.code || ''}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Category</label>
                  <select
                    value={formData.category || 'Island Hopping'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as TourCategory })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Package Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Boracay Island Sunset & Crystal Cove Tour"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Destination Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Boracay, Aklan, Philippines"
                  value={formData.destination || ''}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Price per Pax (₱)</label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerPax || 0}
                    onChange={(e) => setFormData({ ...formData, pricePerPax: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Duration Days</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.durationDays || 1}
                    onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Duration Nights</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.durationNights || 0}
                    onChange={(e) => setFormData({ ...formData, durationNights: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Max Group Capacity</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.maxCapacity || 10}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Status</label>
                  <select
                    value={formData.status || 'Active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Draft' | 'Archived' })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Active">Active / Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Banner Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.bannerUrl || ''}
                  onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Inclusions List */}
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Inclusions</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add inclusion (e.g., Free Snorkeling gear)"
                    value={inclusionInput}
                    onChange={(e) => setInclusionInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddInclusion}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-xl text-cyan-400 border border-cyan-500/30"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.inclusions || []).map((inc, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-200 border border-slate-700">
                      <span>{inc}</span>
                      <button type="button" onClick={() => handleRemoveInclusion(i)} className="text-slate-400 hover:text-rose-400">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition"
                >
                  Save Tour Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
