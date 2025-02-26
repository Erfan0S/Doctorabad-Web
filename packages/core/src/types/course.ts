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
