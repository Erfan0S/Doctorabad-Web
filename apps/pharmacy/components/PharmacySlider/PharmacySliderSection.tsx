"use client";

import { useQuery } from "@tanstack/react-query";
import { pharmacyApi } from "@/api/Api";
import { Slider } from "@/types/pharmacy";
import PharmacySlider from "./PharmacySlider";
import PharmacySliderSkeleton from "@/components/Skeletons/PharmacySliderSkeleton/PharmacySliderSkeleton";

export default function PharmacySliderSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const response = await pharmacyApi.getSliderList();
      return response.data.data as Slider[];
    },
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return <PharmacySliderSkeleton />;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return <PharmacySlider sliders={data} />;
}

