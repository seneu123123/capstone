export type TourCategory = 'Island Hopping' | 'Adventure & Nature' | 'Heritage & Culture' | 'Luxury & Wellness' | 'City Tour';

export interface DayActivity {
  time: string;
  activity: string;
  location?: string;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  description: string;
  activities: DayActivity[];
  meals: string; // e.g., "Breakfast, Lunch"
  overnightHotel?: string;
}

export interface TourPackage {
  id: string;
  code: string; // e.g. PKG-ELNIDO-01
  title: string;
  destination: string;
  category: TourCategory;
  durationDays: number;
  durationNights: number;
  pricePerPax: number;
  maxCapacity: number;
  inclusions: string[];
  exclusions: string[];
  bannerUrl: string;
  rating: number;
  reviewCount: number;
  status: 'Active' | 'Draft' | 'Archived';
  featured?: boolean;
  itinerary: DayItinerary[];
}

export interface Customer {
  fullName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  nationality?: string;
}

export interface Passenger {
  id: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  passportOrId: string;
  specialRequirements?: string;
}

export interface HotelReservation {
  id: string;
  hotelName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  voucherCode: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  contactPhone: string;
  notes?: string;
}

export interface TransportReservation {
  id: string;
  vehicleType: string; // e.g., '14-Seater Coaster Van', 'Private Speedboat'
  driverName: string;
  driverContact: string;
  plateNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  status: 'Dispatched' | 'Scheduled' | 'Completed' | 'Pending';
  notes?: string;
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: 'GCash' | 'PayMaya' | 'Bank Transfer' | 'Credit Card' | 'Cash';
  referenceNo: string;
  status: 'Verified' | 'Pending Verification' | 'Rejected';
  notes?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PaymentInvoice {
  id: string;
  invoiceNumber: string; // e.g., INV-2026-001
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  status: 'Paid' | 'Partial' | 'Unpaid' | 'Overdue';
  items: InvoiceItem[];
  payments: PaymentRecord[];
}

export interface Booking {
  id: string;
  bookingRef: string; // e.g. TT-2026-8942
  tourPackageId: string;
  tourTitle: string;
  destination: string;
  customer: Customer;
  passengers: Passenger[];
  travelDate: string;
  numPax: number;
  totalPrice: number;
  depositRequired: number;
  bookingStatus: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid';
  createdAt: string;
  assignedGuide?: string;
  hotelReservation?: HotelReservation;
  transportReservation?: TransportReservation;
  invoice: PaymentInvoice;
  specialInstructions?: string;
}

export interface CustomerFeedback {
  id: string;
  bookingRef: string;
  customerName: string;
  tourTitle: string;
  date: string;
  overallRating: number; // 1-5
  guideRating: number;
  hotelRating: number;
  transportRating: number;
  valueRating: number;
  comment: string;
  recommendationScore: number; // 1-10 NPS
  status: 'Approved' | 'Pending Review';
}

export type ViewMode = 'customer' | 'operator';
export type SubmoduleTab = 
  | 'overview'
  | 'packages'
  | 'bookings'
  | 'itineraries'
  | 'reservations'
  | 'payments'
  | 'feedback'
  | 'laravel_integration'
  | 'settings';

export interface AgencyBrandingSettings {
  companyName: string;
  shortName: string;
  accreditationNo: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  currencySymbol: string;
  defaultDownpaymentPct: number;
}

export type ThemeAccentColor = 'coral' | 'cyan' | 'emerald' | 'amber' | 'indigo' | 'purple' | 'rose' | 'teal';
export type ThemeFontDisplay = 'cormorant' | 'jakarta' | 'cinzel' | 'outfit' | 'space' | 'playfair' | 'jetbrains';
export type ThemeFontBody = 'jakarta' | 'inter' | 'outfit' | 'dmsans' | 'jetbrains';
export type ThemeBgTone = 'obsidian' | 'slate' | 'zinc' | 'marine';
export type ThemeBorderStyle = 'subtle' | 'high-contrast' | 'minimal';
export type ThemeFontSize = 'compact' | 'standard' | 'large';

export interface UiThemeSettings {
  accentColor: ThemeAccentColor;
  fontDisplay: ThemeFontDisplay;
  fontBody: ThemeFontBody;
  bgTone: ThemeBgTone;
  borderStyle: ThemeBorderStyle;
  fontSize: ThemeFontSize;
  cardGlow: boolean;
  colorScheme?: 'coral' | 'cyan' | 'amber' | 'emerald' | 'indigo' | 'rose';
  density?: 'spacious' | 'compact';
  showBorders?: boolean;
  enableAnimations?: boolean;
}

export interface AppSettings {
  agency: AgencyBrandingSettings;
  theme: UiThemeSettings;
}
