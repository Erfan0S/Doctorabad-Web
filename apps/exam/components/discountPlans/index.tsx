"use client";
import {api} from "@/api/Api";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import DiscountPlanItem from "./DiscountPlanItem";
import Loading from "../common/Loading/Loading";
import style from "./discountPlans.module.scss";

function DiscountPlans() {
  const {data, isLoading} = useQuery({
    queryKey: ["DiscountPlans"],
    queryFn: () => api.getDiscountPlans(),
  });

  return (
    <div className={`container ${style.DiscontPlansWrapper}`}>
      {isLoading ? (
        <Loading />
      ) : (
        data?.data.data.map((item) => <DiscountPlanItem item={item} />)
      )}
    </div>
  );
}

export default DiscountPlans;
