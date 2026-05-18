// useInsuranceFind.ts
import { insuranceApi } from "@/api/Api";
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { InsuranceField, DamageHistory, ResidencyStatus, Insurer, InsuranceGrade  } from "@/types/insurance";

type ApiListResponse<T> = { data: T[] };

export const useInsuranceFields = () : UseQueryResult<InsuranceField[], unknown> =>
  useQuery({
    queryKey: ["insurance", "fields"],
    queryFn: () => insuranceApi.getInsuranceFields(),
    select: (res): InsuranceField[] => res.data.data,
  });

export const useDamageHistory = () =>
  useQuery({
    queryKey: ["insurance", "history"],
    queryFn: () => insuranceApi.getDamageHistory(),
    select: (res): DamageHistory[] => res.data.data,
  });

export const useResidencyStatus = () =>
  useQuery({
    queryKey: ["insurance", "residency"],
    queryFn: () => insuranceApi.getResidencyStatus(),
    select: (res): ResidencyStatus[] => res.data.data,
  });

export const useLastInsurer = () =>
  useQuery({
    queryKey: ["insurance", "insurer"],
    queryFn: () => insuranceApi.getLastInsurer(),
    select: (res): Insurer[] => res.data.data,

  });

// useInsuranceFind.ts
export const useGrades = (fieldIds: number[]) =>
  useQuery({
    queryKey: ["insurance", "grades", fieldIds],
    enabled: fieldIds.length > 0,
    queryFn: () => insuranceApi.getInsuranceGrades(fieldIds),
    select: (res): InsuranceGrade[] =>
      (res.data as { data: InsuranceGrade[] }).data,
  });
