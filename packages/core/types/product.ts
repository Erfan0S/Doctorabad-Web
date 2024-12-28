export interface Product {
  id: number;
  title: string;
  title_en: string;
  slug: string;
  quantity: number;
  product_pic: string;
  price_main: number;
  price_off: number;
  price_amazing: null;
  provider: null;
  has_variant: boolean;
  user_favorite: number;
}
