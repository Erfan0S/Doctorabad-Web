// components/DiseaseCard/DiseaseCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Disease } from "@/types/clinic";
import PillsIcon from "@/assets/svg/pillsIcon";
import Lock from "@/assets/svg/lock";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { getMillisecondsUntilMidnight } from "@/utils/timeUtils";
import { generalAuthorizeState } from "@repo/core/states/generalAuthorizedState";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { clinicApi } from "@/api/Api";
import { useEffect } from "react";

const ACTION_BTN =
  "flex-1 cursor-pointer whitespace-nowrap rounded-[10px] border-none bg-green-base px-3 py-1 text-[11px] text-white";

interface DiseaseCardProps {
  disease: Disease;
}

export default function DiseaseCard({ disease }: DiseaseCardProps) {
  const router = useRouter();

  // بررسی وضعیت لاگین بودن کاربر
  const isLoggedIn = generalAuthorizeState((state) => state.isAuthorized);
  const queryClient = useQueryClient();

  const {
    data: userPlans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-plans-clinic"],
    queryFn: async () => await clinicApi.getUserPlans(),
    enabled: isLoggedIn,
    staleTime: getMillisecondsUntilMidnight(),
    gcTime: getMillisecondsUntilMidnight(),
  });

  const isAccessible = () => {
    if (
      userPlans?.data?.data?.length ||
      userPlans?.data?.used_free ||
      disease.is_free
    ) {
      return true;
    }
    return false;
  };

  const handleActionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    treatmentType: "prescription" | "order" | "both",
  ) => {
    e.stopPropagation();
    const params = new URLSearchParams();
    params.set("treatment", treatmentType);
    router.push(`/disease/${disease.id}?${params.toString()}`);
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      queryClient.invalidateQueries({ queryKey: ["user-plans-clinic"] });
    }
  }, [isUserLoggedIn()]);

  return (
    <div
      className="flex cursor-pointer select-none items-center gap-4 rounded-2xl border-2 border-solid border-[#ccc] bg-white p-2.5 transition-all duration-200 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
      onClick={() => router.push(`/disease/${disease.id}`)}
    >
      <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-solid border-[#ccc]">
        {disease.picture ? (
          <img
            className="block h-full w-full rounded-xl object-cover"
            src={disease.picture}
            width={100}
            height={100}
            alt={disease.title_en}
          />
        ) : (
          // ponytail: the old scss-module `pillsIcon` ref resolved to undefined in
          // this file's module (it only existed in DiseaseDetails.module.scss).
          <PillsIcon width={75} height={75} />
        )}
      </div>

      <div className="flex min-h-[100px] flex-1 flex-col justify-between text-start">
        {/* بخش بالا - قفل */}
        <div className="flex min-h-6 items-start justify-end">
          {!isAccessible() && <Lock className="flex" />}
        </div>

        {/* بخش وسط - نام دارو */}
        <div className="mb-2.5 mt-1.5 flex flex-1 flex-col justify-center">
          {/* ponytail: physical text-right kept on the English title — it is a
              [direction:ltr] island inside the RTL card, same as the old scss. */}
          <h3 className="m-0 select-none text-base font-bold text-[#333] [direction:ltr] text-right">
            {disease.title_en}
          </h3>
          <p className="m-0 select-none text-base font-bold text-[#333]">
            {disease.title_fa}
          </p>
        </div>

        {/* بخش پایین - اکشن‌ها */}
        <div className="flex min-h-6 items-end justify-end">
          {(disease.has_prescription || disease.has_order) && (
            <div className="flex w-28 items-center gap-2">
              {disease.has_prescription && !disease.has_order && (
                <button
                  className={ACTION_BTN}
                  onClick={(e) => handleActionClick(e, "prescription")}
                >
                  نسخه و اوردر
                </button>
              )}

              {disease.has_prescription && disease.has_order && (
                <>
                  <button
                    className={ACTION_BTN}
                    onClick={(e) => handleActionClick(e, "prescription")}
                  >
                    نسخه
                  </button>
                  <button
                    className={ACTION_BTN}
                    onClick={(e) => handleActionClick(e, "order")}
                  >
                    اوردر
                  </button>
                </>
              )}

              {!disease.has_prescription && disease.has_order && (
                <button
                  className={ACTION_BTN}
                  onClick={(e) => handleActionClick(e, "order")}
                >
                  اوردر
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
