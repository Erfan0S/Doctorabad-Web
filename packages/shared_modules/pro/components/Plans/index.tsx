"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import PlanItem from "./PlanItem";
import { PlansSkeleton } from "../skeletons";
import styles from "./Plans.module.scss";

type Props = {
  selectedId?: number | null;
  onSelect?: (id: number) => void;
};

export default function Plans({ selectedId: controlledSelectedId, onSelect }: Props) {
  const [localSelectedId, setLocalSelectedId] = useState<number | null>(null);

  const { data: plansData, isLoading } = useQuery({
    queryKey: ["dr_pro_plans"],
    queryFn: () => api.getDrProPlansList(),
  });

  const plans = plansData?.data?.data ?? [];

  useEffect(() => {
    if (plans.length) {
      const initial = controlledSelectedId ?? localSelectedId ?? plans[0].id;
      if (controlledSelectedId == null) setLocalSelectedId(initial);
      if (controlledSelectedId == null && onSelect) onSelect(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plansData]);

  if (isLoading) return <PlansSkeleton />;

  if (!plans.length) return null;

  return (
    <div className={styles.plansList}>
      {plans.map((plan) => (
        <PlanItem
          key={plan.id}
          plan={plan}
          selected={(controlledSelectedId ?? localSelectedId) === plan.id}
          onSelect={(id) => {
            if (onSelect) onSelect(id);
            else setLocalSelectedId(id);
          }}
        />
      ))}
    </div>
  );
}
