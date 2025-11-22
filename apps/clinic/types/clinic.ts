export interface Disease {
  id: number;
  title_fa?: string;
  title_en?: string;
  picture: string;
  categories:[{
    id: number;
    title: string;
  }];
  has_order: boolean;
  has_prescription: boolean;
  is_free: boolean;
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

export interface DiseaseListResponse {
  data: Disease[];
  links: PaginationLinks;
  meta: PaginationMeta;
}


export interface DiseaseCategory {
  id: number;
  title: string;
  has_children: boolean;
}

export interface DiseaseTreatment {
  id: number;
  title_fa: string;
  title_en: string;
}

export interface FavoriteDisease extends Disease {
  favorite: boolean;
}

export interface Slider {
  id: number;
  title: string | null;
  url: string | null;
  clinic_id: number;
  picture: string;
}

export interface ErrorReport {
  id: number;
  report: string;
}

export interface DiseaseListParams {
  title?: string;
  category_id?: number;
  page?: number;
}

export interface FavoriteStoreParams {
  disease_id: number;
  favorite: 0 | 1;
}

export interface DiseaseDetails {
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
  interaction_diseases: {
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
}


export enum HeaderType {
  FAVORITES = "favorites",
  DISEASE_DETAILS = "disease_details",
  OTHERS = "others"
}