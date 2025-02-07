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

export interface TabData {
  id: CourseTab | HomeTabs;
  title: string;
}

export type CourseListItemType = {
  id: number;
  title: string;
  pic_url: string | null;
  price_main: number;
  price_off: number | null;
  price_amazing: number | null;
};

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
