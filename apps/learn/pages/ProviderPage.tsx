"use client";
import { api } from "@/api/Api";
import PageHeader from "@/components/Header/PageHeader";
import ProviderHeader from "@/components/Header/ProviderHeader";
import { CourseListItemType, ProviderTabs } from "@/types/courses";
import { Loading } from "@repo/ui/components";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import styles from "@/components/Header/ProviderHeader/ProviderHeader.module.scss";
import StaticCourseList from "@/components/common/CourseList/StaticCourseList";

type Props = {
  id: number;
};

const ProviderPageContent = ({
  tab,
  courses,
  description,
}: {
  tab: string;
  courses: CourseListItemType[];
  description: string;
}) => {
  switch (tab) {
    case ProviderTabs.COURSES:
      return (
        <div>
          <StaticCourseList courses={courses} />
        </div>
      );
    case ProviderTabs.DESCRIPTION:
      return (
        <div style={{ width: "100%", padding: "15px" }}>
          <div
            style={{ fontSize: "16px" }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      );
    default:
      return null;
  }
};

const ProviderPage = ({ id }: Props) => {
  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["providerPage", id],
    queryFn: () => api.getSingleProvider(id),
  });

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <PageHeader
        className={styles.providerHeaderWrapper}
        title="ارائه دهنده‌ها"
        children={
          <ProviderHeader
            id={id}
            tite={data?.data.name || ""}
            summery={data?.data.summary || ""}
            image={data?.data.avatar_file.info.path || ""}
            alt={data?.data.avatar_file.info.bucket}
          />
        }
      />
      <ProviderPageContent
        tab={searchParams?.get("tab") || ProviderTabs.COURSES}
        courses={[]}
        description={data?.data.description || ""}
      />
    </div>
  );
};
export default ProviderPage;
