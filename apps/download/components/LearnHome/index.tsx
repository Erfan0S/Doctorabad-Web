"use client";
import React from "react";
import styles from "./LearnHome.module.scss";
import { HomePagePackageSliders } from "@/types/homePage";
import LazyPackageSlider from "./LazyPackageSlider";

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
