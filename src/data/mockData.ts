import { Booking, CustomerFeedback, TourPackage } from '../types';

export const INITIAL_TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-01',
    code: 'PKG-PAL-01',
    title: 'El Nido & Coron Paradise Island Hopping',
    destination: 'Palawan, Philippines',
    category: 'Island Hopping',
    durationDays: 4,
    durationNights: 3,
    pricePerPax: 14500,
    maxCapacity: 15,
    status: 'Active',
    featured: true,
    rating: 4.9,
    reviewCount: 38,
    bannerUrl: '/images/palawan_paradise.svg',
    inclusions: [
      '3-Night Hotel Accommodation (4-Star Beachfront)',
      'Daily Buffet Breakfast & 2 Seafood Beach Lunches',
      'Private Speedboat Island Hopping (Big Lagoon, Secret Lagoon, Kayangan Lake)',
      'Licensed English-speaking Tour Guide & Environmental Fees',
      'Roundtrip Air-conditioned Van Transfers (PPS Airport/Hotel)'
    ],
    exclusions: [
      'Roundtrip Airfare to Palawan',
      'Personal Snorkeling Equipment Rent (optional)',
      'Travel Insurance & Personal Gratuities'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival in Puerto Princesa & Scenic Transfer to El Nido',
        description: 'Warm airport welcome by tour officer, transfer via private air-conditioned van to El Nido town center and hotel check-in.',
        meals: 'Dinner included',
        overnightHotel: 'El Nido Beachfront Resort & Spa',
        activities: [
          { time: '10:00 AM', activity: 'Meet & Greet at Puerto Princesa Airport (PPS)', location: 'Arrival Gate' },
          { time: '01:00 PM', activity: 'Stopover Lunch at Roxas Viewpoint', location: 'Roxas Overlook' },
          { time: '04:30 PM', activity: 'Hotel Check-in & Evening Leisure at Bacuit Bay', location: 'El Nido Town' }
        ]
      },
      {
        dayNumber: 2,
        title: 'El Nido Tour A: Big Lagoon & Hidden Beaches',
        description: 'Full day island hopping tour exploring crystal clear lagoons, limestone cliffs, and pristine snorkeling reefs.',
        meals: 'Breakfast & Seafood Buffet Lunch',
        overnightHotel: 'El Nido Beachfront Resort & Spa',
        activities: [
          { time: '08:00 AM', activity: 'Boarding Speedboat at El Nido Main Beach', location: 'Bacuit Bay' },
          { time: '09:30 AM', activity: 'Kayaking in Big Lagoon', location: 'Miniloc Island' },
          { time: '12:30 PM', activity: 'Fresh Seafood Buffet Lunch on Shimizu Island', location: 'Shimizu Island' },
          { time: '03:00 PM', activity: 'Snorkeling at Secret Lagoon & Seven Commandos Beach', location: 'Seven Commandos' }
        ]
      },
      {
        dayNumber: 3,
        title: 'Coron Express Crossing & Kayangan Lake Exploration',
        description: 'Early fastcraft ferry to Coron for iconic turquoise lakes and WWII shipwreck snorkeling.',
        meals: 'Breakfast & Island Lunch',
        overnightHotel: 'Coron Westown Resort',
        activities: [
          { time: '06:00 AM', activity: 'Fast Ferry Transfer from El Nido to Coron', location: 'El Nido Port' },
          { time: '10:30 AM', activity: 'Hike & Swim at Kayangan Lake (Cleanest Lake in Asia)', location: 'Coron Island' },
          { time: '02:00 PM', activity: 'Coral Garden Snorkeling & Twin Lagoons Dip', location: 'Twin Lagoon' }
        ]
      },
      {
        dayNumber: 4,
        title: 'Souvenir Shopping & Airport Departure',
        description: 'Free time for local delicacy shopping before van transfer to Busuanga Airport.',
        meals: 'Breakfast',
        activities: [
          { time: '09:00 AM', activity: 'Coron Town Souvenir Shopping (Cashew nuts & pearls)', location: 'Coron Public Market' },
          { time: '11:30 AM', activity: 'Transfer to Busuanga Airport (USU) for Departure', location: 'Busuanga Airport' }
        ]
      }
    ]
  },
  {
    id: 'pkg-02',
    code: 'PKG-BOH-02',
    title: 'Bohol Wonders, Tarsier Sanctuary & Panglao Escape',
    destination: 'Bohol, Philippines',
    category: 'Heritage & Culture',
    durationDays: 3,
    durationNights: 2,
    pricePerPax: 9800,
    maxCapacity: 20,
    status: 'Active',
    featured: true,
    rating: 4.8,
    reviewCount: 24,
    bannerUrl: '/images/bohol.jpg',
    inclusions: [
      '2-Night Resort Accommodation at Panglao Island',
      'Loboc River Cruise Buffet Lunch with Live Cultural Music',
      'Guided Countryside Tour (Chocolate Hills, Tarsier, Baclayon Church)',
      'Panglao Island Hopping (Balicasag Dolphin Watching & Turtle Sanctuary)',
      'All Entrance & Environmental Permits'
    ],
    exclusions: [
      'Airfare/Ferry ticket to Tagbilaran',
      'Personal expenses & souvenirs'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Tagbilaran Welcome & Historic Countryside Tour',
        description: 'Explore the natural wonders and heritage sites of Bohol.',
        meals: 'Buffet Lunch on Loboc River Cruise',
        overnightHotel: 'Henann Resort Panglao',
        activities: [
          { time: '08:30 AM', activity: 'Pick-up at Tagbilaran Port / Panglao Airport (TAG)', location: 'Arrival Lounge' },
          { time: '10:00 AM', activity: 'Visit Philippine Tarsier Sanctuary', location: 'Corella' },
          { time: '12:15 PM', activity: 'Loboc River Floating Restaurant Buffet Lunch', location: 'Loboc River' },
          { time: '02:30 PM', activity: 'Chocolate Hills Viewing Deck & Man-Made Forest', location: 'Carmen, Bohol' }
        ]
      },
      {
        dayNumber: 2,
        title: 'Balicasag Dolphin Watching & Snorkeling Sanctuary',
        description: 'Early morning sea adventure searching for wild dolphins and sea turtles.',
        meals: 'Breakfast & Island Lunch',
        overnightHotel: 'Henann Resort Panglao',
        activities: [
          { time: '06:00 AM', activity: 'Early Departure for Dolphin Spotting', location: 'Alona Beach' },
          { time: '08:30 AM', activity: 'Turtle & Coral Reef Snorkeling at Balicasag Island', location: 'Balicasag' },
          { time: '11:30 AM', activity: 'Virgin Island Sandbar Stroll', location: 'Virgin Island' }
        ]
      },
      {
        dayNumber: 3,
        title: 'Panglao Leisure & Airport Transfer',
        description: 'Relax at Alona Beach before checkout and departure transfer.',
        meals: 'Breakfast',
        activities: [
          { time: '10:00 AM', activity: 'Hotel Check-out & Souvenir Stop', location: 'Panglao' },
          { time: '12:00 PM', activity: 'Drop-off at Bohol-Panglao International Airport', location: 'Panglao Airport' }
        ]
      }
    ]
  },
  {
    id: 'pkg-03',
    code: 'PKG-SRG-03',
    title: 'Siargao Island Surfing & Sugba Lagoon Expedition',
    destination: 'Siargao Island, Philippines',
    category: 'Adventure & Nature',
    durationDays: 4,
    durationNights: 3,
    pricePerPax: 12500,
    maxCapacity: 12,
    status: 'Active',
    featured: false,
    rating: 4.9,
    reviewCount: 19,
    bannerUrl: '/images/siargao_surf.svg',
    inclusions: [
      '3-Night Boutique Surf Resort Stay in General Luna',
      'Tri-Island Tour (Naked Island, Daku Island, Guyam Island)',
      'Sugba Lagoon Paddleboarding & Cliff Jumping Trip',
      'Beginner Surfing Lesson with Certified Local Instructor & Board',
      'Coconut Mountain Viewpoint & Maasin River Palm Tree Swing'
    ],
    exclusions: [
      'Flight tickets to Sayak Airport (IAO)',
      'Dinner meals and night entertainment'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Siargao Arrival & Cloud 9 Sunset Surf Lesson',
        description: 'Check in to resort and catch your first waves at world-famous Cloud 9.',
        meals: 'Welcome Refreshments',
        overnightHotel: 'Kaimana Resort Siargao',
        activities: [
          { time: '11:00 AM', activity: 'Pick-up at Sayak Airport (IAO)', location: 'IAO Airport' },
          { time: '03:30 PM', activity: '1-on-1 Surfing Lesson at Cloud 9 Boardwalk', location: 'Cloud 9' }
        ]
      },
      {
        dayNumber: 2,
        title: 'Sugba Lagoon & Maasin River Adventure',
        description: 'Paddleboard in emerald lagoon waters and swing from famous palm tree over Maasin river.',
        meals: 'Breakfast & Boodle Fight Lunch',
        overnightHotel: 'Kaimana Resort Siargao',
        activities: [
          { time: '08:00 AM', activity: 'Boat Cruise to Sugba Lagoon', location: 'Del Carmen' },
          { time: '01:00 PM', activity: 'Maasin River Palm Tree Rope Swing', location: 'Maasin Bridge' },
          { time: '03:30 PM', activity: 'Coconut Plantation Viewpoint Photoshoot', location: 'Santa Fe' }
        ]
      },
      {
        dayNumber: 3,
        title: 'Siargao Tri-Island Hopping Tour',
        description: 'Visit the iconic bare sandbar of Naked Island, shade under palms on Daku, and relax at Guyam.',
        meals: 'Breakfast & Seafood Feast',
        overnightHotel: 'Kaimana Resort Siargao',
        activities: [
          { time: '08:30 AM', activity: 'Departure from General Luna Harbor', location: 'GL Pier' },
          { time: '10:00 AM', activity: 'Naked Island Sandbar Walk', location: 'Naked Island' },
          { time: '01:00 PM', activity: 'Seafood Boodle Fight Lunch on Daku Island', location: 'Daku Island' },
          { time: '04:00 PM', activity: 'Sunset Chill at Guyam Island', location: 'Guyam Island' }
        ]
      },
      {
        dayNumber: 4,
        title: 'Leisure Café Hopping & Airport Drop-off',
        description: 'Enjoy Siargao local smooth bowls and cafés before heading to airport.',
        meals: 'Breakfast',
        activities: [
          { time: '10:00 AM', activity: 'Açaí Bowl Breakfast & General Luna Souvenirs', location: 'General Luna' },
          { time: '01:00 PM', activity: 'Airport Van Transfer to Sayak Airport', location: 'Sayak Airport' }
        ]
      }
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    bookingRef: 'TT-2026-8942',
    tourPackageId: 'pkg-01',
    tourTitle: 'El Nido & Coron Paradise Island Hopping',
    destination: 'Palawan, Philippines',
    customer: {
      fullName: 'Maria Santos',
      email: 'maria.santos@gmail.com',
      phone: '+63 917 555 0192',
      emergencyContact: 'Roberto Santos (+63 918 222 9011)',
      nationality: 'Filipino'
    },
    passengers: [
      { id: 'p1', fullName: 'Maria Santos', age: 29, gender: 'Female', passportOrId: 'P1829382A' },
      { id: 'p2', fullName: 'Juan Dela Cruz', age: 31, gender: 'Male', passportOrId: 'P9823123B', specialRequirements: 'Vegetarian meal requested for lunches' }
    ],
    travelDate: '2026-08-15',
    numPax: 2,
    totalPrice: 29000,
    depositRequired: 14500,
    bookingStatus: 'Confirmed',
    paymentStatus: 'Paid',
    createdAt: '2026-07-20',
    assignedGuide: 'Capt. Roger Mendoza (+63 920 111 8899)',
    specialInstructions: 'Lead passenger requested airport pickup with sign name "M. Santos"',
    hotelReservation: {
      id: 'htl-501',
      hotelName: 'El Nido Beachfront Resort & Spa',
      roomType: 'Deluxe Sea View King Suite',
      checkInDate: '2026-08-15',
      checkOutDate: '2026-08-18',
      nights: 3,
      voucherCode: 'HTL-ELN-8942',
      status: 'Confirmed',
      contactPhone: '+63 48 433 1020',
      notes: 'Honeymoon setup with flower petals'
    },
    transportReservation: {
      id: 'trp-701',
      vehicleType: 'Toyota Grandia Tourist Van (14-Seater Aircon)',
      driverName: 'Mang Benjie Cruz',
      driverContact: '+63 915 888 3322',
      plateNumber: 'NXY-8829',
      pickupLocation: 'Puerto Princesa Airport (PPS) Terminal 1',
      dropoffLocation: 'El Nido Beachfront Resort lobby',
      pickupTime: '10:30 AM',
      status: 'Scheduled',
      notes: 'Driver will meet guest holding Tour Operator placard'
    },
    invoice: {
      id: 'inv-1001',
      invoiceNumber: 'INV-2026-8942',
      issueDate: '2026-07-20',
      dueDate: '2026-08-01',
      totalAmount: 29000,
      amountPaid: 29000,
      balanceDue: 0,
      status: 'Paid',
      items: [
        { description: 'El Nido & Coron Paradise Tour Package (2 Pax)', quantity: 2, unitPrice: 14500, totalPrice: 29000 }
      ],
      payments: [
        { id: 'pmt-01', date: '2026-07-20', amount: 14500, method: 'GCash', referenceNo: 'GC-992018231', status: 'Verified' },
        { id: 'pmt-02', date: '2026-07-25', amount: 14500, method: 'Credit Card', referenceNo: 'CC-448102931', status: 'Verified' }
      ]
    }
  },
  {
    id: 'bk-1002',
    bookingRef: 'TT-2026-9104',
    tourPackageId: 'pkg-02',
    tourTitle: 'Bohol Wonders, Tarsier Sanctuary & Panglao Escape',
    destination: 'Bohol, Philippines',
    customer: {
      fullName: 'Alex Vance',
      email: 'alex.vance@techcorp.com',
      phone: '+1 (415) 890-2134',
      emergencyContact: 'Sarah Vance (+1 415 890 2135)',
      nationality: 'American'
    },
    passengers: [
      { id: 'p3', fullName: 'Alex Vance', age: 35, gender: 'Male', passportOrId: 'US-901238491' },
      { id: 'p4', fullName: 'Sarah Vance', age: 33, gender: 'Female', passportOrId: 'US-901238492' },
      { id: 'p5', fullName: 'Leo Vance', age: 6, gender: 'Male', passportOrId: 'US-901238493', specialRequirements: 'Needs child life vest for boat tour' }
    ],
    travelDate: '2026-09-02',
    numPax: 3,
    totalPrice: 29400,
    depositRequired: 14700,
    bookingStatus: 'Confirmed',
    paymentStatus: 'Partial',
    createdAt: '2026-07-22',
    assignedGuide: 'Guide Danica Reyes (+63 917 334 1122)',
    specialInstructions: 'Family traveling with young child. Request early morning river cruise slot.',
    hotelReservation: {
      id: 'htl-502',
      hotelName: 'Henann Resort Panglao',
      roomType: 'Family Pool Access Villa',
      checkInDate: '2026-09-02',
      checkOutDate: '2026-09-04',
      nights: 2,
      voucherCode: 'HTL-HEN-9104',
      status: 'Confirmed',
      contactPhone: '+63 38 502 9141',
      notes: 'Extra bed requested for child'
    },
    transportReservation: {
      id: 'trp-702',
      vehicleType: 'Private SUV Executive (Toyota Fortuner)',
      driverName: 'Driver Mark Tan',
      driverContact: '+63 928 444 1100',
      plateNumber: 'BHL-4021',
      pickupLocation: 'Panglao International Airport (TAG)',
      dropoffLocation: 'Henann Resort Panglao',
      pickupTime: '08:45 AM',
      status: 'Scheduled',
      notes: 'Driver will assist with heavy luggage'
    },
    invoice: {
      id: 'inv-1002',
      invoiceNumber: 'INV-2026-9104',
      issueDate: '2026-07-22',
      dueDate: '2026-08-20',
      totalAmount: 29400,
      amountPaid: 14700,
      balanceDue: 14700,
      status: 'Partial',
      items: [
        { description: 'Bohol Wonders & Panglao Package (3 Pax)', quantity: 3, unitPrice: 9800, totalPrice: 29400 }
      ],
      payments: [
        { id: 'pmt-03', date: '2026-07-22', amount: 14700, method: 'Credit Card', referenceNo: 'CC-901238121', status: 'Verified', notes: '50% Confirmation Deposit' }
      ]
    }
  }
];

export const INITIAL_FEEDBACKS: CustomerFeedback[] = [
  {
    id: 'fb-01',
    bookingRef: 'TT-2026-8942',
    customerName: 'Maria Santos',
    tourTitle: 'El Nido & Coron Paradise Island Hopping',
    date: '2026-07-26',
    overallRating: 5,
    guideRating: 5,
    hotelRating: 5,
    transportRating: 4,
    valueRating: 5,
    comment: 'An unforgettable capstone vacation! The Big Lagoon kayaking and seafood buffet on Shimizu island were top-tier. Guide Roger was extremely knowledgeable and kept us safe throughout the sea swell.',
    recommendationScore: 10,
    status: 'Approved'
  },
  {
    id: 'fb-02',
    bookingRef: 'TT-2026-7812',
    customerName: 'David Lee',
    tourTitle: 'Siargao Island Surfing & Sugba Lagoon Expedition',
    date: '2026-07-18',
    overallRating: 5,
    guideRating: 5,
    hotelRating: 4,
    transportRating: 5,
    valueRating: 5,
    comment: 'The surfing instructor was patient and got me standing on the board on my very first try at Cloud 9! Highly organized tour operations.',
    recommendationScore: 9,
    status: 'Approved'
  }
];
