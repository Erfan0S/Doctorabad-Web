"use client";
import React from "react";
import { HomePageCourseSliders } from "@/types/homePage";
import LazyCourseSlider from "./LazyCourseSlider";

const MainPage = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <LazyCourseSlider type={HomePageCourseSliders.Amazing} />
      <LazyCourseSlider type={HomePageCourseSliders.MyCourses} />
      <LazyCourseSlider type={HomePageCourseSliders.Suggested} />
      <LazyCourseSlider type={HomePageCourseSliders.Newest} />
      <LazyCourseSlider type={HomePageCourseSliders.BestSeller} />
      <LazyCourseSlider type={HomePageCourseSliders.LastViewed} />
    </div>
  );
};

export default MainPage;
