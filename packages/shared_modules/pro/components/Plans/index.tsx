"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import PlanItem from "./PlanItem";
import { PlansSkeleton } from "../skeletons";
import styles from "./Plans.module.scss";

export default function Plans() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: plansData, isLoading } = useQuery({
    queryKey: ["dr_pro_plans"],
    queryFn: () => api.getDrProPlansList(),
  });

  const plans = plansData?.data?.data ?? [];

  useEffect(() => {
    if (plans.length) {
      setSelectedId((prev) => prev ?? plans[0].id);
    }
  }, [plansData]);

  if (isLoading) return <PlansSkeleton />;

  if (!plans.length) return null;

  return (
    <div className={styles.plansList}>
      {plans.map((plan) => (
        <PlanItem
          key={plan.id}
          plan={plan}
          selected={selectedId === plan.id}
          onSelect={setSelectedId}
        />
      ))}
    </div>
  );
}
