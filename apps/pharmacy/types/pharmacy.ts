
export interface Medicine {
  id: number;
  title: string;
  title_fa?: string;
  title_en?: string;
  category_id?: number;
  // سایر فیلدهای مورد نیاز
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
}

export interface FavoriteStoreParams {
  medicine_id: number;
  favorite: 0 | 1;
}