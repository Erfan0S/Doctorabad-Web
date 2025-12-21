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
  fields: number[];
  grades?: number[];
  residency_status?: number;
  damage_history?: number;
  last_insurance?: number;
  current_insurance_end_date: string | null;
}
