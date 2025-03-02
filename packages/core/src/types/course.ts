export interface CourseFavoriteItem {
  id: number;
  language: null;
  pic_url: string;
  provider_id: number;
  provider_name: string;
  title: string;
}

export type CourseOrderItem = {
  created_at: string;
  id: number;
  oder_code: string;
  price_paid: number;
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
