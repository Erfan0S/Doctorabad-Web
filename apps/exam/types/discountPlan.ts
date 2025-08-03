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
