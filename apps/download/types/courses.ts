import { PaginatedResponse } from "@repo/core/types/general";
import { ProviderType } from "./homePage";

export interface Lesson {
  id: number;
  title: string;
  duration: number;
}

export interface Chapter {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Section {
  id: number;
  title: string;
  chapters: Chapter[];
}

// export interface Category {
//   id: number;
//   title: string;
// }

export interface CourseDataType {
  id: number;
  title: string;
  description: string;
  provider: ProviderType;
  language: number;
  categories: Category[];
  fields: any[];
  grades: any[];
  course_duration: number;
  student_count: number;
  keywords?: string[];
  meta_description: string | null;
  only_watchable_on_app: boolean;
  user_has_access: boolean;
  price_main: number;
  price_off: number | null;
  price_amazing: number | null;
  amazing_end_date: string | null;
  is_sellable: boolean;
  coins: number;
  user_favorite: number;
  course_preview: string;
  course_pic: string;
  sections: Section[];
  installment_payment: boolean;
  installment_text: string | null;
}
export enum CourseTab {
  SPECIFICATIONS = "specifications",
  LESSONS = "lessons",
  DESCRIPTION = "description",
  COMMENTS = "comments",
  RELATED_PRODUCTS = "relatedProducts",
}

export enum HomeTabs {
  PACKAGES = "packages",
  COLLECTIONS = "collections",
  PUBLISHERS = "publishers",
}

export enum ProviderTabs {
  PACKAGES = "packages",
  DESCRIPTION = "description",
}

// TODO: may need to delete
export interface TabData {
  id: CourseTab | HomeTabs | ProviderTabs | string;
  title: string;
  url?: string;
}

export type PackageListItemType = {
  id: number;
  title: string;
  picture: string;
  main_price: number;
  off_price: number;
  language: number;
  category: [{ id: number; title: string }];
  provider: string;
  sell_count: number;
  download_count: number;
  publish_date: number;
  installment_payment?: boolean;
};
export type PackageOrderListItemType = {
  id: number;
  title: string;
  picture: string;
  main_price: number;
  language: number;
  category: {
    id: number;
    name: string;
  };
  provider: string;
  sell_count: number;
  download_count: number;
  publish_date: number;
  installment_payment?: boolean;
  order_code: string;
  created_at: string;
};
export interface PaginatedAmazingCourses
  extends PaginatedResponse<PackageListItemType[]> {
  amazing_time: string;
}

export type CourseComents = {
  id: number;
  user_name: string;
  user_avatar_url: string;
  text: string;
  created_at: string;
  reply_text: string;
  updated_at: string;
};

export type Urls = {
  hls: string;
  dash: string;
  player: string;
  source: string;
  thumbnail: string;
};

export type VideoType = {
  id: number;
  title: string;
  urls: Urls;
  duration: number;
};

export type previousOrders = {
  id: number;
  created_at: string;
  order_code: string;
  price_paid: number;
};

export interface Note {
  id: number;
  jump_time: number;
  title: string;
  description: string;
  lesson_id: number;
  lesson_title: string;
}

export interface CourseShare {
  title: string;
  description: string;
  course_url: null | string;
}


export interface PackageItem {
  id: number;
  title: string;
  picture: string;
  provider_id: number;
  provider_picture: string;
  main_price: number | null;
  off_price: number | null;

  category: Category[];
  subjects: Subject[];
  fields: Field[];
  grades: Grade[];

  authors: Author[];
  translators: Translator[];

  language: Language;
  publish_date: string;
  size: number;
  edition: string;
  volume: string;
  page: number;
  currency: number;
  file_type: FileType;
  description: string;

  sample_file: SampleFile[];

  only_usable_on_app: boolean;
  coins: number;
  favorite: boolean;
  user_has_access: boolean;
  installment_payment: boolean;
  installment_text: string | null;
}

export interface BaseEntity {
  id: number;
  title: string;
}

export type Category = BaseEntity;
export type Subject = BaseEntity;
export type Field = BaseEntity;
export type Grade = BaseEntity;
export type Author = BaseEntity;
export type Translator = BaseEntity;

export interface SampleFile {
  id: number;
  url: string;
  size: number;
}

export enum Language {
  Persian = 1,
  English = 2,
  Arabic = 3,
}

export enum FileType {
  Pdf = 1,
  Epub = 2,
  PowerPoint = 3,
}