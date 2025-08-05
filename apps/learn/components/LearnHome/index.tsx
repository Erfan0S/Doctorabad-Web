"use client";
import React from "react";
import styles from "./LearnHome.module.scss";
import { HomePageCourseSliders } from "@/types/homePage";
import LazyCourseSlider from "./LazyCourseSlider";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <LazyCourseSlider type={HomePageCourseSliders.MyCourses} />
      <LazyCourseSlider type={HomePageCourseSliders.Suggested} />
      <LazyCourseSlider type={HomePageCourseSliders.Newest} />
      <LazyCourseSlider type={HomePageCourseSliders.BestSeller} />
      <LazyCourseSlider type={HomePageCourseSliders.LastViewed} />
    </div>
  );
};

export default MainPage;
