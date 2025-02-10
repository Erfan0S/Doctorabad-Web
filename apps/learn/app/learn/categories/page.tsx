"use client";
import { api } from "@/api/Api";
import CategoriesList from "@/components/common/CategoriesList";
import HomeHeader from "@/components/Header/HomeHeader";
import { Loading } from "@repo/ui/components";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const CategoriesPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => api.getCategories(),
    queryKey: ["categories"],
    enabled: true,
    retry: false,
  });

  useEffect(() => {
    console.log("categories", data?.data);
    console.log("error", isError);
    console.log("loading", isLoading);
  }, [data, isError, isLoading]);

  return (
    <div>
      <HomeHeader />
      {isLoading ? (
        <Loading />
      ) : (
        <CategoriesList categories={data?.data.data || []} />
      )}
    </div>
  );
};

export default CategoriesPage;
