// hooks/useUserInfo.ts
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { insuranceApi } from "@/api/Api"; // مسیر api را تنظیم کنید
import { User } from "@repo/core/types/user";
import {
  UpdateUserInfoInput,
  InsuranceInfo,
  StoreInsuranceInfoResponse,
  UploadFileResponse,
} from "@/types/insurance";

// 1. Get User Profile
export const useUserProfile = (): UseQueryResult<User, unknown> => {
  return useQuery<User>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await insuranceApi.getUserProfile();
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// 2. Get Provinces
export const useProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: async () => {
      const res = await insuranceApi.getProvinces();
      return res.data.data;
    },
    staleTime: Infinity,
  });
};

// 3. Get Cities
export const useCities = (provinceId: number | undefined) => {
  return useQuery({
    queryKey: ["cities", provinceId],
    queryFn: async () => {
      if (!provinceId) return [];
      const res = await insuranceApi.getCities(provinceId);
      return res.data.data;
    },
    enabled: !!provinceId,
  });
};

// 4. Upload File
export const useUploadFile = (): UseMutationResult<
  UploadFileResponse,
  unknown,
  { file: File; type: number }
> => {
  return useMutation<UploadFileResponse, unknown, { file: File; type: number }>(
    {
      mutationFn: async ({ file, type }: { file: File; type: number }) => {
        const res = await insuranceApi.uploadFile(file, type);
        return res.data.data;
      },
    },
  );
};

// 5. Destroy File
export const useDestroyFile = () => {
  return useMutation({
    mutationFn: async ({
      file_id,
      type,
    }: {
      file_id: number;
      type: number;
    }) => {
      const res = await insuranceApi.destroyFile(file_id, type);
      return res.data.data;
    },
  });
};

// 6. Update Info
export const useUpdateInsuranceInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateUserInfoInput;
    }) => {
      const res = await insuranceApi.updateInsuranceInfo(id, payload);
      return res.data.data;
    },
    onSuccess: () => {
      // اگر نیاز بود لیست بیمه‌ها رفرش شود
      // queryClient.invalidateQueries(["insurances"]);
    },
  });
};

// لیست اطلاعات ذخیره شده کاربر
export const useInsuranceInfos = () => {
  return useQuery<InsuranceInfo[]>({
    queryKey: ["insuranceInfos"],
    queryFn: async () => {
      const res = await insuranceApi.getInsuranceInfos();
      return res.data.data;
    },
  });
};

// دریافت اطلاعات تکی
export const useInsuranceInfoSingle = (id: number | null) => {
  return useQuery<InsuranceInfo>({
    queryKey: ["insuranceInfo", id],
    queryFn: async () => {
      if (!id) throw new Error("ID required");
      const res = await insuranceApi.getInsuranceInfoSingle(id);
      return res.data.data;
    },
    enabled: !!id,
  });
};

// ایجاد اطلاعات جدید
export const useStoreInsuranceInfo = () => {
  const queryClient = useQueryClient();
  return useMutation<StoreInsuranceInfoResponse, Error, UpdateUserInfoInput>({
    mutationFn: async (payload: UpdateUserInfoInput) => {
      const res = await insuranceApi.storeInsuranceInfo(payload);
      return res.data?.data || res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insuranceInfos"] });
    },
  });
};
