"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { MainSliderItem } from "@/types/slider";
import MainSlider from "./MainSlider";
import MainSliderSkeleton from "./MainSliderSkeleton";

export default function MainSliderSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["mainHomePageSliders"],
    queryFn: async () => {
      const response = await api.getMainHomePageSlider();
      return response.data.data as MainSliderItem[];
    },
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return <MainSliderSkeleton />;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return <MainSlider sliders={data} />;
}
