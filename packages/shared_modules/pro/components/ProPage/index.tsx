"use client";

import React from "react";
import { PageHeader } from "../../../headers";
import styles from "./ProPage.module.scss";
import { Apps } from "@repo/core/types/general";
import ActivePlan from "../ActivePlan";
import { api } from "../../../api/Api";
import { useQuery } from "@tanstack/react-query";

const ProPage = () => {

  const { data: activePlanData } = useQuery({
    queryKey: ["active_plan"],
    queryFn: () => api.getDrProActivePlan(),
  });
  return (
    <div className={styles.proPageContainer}>
      <PageHeader title="دکتر پرو" app={Apps.DRPRO} />
            <div className={styles.content}>
              <ActivePlan data={activePlanData?.data?.data} />
            </div>
    </div>
  );
};

export default ProPage;
