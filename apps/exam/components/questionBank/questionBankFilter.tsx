"use client";
import React, { useEffect, useState } from "react";
import Button from "../common/Button/Button";
import SelectFilters from "../common/SelectFilters/SelectFilters";
import { Apps } from "@repo/core/types/general";
import { OptionSwitch } from "@repo/shared_modules/components";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import QuestionSearchInpt from "./QuestionSearchInpt";
import { api as sharedApi } from "@repo/shared_modules/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RoutePath } from "@/constants/routPaths";
import { SearchParamsUtils } from "@repo/core/utils/UrlUtils";
import { api } from "@/api/Api";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";
import { UserPlans } from "@repo/core/types/user";
import { UserPlansQueryKeys } from "@/constants/constants";
import { explanationError } from "@/constants/massages";
import { SharedFilters } from "@repo/apps_shared_components/exam/types";

function QuestionBankFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [initialLoad, setInitialLoad] = useState(false);

  const {
    data: planData,
    isLoading: planLoading,
    refetch: refetchPlan,
    dataUpdatedAt: planUpdatedAt,
  } = useQuery({
    queryKey: UserPlansQueryKeys,
    queryFn: () => sharedApi.getUserPlans(2),
    enabled: isUserLoggedIn(),
    retry: false,
  });
  const {
    data: archivedData,
    isLoading: archivedLoading,
    refetch: refetchArchived,
  } = useQuery({
    queryKey: ["userHasArchived"],
    queryFn: () => api.getArcgived(),
    enabled: isUserLoggedIn(),
    staleTime: 0,
  });

  const hasPlan = (plan?: UserPlans) =>
    isUserLoggedIn() && !!plan?.data && plan?.data.length > 0 ? true : false;

  const hasArchived =
    !!archivedData?.data.data &&
    archivedData?.data.data.length > 0 &&
    !archivedLoading &&
    !!isUserLoggedIn();

  useEffect(() => {
    if (!initialLoad) {
      setInitialLoad(true);
      return;
    }

    if (!isUserLoggedIn()) {
      queryClient.invalidateQueries({ queryKey: UserPlansQueryKeys });
      queryClient
        .invalidateQueries({ queryKey: ["userHasArchived"] })
        .then(() => {
          refetchArchived();
        });
    }
  }, [isUserLoggedIn()]);

  const onExplanationSelect = async () => {
    if (planLoading) return;
    if (!isUserLoggedIn()) {
      queryClient.invalidateQueries({ queryKey: UserPlansQueryKeys });
      toast.error(explanationError);
      document.getElementById("discountPlansElement")?.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }
    const plan =
      (Date.now() - planUpdatedAt) / 1000 > 60
        ? (await refetchPlan()).data
        : planData;
    if (hasPlan(plan?.data)) {
      toast.success("شماطرح فعال دارید!");
    } else {
      toast.error(explanationError);
      document.getElementById("discountPlansElement")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const onSubmitHandler = () => {
    if (!searchParams?.get(SharedFilters.FIELD)) {
      toast.error("حداقل رشته را انتخاب کن!");
      return;
    }

    let a: Record<string, string> = {};
    searchParams?.forEach((value, key) => {
      a[key] = value;
    });
    router.push(
      `${RoutePath.questions}?${SearchParamsUtils.paramsStringify(a)}`,
    );
  };

  return (
    <div className="w-full flex flex-col pt-[5px] container">
      <div className="card w-full flex flex-row px-[15px] py-[10px] [&_button]:flex-1 [&_button]:ms-[10px] [&_button:first-child]:ms-0 max-md:[&_button]:text-[12px]">
        <Button
          onClick={authorizeClientAction(() =>
            router.push(RoutePath.marked_questions),
          )}
        >
          سوالات نشان‌دار من
        </Button>
        <Button
          disabled={!hasArchived}
          onClick={
            hasArchived
              ? authorizeClientAction(() => router.push(RoutePath.archived))
              : undefined
          }
        >
          آزمون‌های ساخته شده من
        </Button>
      </div>
      <div className="card exam-filters-card">
        <SelectFilters page="questionBank" />
        <QuestionSearchInpt />
        <OptionSwitch
          name={SharedFilters.EXPLANATION}
          title="نمایش پاسخ تشریحی سوالات!"
          app={Apps.EXAM}
          addToQuery
          onClick={onExplanationSelect}
          isActive={hasPlan(planData?.data)}
          isLoading={planLoading}
          isDefaulChecked={hasPlan(planData?.data)}
          canChange={false}
        />
        <OptionSwitch
          name={SharedFilters.BUDGETING}
          title="نمایش بودجه‌بندی سوالات!"
          app={Apps.EXAM}
          isActive={!!searchParams?.get(SharedFilters.LESSON)}
          onClick={() => {
            !!searchParams?.get(SharedFilters.LESSON) ||
              toast.error("حتما درس باید انتخاب شده باشد!");
          }}
          addToQuery
        />
        <OptionSwitch
          name={SharedFilters.TIP}
          title="فقط نمایش سوالات تیپ دار!"
          app={Apps.EXAM}
          addToQuery
        />

        <Button
          className="absolute right-1/2 bottom-0 translate-x-1/2 translate-y-1/2"
          type="button"
          onClick={onSubmitHandler}
        >
          فیلتر‌کن و نشون‌بده!
        </Button>
      </div>
    </div>
  );
}

export default QuestionBankFilter;
