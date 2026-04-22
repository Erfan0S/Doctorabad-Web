import { toPersianNumbers } from "@repo/core/utils/toPerianNumbers";

export const convertSecondsToNormalTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${toPersianNumbers(minutes.toString().padStart(2, "0"))}:${toPersianNumbers(remainingSeconds.toString().padStart(2, "0"))}`;
};
