"use client";

import React from "react";
import { PageHeader } from "../../../headers";
import styles from "./ProPage.module.scss";
import { Apps } from "@repo/core/types/general";
import ActivePlan from "../ActivePlan";
import Explanation from "../Explanation";
import Plans from "../Plans";
import { ActivePlanSkeleton, ExplanationSkeleton } from "../skeletons";
import { api } from "../../../api/Api";
import { useQuery } from "@tanstack/react-query";

const ProPage = () => {

  const { data: activePlanData, isLoading } = useQuery({
    queryKey: ["active_plan"],
    queryFn: () => api.getDrProActivePlan(),
  });
  const { data: explanationData, isLoading: isExplanationLoading } = useQuery({
    queryKey: ["explanation"],
    queryFn: () => api.getDrProExplanation(),
  });
  return (
    <div className={styles.proPageContainer}>
      <PageHeader title="دکتر پرو" app={Apps.DRPRO} />
            <div className={styles.content}>
              {isLoading ? (
                <ActivePlanSkeleton />
              ) : (
                <ActivePlan data={activePlanData?.data?.data} />
              )}
              {isExplanationLoading ? (
                <ExplanationSkeleton />
              ) : (
                <Explanation data={explanationData?.data?.data} />
              )}
              <Plans />
            </div>
    </div>
  );
};

export default ProPage;
