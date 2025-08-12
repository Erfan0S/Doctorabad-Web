"use client";

import { api } from "@repo/shared_modules/api";
import CallbackDetail from "./components/callbackDetail";
import CallbackDiscountInfo from "./components/callbackDiscountInfo";
import { Apps } from "@repo/core/types/general";
import { Button, Loading } from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import style from "./Callback.module.scss";

function Callback({ app }: { app: Apps }) {
  const { push } = useRouter();

  const paymentToken = useSearchParams()?.get("identifier");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => api.getOrderResult(paymentToken as string),
    queryKey: ["payment_result", paymentToken],
    enabled: !!paymentToken,
    retry: false,
  });

  useEffect(() => {
    if (!paymentToken) push("/");
  }, [paymentToken, push, isError]);

  if (isLoading) return <Loading size={25} app={app} pageLoader />;

  const isOrderSuccess = !isError && data?.data.type === "success";

  return (
    <div className={style.callbackContainer}>
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
      <Button>
        <Link href={"/"}>بازگشت به صفحه اصلی</Link>
      </Button>
    </div>
  );
}

export default function CallbackContainer({ app = Apps.BASE }: { app?: Apps }) {
  return (
    <Suspense fallback={<Loading size={25} app={app} />}>
      <Callback app={app} />
    </Suspense>
  );
}
