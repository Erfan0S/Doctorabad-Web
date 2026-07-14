"use client";
import React from "react";
import { HomePagePackageSliders } from "@/types/homePage";
import LazyPackageSlider from "./LazyPackageSlider";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

const MainPage = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center pt-3">
      <LazyPackageSlider type={HomePagePackageSliders.MyPackages} />
      <LazyPackageSlider type={HomePagePackageSliders.Suggested} />
      <LazyPackageSlider type={HomePagePackageSliders.Newest} />
      <LazyPackageSlider type={HomePagePackageSliders.BestSelling} />
      <LazyPackageSlider type={HomePagePackageSliders.LastViewed} />
    </div>
  );
};

export default MainPage;
