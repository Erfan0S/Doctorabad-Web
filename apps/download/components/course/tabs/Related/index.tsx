"use client";
import { api } from "@/api/Api";
import StaticCourseList from "@/components/common/CourseList/StaticCourseList";
import Loading from "@/components/common/Loading";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { CourseContentProps } from "../tabs-data";

const RelatedCourses = ({ course }: CourseContentProps) => {
  const { data, isLoading } = useQuery({
    queryFn: () => api.getRelatedPackages(course.id),
    queryKey: ["related_packages", course.id],
    retry: false,
  });

  return isLoading ? (
    <Loading />
  ) : (
    <StaticCourseList packages={data?.data.data ?? []} />
  );
};

export default RelatedCourses;
