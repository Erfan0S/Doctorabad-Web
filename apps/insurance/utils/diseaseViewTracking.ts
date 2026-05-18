/**
 * Utility functions for tracking daily disease views
 */

/**
 * Get localStorage key for tracking disease views
 * Format: disease_view_{diseaseId}_{YYYY-MM-DD}
 */
export const getStorageKey = (diseaseId: number): string => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  return `disease_view_${diseaseId}_${today}`;
};

/**
 * Check if a disease has been viewed today
 * @param diseaseId - The ID of the disease
 * @returns true if the disease has been viewed today, false otherwise
 */
export const hasViewedToday = (diseaseId: number): boolean => {
  if (typeof window === 'undefined') return false;
  const key = getStorageKey(diseaseId);
  return !!localStorage.getItem(key);
};

/**
 * Mark a disease as viewed today
 * @param diseaseId - The ID of the disease
 */
export const markAsViewedToday = (diseaseId: number): void => {
  if (typeof window === 'undefined') return;
  const key = getStorageKey(diseaseId);
  localStorage.setItem(key, 'true');
};

/**
 * Check if a disease can be tracked (user is logged in and hasn't viewed today)
 * @param diseaseId - The ID of the disease
 * @param isUserLoggedIn - Function to check if user is logged in
 * @returns true if the disease can be tracked, false otherwise
 */
export const canTrackDiseaseView = (
  diseaseId: number,
  isUserLoggedIn: () => boolean
): boolean => {
  return isUserLoggedIn() && !hasViewedToday(diseaseId);
};

