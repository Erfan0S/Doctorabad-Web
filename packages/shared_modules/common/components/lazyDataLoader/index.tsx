"use client";

import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "..";
import { generalAuthorizeState } from "@repo/core/states/generalAuthorizedState";

type Props<D = any> = {
  loader: () => Promise<D>;
  queryKey: string;
  component: (p: { data: D }) => ReactNode;
  placeHolder: () => ReactNode;
  returnOnError?: boolean;
  isRefetchOnAuth?: boolean;
};

export const LazyDataLoader = <S extends Object>({
  loader,
  component: Component,
  queryKey,
  placeHolder: PlaceHolder,
  returnOnError,
  isRefetchOnAuth = false,
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

  useEffect(() => {
    console.log(queryKey, generalAuthorizeState.getState().isAuthorized);
    if (isRefetchOnAuth && generalAuthorizeState.getState().isAuthorized) {
      refetch();
    }
  }, [isRefetchOnAuth, generalAuthorizeState.getState().isAuthorized]);

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
          <Button onClick={() => refetch()} style={{ flex: "none" }}>
            تلاش دوباره
          </Button>
        </div>
        <div style={{ filter: "blur(5px)" }}>
          <PlaceHolder />
        </div>
      </div>
    );

  return <Component data={data} />;
};
