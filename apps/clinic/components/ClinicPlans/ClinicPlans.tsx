"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Heart from "@repo/shared_modules/images/heart.png";

import { AddToCartButton } from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";

import { useQuery } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api"; // مسیر سرویست
import { generalAuthorizeState } from "@repo/core/states/generalAuthorizedState";

const MODAL_CLASS =
  "relative mx-auto max-w-[80%] rounded-[30px] bg-white p-6 text-center [direction:rtl]";

interface Props {
  closeModal: (clearModals?: boolean) => void;
}

const ClinicPlans: React.FC<Props> = ({ closeModal }) => {
  const isLoggedIn = generalAuthorizeState((state) => state.isAuthorized);
  // ------------------ API CALL ------------------

  const { data, isLoading, isError } = useQuery({

    queryKey: ["discount-plans"],
    queryFn: async () => (await clinicApi.getDiscountPlans()).data.data,
    enabled: isLoggedIn,
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
      <div className={MODAL_CLASS}>
        <p>در حال بارگذاری...</p>
      </div>
    );

  if (isError)
    return (
      <div className={MODAL_CLASS}>
        <p>خطایی رخ داد. لطفا دوباره تلاش کنید.</p>
      </div>
    );

  const selectedPlan = data?.find((p: any) => p.id === selected);

  return (
    <div className={MODAL_CLASS}>
      {/* ICON */}
      {/* ponytail: physical left-1/2/-translate-x-1/2 centering kept (RTL-neutral) */}
      <div className="absolute -top-[45px] left-1/2 flex h-[100px] w-[100px] -translate-x-1/2 items-center justify-center rounded-[15px] bg-[#ffe5e5] shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
        <Image
          className="h-[60px] w-[60px] object-contain"
          src={Heart}
          alt="heart"
          width={80}
          height={80}
        />
      </div>

      {/* DESCRIPTION */}
      <p className="mt-[50px] px-2.5 text-sm leading-[26px] text-[#555]">
        برای دسترسی کامل به کلینیک‌من (بانک اطلاعات بیماری‌ها، نسخه‌ها و وردها)
        یکی از طرح‌های زیر را انتخاب کنید.
      </p>

      {/* PLANS LIST */}
      <div className="mt-5">
        {data?.map((plan) => (
          // ponytail: old scss used invalid `justify-content: right`; in this RTL
          // modal it behaved like flex-start, so justify-start is used.
          <div
            key={plan.id}
            className={`flex cursor-pointer items-center justify-start gap-2.5 rounded-[14px] px-4 py-3 transition-colors duration-200 hover:bg-[#f3fff3] ${
              plan.id === selected ? "text-green-base" : ""
            }`}
            onClick={() => setSelected(plan.id)}
          >
            <input
              className="h-5 w-5 cursor-pointer accent-green-base"
              type="radio"
              checked={selected === plan.id}
              readOnly
            />
            <span className="text-[15px] text-[#333]">{plan.title}</span>
          </div>
        ))}
      </div>

      {/* PRICE */}
      <div className="mt-[25px] text-lg font-bold text-[#444]">
        {selectedPlan?.main_price === null
          ? "رایگان"
          : selectedPlan?.main_price.toLocaleString("fa-IR") + " تومان"}
      </div>

      {/* ADD TO CART */}
      {selected && (
        <div>
          <AddToCartButton
            id={selected}
            type={OrderType.DiscountPlan}
            className="!mt-[18px] !-mb-[50px] !flex !flex-col !justify-center"
          />
        </div>
      )}
    </div>
  );
};

export default ClinicPlans;
