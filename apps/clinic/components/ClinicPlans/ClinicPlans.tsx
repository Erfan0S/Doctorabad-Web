"use client";

import styles from "./clinicPlans.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import Heart from "@/assets/img/heart.png";

import { AddToCartButton } from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";

import { useQuery } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api"; // مسیر سرویست

interface Props {
  closeModal: (clearModals?: boolean) => void;
}

const ClinicPlans: React.FC<Props> = ({ closeModal }) => {
  // ------------------ API CALL ------------------

  const { data, isLoading, isError } = useQuery({
    queryKey: ["discount-plans"],
    queryFn: async () => (await clinicApi.getDiscountPlans()).data.data,
  });

  // ------------------ Local State ------------------
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (data?.length) {
      setSelected(data[0].id); // پیش‌فرض: اولین پلن
    }
  }, [data]);

  // ------------------ UI States ------------------
  if (isLoading)
    return (
      <div className={styles.clinicPlansModal}>
        <p>در حال بارگذاری...</p>
      </div>
    );

  if (isError)
    return (
      <div className={styles.clinicPlansModal}>
        <p>خطایی رخ داد. لطفا دوباره تلاش کنید.</p>
      </div>
    );

  const selectedPlan = data?.find((p: any) => p.id === selected);

  return (
    <div className={styles.clinicPlansModal}>
      {/* ICON */}
      <div className={styles.topIcon}>
        <Image src={Heart} alt="heart" width={80} height={80} />
      </div>

      {/* DESCRIPTION */}
      <p className={styles.description}>
        برای دسترسی کامل به کلینیک‌من (بانک اطلاعات بیماری‌ها، نسخه‌ها و وردها)
        یکی از طرح‌های زیر را انتخاب کنید.
      </p>

      {/* PLANS LIST */}
      <div className={styles.plansList}>
        {data?.map((plan) => (
          <div
            key={plan.id}
            className={`${styles.planItem} ${
              plan.id === selected ? styles.selected : ""
            }`}
            onClick={() => setSelected(plan.id)}
          >
            <input type="radio" checked={selected === plan.id} readOnly />
            <span>{plan.title}</span>
          </div>
        ))}
      </div>

      {/* PRICE */}
      <div className={styles.price}>
        {selectedPlan?.main_price === null
          ? "رایگان"
          : selectedPlan?.main_price.toLocaleString("fa-IR") + " تومان"}
      </div>

      {/* ADD TO CART */}
      {selected && (
        <div className={styles.submitButtonWrapper}>
          <AddToCartButton
            id={selected}
            type={OrderType.DiscountPlan}
          />
        </div>
      )}
    </div>
  );
};

export default ClinicPlans;
