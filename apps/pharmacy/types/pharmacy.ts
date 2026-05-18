export interface Medicine {
  id: number;
  title_fa?: string;
  title_en?: string;
  picture: string;
}
export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface MedicineListResponse {
  data: Medicine[];
  links: PaginationLinks;
  meta: PaginationMeta;
}


export interface MedicineCategory {
  id: number;
  title: string;
  has_children: boolean;
}

export interface MedicineTreatment {
  id: number;
  title_fa: string;
  title_en: string;
}

export interface FavoriteMedicine extends Medicine {
  favorite: boolean;
}

export interface Slider {
  id: 13;
  title: string | null;
  url: string | null;
  medicine_id: number;
  picture: string;
}

export interface ErrorReport {
  id: number;
  report: string;
}

export interface MedicineListParams {
  title?: string;
  category_id?: number;
  page?: number;
}

export interface FavoriteStoreParams {
  medicine_id: number;
  favorite: 0 | 1;
}

export interface MedicineDetails {
  id: number;
  title_fa: string;
  title_en: string;
  picture: string;
  effect_mechanism: string;
  brands: string[];
  shapes: string[];
  use_case: string;
  direction: {
    adult: string[];
    child: string[];
    elder?: string[];
  };
  prevention: string;
  pregnant: string;
  side_effects: string[];
  interaction_description: string[];
  interaction_medicines: {
    id: number;
    title_fa: string;
    title_en: string;
  }[];
  poisoning: string[];
  points: string;
  is_favorite: boolean;
  categories: {
    id: number;
    title: string;
    parent: number | null;
  }[];
  files: {
    id: number;
    file: string;
    use_type: number;
  }[];
  keywords: string[];
  meta_description: string;
}


export enum HeaderType {
  FAVORITES = "favorites",
  MEDICINE_DETAILS = "medicine_details",
  OTHERS = "others",
  HOME = "home"
}