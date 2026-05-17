export interface Disease {
  id: number;
  title_fa?: string;
  title_en?: string;
  picture: string;
  categories: [
    {
      id: number;
      title: string;
    },
  ];
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
  picture: string | null;
  introduction: {
    type: string[];
    preface: string[];
    definition: string[];
  };
  epidemiology: string | null;
  physiopathology: string | null;
  risk_factor: string[] | string;
  differential_diagnosis_description: string[] | string;
  differential_diagnosis:
    | {
        id: number;
        title_fa: string;
        title_en: string;
      }[]
    | string;
  treatment_description:
    | {
        plan: string[];
        order: string[];
        prescription: string[];
      }
    | string;
  treatment:
    | {
        id: number;
        title_fa: string;
        title_en: string;
      }[]
    | string;
  prognosis: string | null;
  side_effect: string | null;
  clinical_demonstration:
    | {
        sign: string[];
        symptom: string[];
      }
    | string;
  physical_exam: string | null;
  paraclinic_info: string[] | string;
  diagnosis: string | null;
  prevention: string | null;
  complementary_medicine: string | null;
  point: string[] | string;
  is_favorite: boolean;
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
  DISEASE_DETAILS = "disease_details",
  OTHERS = "others",
  HOME = "home"
}

export interface DiscountPlan {
  id: number;
  title: string;
  description: string;
  duration: number;
  main_price: number | null;
  off_price: number | null;
  vip: boolean;
  free: boolean;
  installment_payment: boolean;
  installment_text: string | null;
}

export interface UserDiscountPlans {
  data: DiscountPlan[];
  used_free: boolean;
}
