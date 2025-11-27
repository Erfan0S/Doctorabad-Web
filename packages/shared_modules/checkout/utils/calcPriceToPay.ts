import { CartPayInfo } from "../types/cart";

export const calcPriceToPay = (
  price_paid: number,
  payInfo: CartPayInfo,
  shippingPrice: number = 0,
  user_credit: number = 0
) => {
  const { payWithCredit } = payInfo;
  const totalPrice =
    (payInfo.discountInfo?.price_paid || price_paid) + shippingPrice;
  return Math.max(totalPrice - (payWithCredit ? user_credit : 0), 0);
};
