import { CartVariants } from "./productVariants";

export type Order = {
  discount_plan_type: null;
  id: number;
  product_pic: string;
  product_title: string;
  quantity: number;
  price_main: number;
  price_off: number;
  price_paid: number;
  product_id: number;
  price_amazing: number | null;
  variants: CartVariants[];
};

// export type CartResponse = {
//   data: Order[];
//   count: string;
//   coins: number;
//   price_main: number;
//   my_profit: number;
//   price_paid: number;
//   user_credit: number;
// };

export type CartResponse = {
  coins: number;
  count: number;
  data: Order[];
  my_profit: number;
  need_shipping: boolean;
  price_main: number;
  price_paid: number;
  user_credit: number;
};

export type CartState = CartResponse & { initLoading: boolean };

export interface ShippingAddress {
  id: number;
  receiver: string | null;
  mobile: string;
  national_code: string | null;
  province_id: number | null;
  city_id: number | null;
  province_title: string | null;
  city_title: string | null;
  urban_area: number | null;
  address: string | null;
  postal_code: number | null;
  longitude: number | null;
  latitude: number | null;
  default: 0 | 1;
}

export type ShippingMethod = {
  id: number;
  title: string;
  price: number;
  pic_url: string;
  description: string;
};

export type CreateOrderRequest = {
  shipping_method_id: number;
  address_id: number;
  discount_code_id?: number | null;
  use_credit?: boolean;
  description?: string;
};

export type DiscountInfo = {
  discount_code_id: number;
  price_paid: number;
};

export type CreateOrderResponse = {
  data: {
    url?: string;
    message: string;
    identifier?: string;
  };
};

export type PaymentResult = {
  data: {
    order_code: string;
    created_at: string;
    sts: number;
  };
  type: string;
  post_tracking_code: string;
  coin_received: number;
  discount_code: string;
};

export enum OrderType {
  ShopProduct = "shopProduct",
  Course = "course",
}

export enum ChangeQuantityType {
  Increase = "increase",
  Decrease = "decrease",
}
