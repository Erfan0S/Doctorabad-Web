"use client";
import React from "react";
import styles from "./LearnHome.module.scss";
import MainSlider from "./slider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { HomePageCourseSliders } from "@/types/homePage";
import LazyCourseSlider from "./LazyCourseSlider";
import MainSliderPlaceHolder from "../PlaceHolders/Slder";

const MainPage = () => {
  const { data: banners, isLoading: isBannersLoading } = useQuery({
    queryFn: () => api.getMainSlider(),
    queryKey: ["banners"],
  });

  return (
    <div className={styles.container}>
      {isBannersLoading ? (
        <MainSliderPlaceHolder />
      ) : (
        <MainSlider
          banners={banners?.data.data || []}
          swiperOptions={{ spaceBetween: 0 }}
        />
      )}
      <LazyCourseSlider type={HomePageCourseSliders.MyCourses} />
      <LazyCourseSlider type={HomePageCourseSliders.Suggested} />
      <LazyCourseSlider type={HomePageCourseSliders.Newest} />
      <LazyCourseSlider type={HomePageCourseSliders.BestSeller} />
      <LazyCourseSlider type={HomePageCourseSliders.LastViewed} />
    </div>
  );
};

export default MainPage;
