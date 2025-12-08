/**
 * Calculate milliseconds until midnight (12 AM) of the current day
 * @returns The number of milliseconds from now until midnight
 */
export const getMillisecondsUntilMidnight = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - now.getTime();
};


