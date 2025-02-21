"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import style from "./course.module.scss";
import testImage from "@/assets/img/club.png";
import { api } from "@/api/Api";
import { modalActions } from "@repo/core";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import TabsController from "../common/TabsController";
import CourseContent from "./tabs/lessons";
import { CourseTabsData } from "./tabs/tabs-data";
import { CourseTab } from "@/types/courses";
import CourseDescription from "./tabs/Description";
import CourseComments from "./tabs/comments";
import RelatedCourses from "./tabs/Related";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@repo/ui/components";
import { useSearchParams } from "next/navigation";
import VideoPlayer from "./video-player/VideoPlayer";

const CourseTabsComponents = {
  [CourseTab.LESSONS]: CourseContent,
  [CourseTab.DESCRIPTION]: CourseDescription,
  [CourseTab.RELATED_PRODUCTS]: RelatedCourses,
  [CourseTab.COMMENTS]: CourseComments,
};

type Props = {
  id: string;
  slug: string;
};

const Course = ({ id, slug }: Props) => {
  const [activeTab, setActiveTab] = useState<CourseTab>(CourseTab.LESSONS);
  const params = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: () => api.getCourse(Number(id)),
    enabled: !!id,
    retry: false,
  });
  const { data: courseData, isLoading: isVideoLoading } = useQuery({
    queryKey: ["course-videop", `test-${id} 15163`],
    queryFn: () => api.getVideo(Number(id), 15163),
    enabled: true,
    retry: false,
  });
  const course = data?.data.data;

  useEffect(() => {
    if (params?.get("tab")) {
      setActiveTab(params?.get("tab") as CourseTab);
    }
  }, [activeTab, setActiveTab, params]);
  console.log(isLoading, isVideoLoading);
  console.log(courseData?.data?.data?.urls);
  return isLoading || isVideoLoading ? (
    <Loading />
  ) : (
    <div className={style.container}>
      <div className={style.courseHeader}>
        <div style={{ padding: "0 15px" }}>
          <VideoPlayer config={courseData!.data.data!.urls} />
          <div className={style["course-title"]}>
            <Image src={testImage} alt="company" width={40} height={40} />
            <h1>{isLoading ? <Loading /> : course?.title}</h1>
          </div>
        </div>
        <TabsController tabData={CourseTabsData} />
      </div>
      <div style={{ padding: "0 15px", marginTop: "15px" }}>
        {Object.entries(CourseTabsComponents).map(([id, Component]) =>
          id === activeTab && course ? (
            <Component
              description={course.description}
              CourseData={course}
              CourseId={course.id}
              sections={course.sections}
            />
          ) : null
        )}
      </div>
      <div className={style.purchaseBar}>
        <button
          className={style.purchaseButton}
          onClick={() => {
            modalActions.addModal(ModalTypes.SIDE_PANEL);
          }}
        >
          شروع یادگیری کل دوره | {course?.price_main} تومن
        </button>
      </div>
    </div>
  );
};

export default Course;
