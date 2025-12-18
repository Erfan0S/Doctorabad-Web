"use client";
import { api } from "@repo/shared_modules/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import DiscountPlanItem from "./DiscountPlanItem";
import style from "./discountPlans.module.scss";
import { UserPlanItem } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import Loading from "../common/Loading/Loading";
import { UserPlansQueryKeys } from "@/constants/constants";

type Props = {
  haveUserPlan?: boolean;
};

function DiscountPlans({ haveUserPlan = true }: Props) {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["DiscountPlans"],
    queryFn: () => api.getDiscountPlans(2),
  });
  const { data: userPlans, isLoading: userPlansLoading } = useQuery({
    queryKey: UserPlansQueryKeys,
    queryFn: () => api.getUserPlans(2),
    enabled: !!isUserLoggedIn() && haveUserPlan,
  });

  useEffect(() => {
    if (!isUserLoggedIn()) {
      queryClient.invalidateQueries({ queryKey: ["DiscountPlans"] });
      queryClient.invalidateQueries({ queryKey: ["UserPlans"] });
    }
  }, [isUserLoggedIn()]);

  return (
    <div
      className={`container ${style.DiscontPlansWrapper}`}
      id="discountPlansElement"
    >
      {userPlansLoading ? (
        <Loading />
      ) : (
        !!isUserLoggedIn() &&
        haveUserPlan &&
        userPlans?.data.data.map((item) => (
          <UserPlanItem item={item} app={Apps.EXAM} />
        ))
      )}
      {isLoading ? (
        <Loading />
      ) : (
        data?.data.data.map((item) => (
          <DiscountPlanItem key={item.id} item={item} />
        ))
      )}
    </div>
  );
}

export default DiscountPlans;
