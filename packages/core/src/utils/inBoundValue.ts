export const inBoundValue = (
  value: number | undefined,
  min: number,
  max: number
) => {
  if (!value) return undefined;
  if (value < min) return min;
  if (value > max) return max;
  return value;
};
