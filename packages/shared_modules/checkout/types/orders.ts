import { ORDER_STATUS } from "../constants/orderInformation";

export type PreviousOrder = {
  id: number;
  order_code: string;
  created_at: string;
  price_paid: number;
};

export type LastProcessingShopOrder = {
  data: {
    id: number;
    order_code: string;
    created_at: string;
    sts: number;
    price_calculated: number;
    price_discounted: null;
    price_shipping: number;
    price_paid: number;
  };
  order_shipping: {
    shipping_method: string;
    status: ORDER_STATUS;
    last_text_status: string;
    price: number;
    post_tracking_code: string;
    delivery_code: string;
  };
  order_items: {
    id: number;
    product_id: number;
    product_title: string;
    quantity: number;
    product_pic: string;
    price_main: number;
    price_off: number;
    price_amazing: null;
    price_paid: number;
  }[];
  type: string;
  coin_received: null | number;
  discount_code: string | null;
};
export type LastProcessingLearnOrder = {
  id: number;
  order_code: string;
  created_at: string;
  sts: number;
  price_calculated: number;
  price_discounted: null;
  price_paid: number;
  type: string;
  order_items: {
    id: number;
    product_id: number;
    product_title: string;
    quantity: number;
    product_pic: string;
    price_main: number;
    price_off: null;
    price_amazing: null;
    price_paid: number;
    variants: any[];
  }[];
  coin_received: null | number;
  discount_code: null | string;
};
