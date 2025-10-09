"use client";
import React, { useEffect } from "react";
import Button from "../common/Button/Button";
import style from "./questionBank.module.scss";
import SelectFilters from "../common/SelectFilters/SelectFilters";
import { Apps } from "@repo/core/types/general";
import { OptionSwitch } from "@repo/shared_modules/components";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import QuestionSearchInpt from "./QuestionSearchInpt";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import {
  SidePanelFavoriteTab,
  SidePanelPage,
} from "@repo/core/types/sidePanel";
import { api as sharedApi } from "@repo/shared_modules/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RoutePath } from "@/constants/routPaths";
import { SearchParamsUtils } from "@repo/core/utils/UrlUtils";
import { api } from "@/api/Api";
import Link from "next/link";
import { explanationError } from "@repo/apps_shared_components/exam/constants/massages.ts";
import { SharedFilters } from "@repo/apps_shared_components/exam/types/filters.ts";
import {
  authorizeClientAction,
  isUserLoggedIn,
} from "@repo/core/utils/authUtils";
import { UserPlansQueryKeys } from "@repo/apps_shared_components/exam/constants/constants.ts";
import { UserPlans } from "@repo/core/types/user";

function QuestionBankFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: planData,
    isLoading: planLoading,
    refetch: refetchPlan,
    dataUpdatedAt: planUpdatedAt,
  } = useQuery({
    queryKey: UserPlansQueryKeys,
    queryFn: () => sharedApi.getUserPlans(2),
    enabled: !!isUserLoggedIn(),
    retry: false,
  });
  const {
    data: archivedData,
    isLoading: archivedLoading,
    refetch: refetchArchived,
  } = useQuery({
    queryKey: ["userHasArchived"],
    queryFn: () => api.getArcgived(),
    enabled: !!isUserLoggedIn(),
    staleTime: 0,
  });

  const hasPlan = (plan?: UserPlans) =>
    isUserLoggedIn() && !!plan?.data && plan?.data.length > 0 ? true : false;

  const hasArchived =
    !!archivedData?.data.data &&
    archivedData?.data.data.length > 0 &&
    !archivedLoading;

  useEffect(() => {
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
      `${RoutePath.questions}?${SearchParamsUtils.paramsStringify(a)}`
    );
  };

  return (
    <div className={`${style.filterContainer} container`}>
      <div className={`card ${style.topButtons}`}>
        <Button
          onClick={authorizeClientAction(() =>
            modalActions.addModal(ModalTypes.SIDE_PANEL, {
              initialPage: SidePanelPage.FAVORITES,
              data: {
                initialTab: SidePanelFavoriteTab.EXAM_CENTER,
                fromHome: true,
              },
            })
          )}
        >
          سوالات مورد علاقه‌من
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
      <div className={`card ${style.filtersWrapper}`}>
        <SelectFilters page="questionBank" />
        <QuestionSearchInpt />
        <OptionSwitch
          name={SharedFilters.EXPLANATION}
          title="نمایش تشریحی سوالات!"
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
          className={style.submitBtn}
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
