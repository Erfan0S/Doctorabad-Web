"use client";
import { api } from "@/api/Api";
import CategoriesList from "@/components/common/CategoriesList";
import HomeHeader from "@/components/Header/HomeHeader";
import { Loading } from "@repo/ui/components";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const ProvidersPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => api.getProviders(),
    queryKey: ["providers"],
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    console.log("providers", data?.data);
    console.log("isError", isError);
    console.log("isLoading", isLoading);
    console.log("error", error);
  }, [data, isError, isLoading, error]);

  return (
    <div>
      <HomeHeader />
      {isLoading ? (
        <Loading />
      ) : (
        <CategoriesList categories={data?.data.data || []} isProvider={true} />
      )}
    </div>
  );
};

export default ProvidersPage;
