/**
 * Utility functions for tracking daily medicine views
 */

/**
 * Get localStorage key for tracking medicine views
 * Format: medicine_view_{medicineId}_{YYYY-MM-DD}
 */
export const getStorageKey = (medicineId: number): string => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  return `medicine_view_${medicineId}_${today}`;
};

/**
 * Check if a medicine has been viewed today
 * @param medicineId - The ID of the medicine
 * @returns true if the medicine has been viewed today, false otherwise
 */
export const hasViewedToday = (medicineId: number): boolean => {
  if (typeof window === 'undefined') return false;
  const key = getStorageKey(medicineId);
  return !!localStorage.getItem(key);
};

/**
 * Mark a medicine as viewed today
 * @param medicineId - The ID of the medicine
 */
export const markAsViewedToday = (medicineId: number): void => {
  if (typeof window === 'undefined') return;
  const key = getStorageKey(medicineId);
  localStorage.setItem(key, 'true');
};

/**
 * Check if a medicine can be tracked (user is logged in and hasn't viewed today)
 * @param medicineId - The ID of the medicine
 * @param isUserLoggedIn - Function to check if user is logged in
 * @returns true if the medicine can be tracked, false otherwise
 */
export const canTrackMedicineView = (
  medicineId: number,
  isUserLoggedIn: () => boolean
): boolean => {
  return isUserLoggedIn() && !hasViewedToday(medicineId);
};

