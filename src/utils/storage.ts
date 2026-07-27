import { Booking, CustomerFeedback, TourPackage } from '../types';
import { INITIAL_BOOKINGS, INITIAL_FEEDBACKS, INITIAL_TOUR_PACKAGES } from '../data/mockData';

const KEYS = {
  PACKAGES: 'voyage_tour_packages_v1',
  BOOKINGS: 'voyage_bookings_v1',
  FEEDBACKS: 'voyage_feedbacks_v1'
};

export const getStoredPackages = (): TourPackage[] => {
  try {
    const data = localStorage.getItem(KEYS.PACKAGES);
    return data ? JSON.parse(data) : INITIAL_TOUR_PACKAGES;
  } catch (e) {
    console.error('Error loading stored packages:', e);
    return INITIAL_TOUR_PACKAGES;
  }
};

export const savePackages = (packages: TourPackage[]) => {
  try {
    localStorage.setItem(KEYS.PACKAGES, JSON.stringify(packages));
  } catch (e) {
    console.error('Error saving packages:', e);
  }
};

export const getStoredBookings = (): Booking[] => {
  try {
    const data = localStorage.getItem(KEYS.BOOKINGS);
    return data ? JSON.parse(data) : INITIAL_BOOKINGS;
  } catch (e) {
    console.error('Error loading stored bookings:', e);
    return INITIAL_BOOKINGS;
  }
};

export const saveBookings = (bookings: Booking[]) => {
  try {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error('Error saving bookings:', e);
  }
};

export const getStoredFeedbacks = (): CustomerFeedback[] => {
  try {
    const data = localStorage.getItem(KEYS.FEEDBACKS);
    return data ? JSON.parse(data) : INITIAL_FEEDBACKS;
  } catch (e) {
    console.error('Error loading stored feedbacks:', e);
    return INITIAL_FEEDBACKS;
  }
};

export const saveFeedbacks = (feedbacks: CustomerFeedback[]) => {
  try {
    localStorage.setItem(KEYS.FEEDBACKS, JSON.stringify(feedbacks));
  } catch (e) {
    console.error('Error saving feedbacks:', e);
  }
};

export const resetAllData = () => {
  try {
    localStorage.removeItem(KEYS.PACKAGES);
    localStorage.removeItem(KEYS.BOOKINGS);
    localStorage.removeItem(KEYS.FEEDBACKS);
  } catch (e) {
    console.error('Error resetting storage data:', e);
  }
};
