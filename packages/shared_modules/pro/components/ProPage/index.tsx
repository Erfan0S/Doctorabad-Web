"use client";

import React, { useEffect, useState } from "react";
import { PageHeader } from "../../../headers";
import styles from "./ProPage.module.scss";
import { Apps } from "@repo/core/types/general";
import ActivePlan from "../ActivePlan";
import Explanation from "../Explanation";
import Plans from "../Plans";
import { ActivePlanSkeleton, ExplanationSkeleton } from "../skeletons";
import Shipping from "../../../checkout/components/shipping";
import { ShippingMethod, ShippingAddress } from "@repo/core/types/cart";
import Pay from "../../../checkout/components/pay";
import CreateDrProOrderButton from "../CreateDrProOrderButton";
import type { CartPayInfo } from "../../../checkout/types/cart";
import PaymentMethods from "../../../checkout/components/payment_methods";
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

  const { data: plansData } = useQuery({
    queryKey: ["dr_pro_plans"],
    queryFn: () => api.getDrProPlansList(),
  });

  const plans = plansData?.data?.data ?? [];
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(
    plans?.length ? plans[0].id : null,
  );

  const selectedPlan = plans.find((p: any) => p.id === selectedPlanId);

  useEffect(() => {
    if (plans.length && selectedPlanId == null) setSelectedPlanId(plans[0].id);
  }, [plans]);

  const [payInfo, setPayInfo] = useState<CartPayInfo>({
    description: "",
    discountCode: "",
    payWithCredit: false,
    paymentMethod: "cash",
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
        <Plans selectedId={selectedPlanId} onSelect={setSelectedPlanId} />
        {/* <div style={{ marginTop: 12 }}>
          <Shipping
            isLoading={loadingAddress}
            address={addressData}
            onChangeShippingMethod={onChangeShippingMethod}
            currentShippingMethod={currentShippingMethod}
            selectedShipingMethod={selectedShippingMethod}
            app={Apps.DRPRO}
          />
        </div> */}
        <div style={{ marginTop: 20 }}>
          <Pay
            shippingMethod={undefined}
            payInfo={payInfo}
            setPayInfo={setPayInfo}
            price_paid={
              selectedPlan?.off_price
                ? selectedPlan.off_price
                : selectedPlan?.main_price
                  ? selectedPlan.main_price
                  : 0
            }
            drProMode={true}
            drProPlanId={selectedPlanId}
          >
            <PaymentMethods
              payInfo={payInfo}
              setPayInfo={setPayInfo}
              shippingMethod={undefined}
              drProMode={true}
              installmentDescription={selectedPlan?.installment_text ?? null}
            />
            <CreateDrProOrderButton
              selectedPlanId={selectedPlanId}
              payInfo={payInfo}
            />
          </Pay>
        </div>
      </div>
    </div>
  );
};

export default ProPage;
