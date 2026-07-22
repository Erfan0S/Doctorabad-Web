import { ProviderType } from "./homePage";

export type FilterModalType = {
  title: string;
  items: { id: number | string; title: string }[];
  queryKey: string;
  singleSelection?: boolean;
};

export type FieldGradeType = {
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

export type Categories = {
  id: number;
  title: string;
};

export enum FiltersNames {
  FIELD = "field",
  GRADE = "grade",
  CATEGORY = "category",
  SUBJECT = "subject",
  LANGUAGE = "language",
  SORT = "sort",
  FREE = "free",
}
export enum SortType {
  NEWEST = "newest",
  CHEAPEST = "cheapest",
  EXPENSIVE = "expensive",
  BESTSELLING = "bestselling",
  FAVORITE = "favorite",
  PRIORITY = "priority",
  OLDEST = "oldest",
}

export type FiltersInputs = {
  title: string;
  field: number;
  grade: number;
  language: number[];
  free: 0 | 1;
  suggested: 0 | 1;
  order_by:
    | "newest"
    | "bestselling"
    | "oldest"
    | "cheapest"
    | "expensive"
    | "favorite"
    | "priority";
};


