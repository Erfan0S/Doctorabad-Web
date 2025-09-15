export const calculatePercentage = (
  correct: number,
  wrong: number,
  total: number,
  negativeScore: boolean = false
) => {
  if (negativeScore) {
    return (((3 * correct - wrong) / (3 * total)) * 100).toFixed(1);
  } else {
    return ((correct / total) * 100).toFixed(1);
  }
};
