// import { CourseListItemType } from "./courses";

export interface ProviderType {
  id: number;
  name: string;
  picture: string;
}

export type CollectionType = {
  id: number;
  title: string;
  picture: string;
};
export type SubjectType = {
  id: number;
  title: string;
};

export type SliderType = {
  id: number;
  title: string;
  url: null | string;
  package_id: null | number;
  provider_id: null | number;
  collection_id: null | number;
  picture: string;
};

export enum CourseListType {
  Suggested = "suggested",
  Newest = "newest",
  BestSeller = "best-seller",
  Amazing = "amazing",
}

export enum HomePagePackageSliders {
  MyPackages = "my-packages",
  Suggested = "suggested",
  Newest = "newest",
  BestSelling = "best-selling",
  LastViewed = "last-viewed",
}
