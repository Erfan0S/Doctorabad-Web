import { DiscountInfo } from "@repo/core/types/cart";
import { StaticImageData } from "next/image";

export enum PaymentProviders {
  CASH = "cash",
  SNAPP_PAY = "snapp_pay",
}

export type IsEligibleForProviderResponse = {
  successful: boolean;
  response: {
    eligible: boolean;
    title_massage: string;
    description: string;
  };
};

export type CreateOrderRequest = {
  shipping_method_id?: number;
  address_id?: number;
  discount_code_id?: number | null;
  use_credit?: boolean;
  description?: string;
};

export interface CreateProviderOrderRequest extends CreateOrderRequest {
  provider: PaymentProviders;
}

export type PaymentMethodType = {
  id: PaymentProviders;
  title: string;
  description: string;
  pic_url?: string | StaticImageData;
  icon?: React.ReactNode;
  more_info_url?: string;
  disabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
};

export type CartPayInfo = {
  discountCode: string;
  description: string;
  payWithCredit: boolean;
  discountInfo?: DiscountInfo;
  paymentMethod: PaymentProviders;
};
