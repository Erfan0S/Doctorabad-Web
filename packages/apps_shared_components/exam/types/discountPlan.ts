export interface DiscountPlanType {
  id: number;
  title: string;
  description: string;
  duration: number;
  main_price: number;
  off_price: number;
  vip: boolean;
  free: boolean;
}

export type HasDiscountPlanType = {
  data: unknown[];
  used_free: boolean;
};
