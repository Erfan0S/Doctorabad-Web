"use client";
import { api } from "@repo/shared_modules/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import DiscountPlanItem from "./DiscountPlanItem";
import Loading from "../common/Loading/Loading";
import style from "./discountPlans.module.scss";
import { UserPlanItem } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

function DiscountPlans() {
  const { data, isLoading } = useQuery({
    queryKey: ["DiscountPlans"],
    queryFn: () => api.getDiscountPlans(2),
  });
  const { data: userPlans, isLoading: userPlansLoading } = useQuery({
    queryKey: ["UserPlans"],
    queryFn: () => api.getUserPlans(2),
  });

  return (
    <div
      className={`container ${style.DiscontPlansWrapper}`}
      id="discountPlansElement"
    >
      {userPlansLoading ? (
        <Loading />
      ) : (
        userPlans?.data.data.map((item) => (
          <UserPlanItem item={item} app={Apps.EXAM} />
        ))
      )}
      {isLoading ? (
        <Loading />
      ) : (
        data?.data.data.map((item) => <DiscountPlanItem item={item} />)
      )}
    </div>
  );
}

export default DiscountPlans;
