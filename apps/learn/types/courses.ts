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

export interface Category {
  id: number;
  title: string;
}

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
  LESSONS = "lessons",
  DESCRIPTION = "description",
  COMMENTS = "comments",
  RELATED_PRODUCTS = "relatedProducts",
}

export enum HomeTabs {
  COURSES = "courses",
  CATEGORIES = "categories",
  PROVIDERS = "providers",
}

export enum ProviderTabs {
  COURSES = "courses",
  DESCRIPTION = "description",
}

export type CourseListItemType = {
  id: number;
  title: string;
  pic_url: string;
  price_main: number;
  price_off: number | null;
  price_amazing: number | null;
  only_watchable_on_app: boolean;
  language: number;
  provider: {
    id: number;
    name: string;
    pic_url: string;
  };
  duration: number;
  student_count: number;
  installment_payment?: boolean;
};

export interface PaginatedAmazingCourses extends PaginatedResponse<
  CourseListItemType[]
> {
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
