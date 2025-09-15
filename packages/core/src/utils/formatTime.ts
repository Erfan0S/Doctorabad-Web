import moment from "moment-jalaali";

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

export const formatTimeJ = (
  time: string | number | Date,
  format?: string
): string => {
  moment.loadPersian({ usePersianDigits: true });
  return moment(time)
    .locale("fa")
    .format(format || "jDD jMMMM jYYYY");
};
