export interface CourseFavoriteItem {
  id: number;
  language: null;
  pic_url: string;
  provider_id: number;
  provider_name: string;
  title: string;
}

export type CourseOrderItemOld = {
  created_at: string;
  id: number;
  oder_code: string;
  price_paid: number;
};

export type CourseOrderItem = {
  created_at: string;
  duration: number;
  id: number;
  language: number;
  only_watchable_on_app: boolean;
  order_code: string;
  pic_url: string;
  price_amazing: number | null;
  price_main: number;
  price_off: number | null;
  title: string;
};

export type CourseListItemType = {
  id: number;
  title: string;
  pic_url: string;
  price_main: number;
  price_off: number | null;
  price_amazing: number | null;
  language: number;
  provider: {
    id: number;
    name: string;
    pic_url: string;
  };
  duration: number;
  student_count: number;
};
