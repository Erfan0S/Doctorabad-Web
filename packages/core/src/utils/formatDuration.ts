const formatDuration = (totalSeconds: number, showSeconds = false): string => {
  if (!totalSeconds || totalSeconds <= 0) return "00:00:00";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}${showSeconds ? `:${seconds.toString().padStart(2, "0")}` : ""}`;
};

export default formatDuration;
