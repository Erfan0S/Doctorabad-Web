export type PreviousOrder = {
  id: number;
  order_code: string;
  created_at: string;
  price_paid: number;
};

export type ExamOrderItem = {
  id: number;
  title: string;
  pic_url?: string;
  price_main: number;
  price_off?: number;
  price_amazing?: number;
  order_code: string;
  created_at: string;
};

export type OrderMetaData = {
  order_code: string;
  created_at: string;
  price_main: number;
  price_off?: number;
  price_amazing?: number;
};
