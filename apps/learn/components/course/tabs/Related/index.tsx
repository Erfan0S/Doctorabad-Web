import { api } from "@/api/Api";
import CourseList from "@/components/common/CourseList";
import { Loading } from "@repo/ui/components";
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

  useEffect(() => {
    console.log("data", data);
    console.log("status", status);
    console.log("error", error);
  }, [data, status, error]);

  return isLoading ? (
    <Loading />
  ) : (
    <CourseList courses={data?.data.data ?? []} />
  );
};

export default RelatedCourses;
