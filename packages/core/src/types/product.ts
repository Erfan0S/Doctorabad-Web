import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { NextPageProps } from "./general";
import { Variants } from "./productVariants";

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

export type ProductCard = Product & {
  gridView?: boolean;
  lazyLoadImage?: boolean;
};
export interface SingleProductSellerInfo {
  name: string;
  url?: string;
}

export interface SingleProductFaq {
  id: number;
  question: string;
  answer: string;
}
export interface SingleProductSpecification {
  id: number;
  key: string;
  value: string | ReactNode;
}

export interface ProductDynamicData {
  id: number;
  product_id: number;
  option_id: number;
  option_value_id: null | number;
  option_value_text: string;
  shop_option: {
    id: number;
    title: string;
    DT_RowId: number;
  };
}

export interface SingleProductComment {
  id: number;
  username: string;
  createdAt: string;
  comment: string;
  avatar: StaticImageData;
  reply?: SingleProductComment[];
}

export enum ProductShippingType {
  SHIP_WITH_DELAY = 1,
  SHIP_IMMEDIATELY = 2,
}

interface ProductGeneralField {
  id: number;
  title: string;
  DT_RowId: number;
}

export interface SingleProductFile {
  url: string;
  size: number;
  metadata: {
    ext: string;
    mimeType: string;
  };
}

export interface SingleProductGeneralField {
  id: number;
  title: string;
}

export interface SingleProductOption {
  key: string;
  value: string;
}

export interface SingleProduct {
  id: number;
  title: string;
  title_en: string;
  summary: string;
  description: string;
  sku_code: string;
  weight: number;
  quantity: number;
  slug: string;
  coins: number;
  sts: string;
  product_pic: string;
  price_main: number;
  price_off: number;
  price_amazing: number | null;
  amazing_end_date: null;
  user_favorite?: boolean;
  variants: Variants;
  keywords: string[];
  meta_description: string;
  provider: {
    id: number;
    name: string;
    pic_url: string;
  };
  files: SingleProductFile[];
  fields: SingleProductGeneralField[];
  category: (SingleProductGeneralField & { parent: number | null })[];
  product_type: SingleProductGeneralField[];
  grades: (SingleProductGeneralField & { field_id: number })[];
  options: SingleProductOption[];
  sample_file: ProductSampleFile[];
}

export interface ProductSampleFile {
  size: number;
  url: string;
  metadata: {
    type: number;
    size: number;
  };
}

export enum ProductTab {
  DESCRIPTION = "description",
  SPECIFICATIONS = "specifications",
  RELATED_PRODUCTS = "relatedProducts",
  COMMENTS = "comments",
}

export interface ProductTabData {
  id: ProductTab;
  title: string;
}

export interface ProductListOptions {
  category?: string;
  onlyAvailable?: "0" | "1";
  sort?: "cheapest" | "expensive" | "newest" | "bestselling" | "favorite";
}

export enum ProductListType {
  ARCHIVE = "archive",
  SUGGESTED = "suggested",
  NEWEST = "newest",
  AMAZING = "amazing",
  SEARCH = "search",
  FESTIVAL = "festival",
  BEST_SELLING = "bestselling",
}

export type ProductListProps = NextPageProps<{ type: ProductListType }>;

export type AmazingProduct = Product & {
  amazing_end_date: string;
  amazing_start_date: string;
  amazing_price: number;
};

export interface CommentItem {
  id: number;
  user_name: string;
  user_avatar_url: string;
  created_at: string;
  text: string;
  reply_text: string;
  updated_at: string;
}

export interface ProductComments {
  rate: string;
  rate_count: number;
  data: CommentItem[];
}

export interface ProductShare {
  title: string;
  description: string;
  product_url: null | string;
}
