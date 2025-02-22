"use client";
import CourseSlider from "@/components/LearnHome/productSlider";
import React from "react";
import styles from "./LearnHome.module.scss";
import MainSlider from "./slider";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import { HomePageCourseSliders } from "@/types/homePage";
import { Loading } from "@repo/shared_modules/components";

const MainPage = () => {
  const { data: banners, isLoading: isBannersLoading } = useQuery({
    queryFn: () => api.getMainSlider(),
    queryKey: ["banners"],
  });

  return (
    <div className={styles.container}>
      {isBannersLoading ? (
        <Loading />
      ) : (
        <MainSlider
          banners={banners?.data.data || []}
          swiperOptions={{ spaceBetween: 0 }}
        />
      )}
      <CourseSlider type={HomePageCourseSliders.Suggested} />
      <CourseSlider type={HomePageCourseSliders.Newest} />
      <CourseSlider type={HomePageCourseSliders.BestSeller} />
      <CourseSlider type={HomePageCourseSliders.LastViewed} />
    </div>
  );
};

export default MainPage;
