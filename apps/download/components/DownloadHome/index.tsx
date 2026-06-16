"use client";
import React from "react";
import styles from "./DownloadHome.module.scss";
import { HomePagePackageSliders } from "@/types/homePage";
import LazyPackageSlider from "./LazyPackageSlider";
import { isUserLoggedIn } from "@repo/core/utils/authUtils";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <LazyPackageSlider type={HomePagePackageSliders.MyPackages} />
      <LazyPackageSlider type={HomePagePackageSliders.Suggested} />
      <LazyPackageSlider type={HomePagePackageSliders.Newest} />
      <LazyPackageSlider type={HomePagePackageSliders.BestSelling} />
      <LazyPackageSlider type={HomePagePackageSliders.LastViewed} />
    </div>
  );
};

export default MainPage;
