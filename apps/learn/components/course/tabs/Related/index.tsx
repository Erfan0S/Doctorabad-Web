import { api } from "@/api/Api";
import StaticCourseList from "@/components/common/CourseList/StaticCourseList";
import { Loading } from "@repo/shared_modules/components";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

type Props = {
  CourseId: number;
};

const RelatedCourses = ({ CourseId }: Props) => {
  const { data, isLoading, status, error } = useQuery({
    queryFn: () => api.getRelatedCourses(CourseId),
    queryKey: ["related_courses", CourseId],
    retry: false,
  });

  return isLoading ? (
    <Loading color="red" />
  ) : (
    <StaticCourseList courses={data?.data.data ?? []} />
  );
};

export default RelatedCourses;
