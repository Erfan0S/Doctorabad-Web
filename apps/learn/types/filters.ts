import { ProviderType } from "./homePage";

export type FieldGrade = {
  id: number;
  title: string;
};

export type Language = {
  id: number;
  language: string;
};

export type PriceRange = {
  min_price: number;
  max_price: number;
};

export type FilterListItemsType = {
  id: number;
  title: string;
  pic_url: string;
  price_main: number;
  price_off: number | null;
  price_amazing: number | null;
  language: number;
  provider: ProviderType;
  duration: number;
  student_count: number;
};
