"use client";
import React from "react";
import styles from "./LearnHome.module.scss";
import { HomePagePackageSliders } from "@/types/homePage";
import LazyCourseSlider from "./LazyPackageSlider";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <LazyCourseSlider type={HomePagePackageSliders.MyPackages} />
      <LazyCourseSlider type={HomePagePackageSliders.Suggested} />
      <LazyCourseSlider type={HomePagePackageSliders.Newest} />
      <LazyCourseSlider type={HomePagePackageSliders.BestSelling} />
      <LazyCourseSlider type={HomePagePackageSliders.LastViewed} />
    </div>
  );
};

export default MainPage;
