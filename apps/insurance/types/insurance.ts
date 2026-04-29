// @/types/insurance.ts

export interface InsuranceField {
  id: number;
  title: string;
  // ... other fields
}

export interface GetGradesInput {
  fields: number[];
}

export interface InsuranceGrade {
  id: number;
  title: string;
  // ... other fields
}

export interface ResidencyStatus {
  id: number;
  title: string;
  // ...
}

export interface DamageHistory {
  id: number;
  title: string;
  // ...
}

export interface Insurer {
  id: number;
  title: string;
  // ...
}


// types/insurance.ts
export interface Insurer {
  id: number;
  title: string;
  picture: string;
  summary: string;
  damage_branch_count: number;
  main_price: number;
  off_price: number | null;
  amazing_price: number | null;
  residency_status: boolean;
  description: string;
  payment_commitment: string;
  need_active_medical_education_card: boolean;
  installment_payment: boolean;
}

export interface InsuranceListParams {
  page?: number;
  field: number | null;
  grade: number | null;
  residency_status?: number;
  damage_history?: number;
  last_insurance?: number;
  current_insurance_end_date: string | null;
}


export interface Province {
  id: number;
  title: string;
}

export interface City {
  id: number;
  title: string;
  province_id: number;
}

export interface UploadFileResponse {
  file: number; // ID فایل آپلود شده
}



// 1. تایپ برای دریافت اطلاعات (GET Response)
export interface InsuranceInfoFile {
  id: number;
  url: string; // یا file_link طبق مثال شما
  // سایر فیلدهای فایل اگر هست
}

export interface InsuranceInfo {
  id: number;
  title: string;
  field_id: number;
  grade_id: number;
  residency_status: boolean; // یا boolean، طبق داکیومنت بکند چک کنید (در مثال POST گفتید false ولی معمولا status عدد است)
  
  // فایل‌ها در پاسخ GET آرایه‌ای از آبجکت هستند
  national_id_card_files: InsuranceInfoFile[]; 
  medical_education_card_files: InsuranceInfoFile[];
  last_insurance_files: InsuranceInfoFile[];
  
  active_clinic: boolean;
  city_id?: number;
  province_id?: number;
  clinic_address?: string;
  insured_name?: string;
  insured_phone?: string;
  postal_code?: string;
}

// 2. تایپ برای ارسال اطلاعات (POST/PUT Payload)
export interface StoreInsuranceInfoResponse {
  id: number;
}

export interface UpdateUserInfoInput {
  title?: string;
  field_id: number;
  grade_id: number;
  residency_status: 1 | 2; // 1 = رزیدنت نیست، 2 = رزیدنت هست
  damage_history_id?: number;
  
  // فایل‌ها در ارسال فقط آرایه‌ای از ID هستند
  national_id_card_files: number[]; 
  medical_education_card_files: number[];
  last_insurance_files: number[];
  
  active_clinic: boolean;
  city_id?: number;
  province_id?: number;
  clinic_address?: string;
  insured_name?: string;
  insured_phone?: string;
  postal_code?: number;
}

export enum HeaderType {
  FAVORITES = "favorites",
  INSURANCE_DETAILS = "insurance_details",
  OTHERS = "others",
}