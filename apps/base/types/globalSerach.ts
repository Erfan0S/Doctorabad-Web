export type SearchProductType =
  | "shopProduct"
  | "course"
  | "package"
  | "exam"
  | "medicine"
  | "clinic";

// ---- آیتم‌های هر نوع محصول ----

export interface ClinicItem {
  id: number;
  title_fa: string;
  title_en: string;
  picture: string | null;
  categories: {
    id: number;
    title: string;
  }[];
  has_order: boolean;
  has_prescription: boolean;
  is_free: boolean;
}

export interface CourseItem {
  id: number;
  title: string;
  pic_url: string | null;
  price_main: number | null;
  price_off: number | null;
  price_amazing: number | null;
  only_watchable_on_app: boolean;
  installment_payment: boolean;
}

export interface ExamItem {
  id: number;
  title: string;
  picture: string | null;
  main_price: number | null;
  off_price: number | null;
  installment_payment: boolean;
  installment_text: string | null;
}

export interface MedicineItem {
  id: number;
  title_fa: string;
  title_en: string;
  picture: string | null;
  shape_coding: string[];
}

export interface PackageItem {
  id: number;
  title: string;
  picture: string | null;
  main_price: number | null;
  off_price: number | null;
  installment_payment: boolean;
}

export interface ShopProductItem {
  id: number;
  title: string;
  product_pic: string | null;
  price_main: number | null;
  price_off: number | null;
  price_amazing: number | null;
  has_variant: boolean;
  installment_payment: boolean;
}

// ---- بلوک هر نوع محصول ----

export interface SearchSection<TType extends SearchProductType, TItem> {
  items: TItem[];
  product_type: TType;
  see_more: boolean;
}

// ---- تایپ اصلی (همه بخش‌ها اختیاری) ----

export interface GlobalSearchItem {
  clinic?: SearchSection<"clinic", ClinicItem>;
  course?: SearchSection<"course", CourseItem>;
  exam?: SearchSection<"exam", ExamItem>;
  medicine?: SearchSection<"medicine", MedicineItem>;
  package?: SearchSection<"package", PackageItem>;
  shopProduct?: SearchSection<"shopProduct", ShopProductItem>;
}

export interface PopularSearchItem {
  id: number;
  product_id: number;
  product_type: SearchProductType;
  title: string;
}

export interface SearchHistoryItem {
  id: number;
  search: string;
}
