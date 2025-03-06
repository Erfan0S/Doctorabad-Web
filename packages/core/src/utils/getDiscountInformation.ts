import { calcDiscountPercentage } from "./calcDiscountPercentage";

export const getDiscountInformation = (
  price_main: number = 0,
  price_off?: number,
  price_amazing?: number
) => {
  let offPrice = null;
  let discount = null;

  if (price_off || price_amazing) {
    discount = calcDiscountPercentage(
      price_main,
      (price_amazing || price_off) as number
    );
    offPrice = price_amazing || price_off;
  }
  // else if (product.discount_festivals[0]) {
  //   const discountFestival = product.discount_festivals[0];

  //   if (discountFestival.percent) {
  //     discount = discountFestival.percent;
  //     const discountPrice = (product.main_price / 100) * discount;
  //     offPrice = product.main_price - Math.min(discountFestival.max_cost || 0, discountPrice);
  //   } else if (discountFestival?.amount) {
  //     offPrice = product.main_price - discountFestival.amount;
  //   }
  // }

  return {
    discountPercent: discount,
    offPrice,
    mainPrice: price_main,
  };
};
