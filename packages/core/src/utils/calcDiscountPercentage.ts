export const calcDiscountPercentage = (mainPrice: number, offPrice: number) => {
  return Math.ceil((mainPrice - offPrice) / (mainPrice / 100));
};
