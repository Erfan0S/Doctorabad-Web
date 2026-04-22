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

export type categories = {
  id: number;
  title: string;
};

export enum FiltersNames {
  FIELD = "field",
  GRADE = "grade",
  CATEGORY = "category",
  PROVIDER = "provider",
  LANGUAGE = "language",
  SORT = "sort",
}
export enum SortType {
  NEWEST = "newest",
  CHEAPEST = "cheapest",
  EXPENSIVE = "expensive",
  BESTSELLING = "bestselling",
  FAVORITE = "favorite",
}
