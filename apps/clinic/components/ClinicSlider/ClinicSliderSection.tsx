"use client";

import { useQuery } from "@tanstack/react-query";
import { clinicApi } from "@/api/Api";
import { Slider } from "@/types/clinic";
import ClinicSlider from "./ClinicSlider";
import ClinicSliderSkeleton from "@/components/Skeletons/ClinicSliderSkeleton/ClinicSliderSkeleton";

export default function ClinicSliderSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const response = await clinicApi.getSliderList();
      return response.data.data as Slider[];
    },
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return <ClinicSliderSkeleton />;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return <ClinicSlider sliders={data} />;
}

