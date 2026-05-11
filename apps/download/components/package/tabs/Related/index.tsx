"use client";
import { api } from "@/api/Api";
import StaticPackageList from "@/components/common/PackageList/StaticPackageList";
import Loading from "@/components/common/Loading";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PackageContentProps } from "../tabs-data";

const RelatedPackages = ({ packageItem }: PackageContentProps) => {
  const { data, isLoading } = useQuery({
    queryFn: () => api.getRelatedPackages(packageItem.id),
    queryKey: ["related_packages", packageItem.id],
    retry: false,
  });

  return isLoading ? (
    <Loading />
  ) : (
    <StaticPackageList packages={data?.data.data ?? []} />
  );
};

export default RelatedPackages;
