
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