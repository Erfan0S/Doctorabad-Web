import { OrderType } from "@repo/core/types/cart";
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
export type OrderShippingInfo = {
  shipping_method: string;
  shipping_method_description: string;
  status: number;
  last_text_status: string;
  price: number;
  post_tracking_code: string;
  delivery_code: string;
};

export type CartOrderProductItem = {
  id: number;
  product_pic_url: string | null;
  product_title: string;
  price: number;
  quantity: number;
  variants: any[];
};

export type CartOrderCourseItem = {
  id: number;
  course_pic_url: string;
  course_title: string;
  price: number;
  course_language: number;
  only_watchable_on_app: boolean;
};

type CartOrderExamItem = {
  id: number;
  exam_title: string;
  exam_pic_url: string | null;
  price: number;
};

export type CartOrderDetails = {
  id: number;
  type: string;
  sts: number;
  order_code: string;
  created_at: string;
  price_calculated: number;
  price_discounted: number | null;
  price_shipping: number;
  price_paid: number;
  discount_code: string | null;
  received_coins: number | null;
  received_discount_code: string | null;
  order_shipping: OrderShippingInfo;
  shop_products: CartOrderProductItem[];
  courses: CartOrderCourseItem[];
  exams: CartOrderExamItem[];
  package: CartOrderPackageItem[];
  insurance: CartOrderInsuranceItem[];
};

export type OrderDetailItemType = {
  id: number;
  price: number;
  quantity: number;
  title: string;
  pic_url: string | null;
  product_type: OrderType;
  price_main?: number;
  draft?: {
    field_id?: number;
    speciality_id?: number;
    residency_status?: number;
    damage_history_id?: number;
    postal_code?: string;
    city_id?: number;
    province_id?: number;
    active_clinic?: boolean;
    clinic_address?: string | null;
  };
};
export type CartOrderPackageItem = {
  id: number;
  price: number;
  package_title: string;
  package_pic_url: string | null;
};


type CartOrderInsuranceItem = {
  id: number;
  insurance_id: number;
  insurance_title: string;
  insurance_pic: string;
  price: number;
  draft: {
    id: number;
    draft_id: number;
    insured_name: string;
    insured_phone: string;
    field_id: number;
    field: string;
    speciality_id: number;
    speciality: string;
    residency_status: number;
    damage_history_id: number;
    damage_history: string;
    last_insurance_id: number | null;
    last_insurance: string | null;
    current_insurance_end_date: string | null;
    active_clinic: boolean;
    province_id: number;
    province: string;
    city_id: number;
    city: string;
    clinic_address: string | null;
    postal_code: string;
  };
};

