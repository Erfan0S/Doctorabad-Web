"use client";

import { api } from "@/api/Api";
import CallbackDetail from "@/components/callback/callbackDetail";
import CallbackDiscountInfo from "@/components/callback/callbackDiscountInfo";
import { Loading } from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function Callback() {
  const { push } = useRouter();

  const paymentToken = useSearchParams().get("identifier");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => api.getOrderResult(paymentToken as string),
    queryKey: ["payment_result", paymentToken],
    enabled: !!paymentToken,
    retry: false,
  });

  useEffect(() => {
    if (!paymentToken) push("/");
  }, [paymentToken, push, isError]);

  if (isLoading) return <Loading size={25} />;

  const isOrderSuccess = !isError && data?.data.type === "success";

  return (
    <div className="row align-items-center justify-content-center">
      {isOrderSuccess && (
        <div className="col-lg-4">
          <CallbackDiscountInfo
            discountCode={data!.data.discount_code}
            earnedCoins={data!.data.coin_received}
          />
        </div>
      )}
      <div className="col-lg-5">
        <CallbackDetail
          isOrderSuccess={isOrderSuccess}
          orderDate={data?.data.data.created_at}
          orderId={data?.data.data.order_code}
          trackingId={data?.data.post_tracking_code}
        />
      </div>
    </div>
  );
}

export default function CallbackContainer() {
  return (
    <Suspense fallback={<Loading size={25} />}>
      <Callback />
    </Suspense>
  );
}
