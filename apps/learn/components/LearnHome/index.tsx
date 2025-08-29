"use client";
import React from "react";
import styles from "./LearnHome.module.scss";
import { HomePageCourseSliders } from "@/types/homePage";
import LazyCourseSlider from "./LazyCourseSlider";
import { api } from "@/api/Api";
import { api as coreApi } from "@repo/shared_modules/api";

const MainPage = () => {
  api.getPreviosPlanOrders().then((res) => {
    console.log("PreviosPlanOrders", res);
  });
  api.getPrviosCourseOrders().then((res) => {
    console.log("PrviosCourseOrders", res);
  });
  coreApi.getUserPlans(2).then((res) => {
    console.log("UserPlans", res);
  });
  api.getUserPreviousOrders().then((res) => {
    console.log("UserPreviousOrders", res);
  });

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
