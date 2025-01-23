export interface HelpText {
  help_text: string;
}

export enum OfferType {
  DISCOUNT = 1,
  CHARITY = 2,
}

export interface CustomerState {
  id: number;
  title: string;
  color_code: string;
}

export interface DiscountCode {
  id: number;
  code: string;
  expired_at: string;
}

export interface ClubOffer {
  id: number;
  title: string;
  description: string;
  coins: number;
  expired_at: string;
  response_description: null | string;
  type: OfferType;
  pic_url: null | string;
  customer_states: CustomerState[];
  discount_codes: DiscountCode[];
}

export interface BuyOfferResponse {
  code: string;
  expired_at: string;
  percent: number;
  coins: {
    all: number;
    current: number;
  };
}

export interface ClubTransaction {
  id: number;
  amount: number;
  created_at: string;
  transaction_type: number;
  reason: string;
  club_plan: null | Pick<
    ClubOffer,
    "id" | "title" | "description" | "expired_at" | "discount_codes"
  >;
}
