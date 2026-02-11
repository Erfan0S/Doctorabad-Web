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

export interface ClubTransactionCoins {
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

export type MissionType = {
  id: number;
  title: string;
  point_label: string;
  description: string | null;
  picture: string | null;
  active: boolean;
  button_text?: string;
  onClick?: (
    isActive: boolean,
    setActive: (active: boolean) => void,
    setLoading: (loading: boolean) => void,
  ) => void;
};

export type UserRankingDetailType = {
  user_ranking: number;
  users_count: number;
  state_detail: string;
};

export type RankingUserType = {
  id: number;
  profile_picture: string | null;
  name: string;
  point_sum: number;
};

export type UserCoinPointsType = {
  coin_sum: number;
  point_sum: number;
};

export type ClubTransactionPoint = {
  id: number;
  mission: string;
  point: number;
  created_at: string;
};
