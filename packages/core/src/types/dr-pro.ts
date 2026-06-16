// export interface PlansList {
//     data: PlanItem[];
// }

export interface PlanItem {
  id: number;
  title: string;
  duration: number;
  free_shipping_count: number;
  main_price: number;
  off_price: number | null;
  summary: string;
  description: string;
  installment_payment: boolean;
  installment_text: string | null;
}

export interface ExplanationItem {
  picture: string;
  title: string;
  description: string;
}

export interface DrProActivePlan {
  id: number;
  plan_id: number;
  title: string;
  duration: number;
  free_shipping_count: number;
  remaining_free_shipping: number;
  expired_at: string;
  left_days: number;
}

export interface DiscountCodeResponse {
  discount_code_id: number;
  new_price: number;
}

export interface CreateDrProOrderResponse {
  data: { url: string; message: string };
  status: string;
}
