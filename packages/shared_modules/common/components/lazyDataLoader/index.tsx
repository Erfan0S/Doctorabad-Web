"use client";

import { ResponseType } from "@repo/core/types/general";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props<D = any> = {
  loader: () => Promise<ResponseType<D>>;
  queryKey: string;
  component: (p: { data: D }) => ReactNode;
  placeHolder: () => ReactNode;
  returnOnError?: boolean;
};

export const LazyDataLoader = <S extends Object>({
  loader,
  component: Component,
  queryKey,
  placeHolder: PlaceHolder,
  returnOnError,
}: Props<S>) => {
  const { data, isLoading, isPending, isSuccess, isError, refetch } = useQuery({
    queryFn: loader,
    queryKey: [queryKey],
    retry: false,
    enabled: false,
  });
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && !isSuccess) {
      refetch();
    }
  }, [inView, isSuccess, refetch]);

  if (isLoading || isPending)
    return (
      <div ref={ref}>
        <PlaceHolder />
      </div>
    );

  if (isError && returnOnError) {
    return null;
  }

  if (isError)
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <p
            style={{ flex: "0 0 100%", maxWidth: "100%", textAlign: "center" }}
          >
            مشکل در دریافت اطلاعات.مجددا تلاش کنید
          </p>
          <button onClick={() => refetch()}>تلاش دوباره</button>
        </div>
        <div style={{ filter: "blur(5px)" }}>
          <PlaceHolder />
        </div>
      </div>
    );

  return <Component data={data!.data} />;
};
