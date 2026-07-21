"use client";

import { api } from "@repo/shared_modules/api";
import CallbackDetail from "./components/callbackDetail";
import CallbackDiscountInfo from "./components/callbackDiscountInfo";
import { Apps } from "@repo/core/types/general";
import { Button, Loading } from "@repo/shared_modules/components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { baseUrls } from "@repo/core/constants/routePath";
import { REDIRECTED_APP_KEY } from "@repo/core/constants/queryKeys";

function Callback({ app }: { app: Apps }) {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const redirectApp = (useSearchParams()?.get(REDIRECTED_APP_KEY) ||
    Apps.BASE) as Apps;
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

  // Invalidate clinic plans query when order is successfully completed
  useEffect(() => {
    const isOrderSuccess = !isError && data?.data.type === "success";
    if (isOrderSuccess && redirectApp === Apps.CLINIC) {
      queryClient.invalidateQueries({ queryKey: ["user-plans-clinic"] });
    }
  }, [isError, data, redirectApp, queryClient]);

  if (isLoading) return <Loading size={25} app={app} pageLoader />;

  const isOrderSuccess = !isError && data?.data.type === "success";

  return (
    <div className="mb-[100px] flex min-h-[60vh] flex-col items-center justify-center gap-5 [&>div]:w-full [&>button]:flex-none [&>button_a]:text-white">
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
            installmentTransactionId={
              data?.data.installment_transaction_id || undefined
            }
          />
        </div>
      </div>
      <Button>
        <a href={baseUrls[redirectApp]}>بازگشت به صفحه اصلی</a>
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
