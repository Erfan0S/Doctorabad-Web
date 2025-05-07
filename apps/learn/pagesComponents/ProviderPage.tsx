"use client";
import { api } from "@/api/Api";
import PageHeader from "@/components/Header/PageHeader";
import ProviderHeader from "@/components/Header/ProviderHeader";
import { CourseListItemType, ProviderTabs } from "@/types/courses";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import styles from "@/components/Header/ProviderHeader/ProviderHeader.module.scss";
import StaticCourseList from "@/components/common/CourseList/StaticCourseList";
import { Loading } from "@repo/shared_modules/components";
import InfiniteScroll from "react-infinite-scroller";

type Props = {
  id: number;
};

const ProviderPageContent = ({
  tab,
  courses,
  description,
  fetchNextPage,
  hasNextPage,
}: {
  tab: string;
  courses: CourseListItemType[];
  description: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}) => {
  switch (tab) {
    case ProviderTabs.COURSES:
      return (
        <div>
          <InfiniteScroll
            pageStart={1}
            loadMore={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Loading size={36} key={0} color="red" />}
          >
            <StaticCourseList courses={courses} />
          </InfiniteScroll>
        </div>
      );
    case ProviderTabs.DESCRIPTION:
      return (
        <div className={styles.pageDescription}>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      );
    default:
      return null;
  }
};

const ProviderPage = ({ id }: Props) => {
  const searchParams = useSearchParams();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["providerPage", id],
    queryFn: ({ pageParam }) =>
      api.getSingleProvider(id, pageParam as number).then((res) => res.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
  });

  // Flatten the courses data from all pages and map to CourseListItemType
  const courses = React.useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) =>
      page.data.map(
        (course) =>
          ({
            ...course,
            provider: {
              id: page.provider.id,
              name: page.provider.name,
              pic_url: page.provider.pic_url,
            },
          }) as CourseListItemType
      )
    );
  }, [data]);

  return isLoading ? (
    <Loading pageLoader color="red" />
  ) : (
    <div>
      <PageHeader
        className={styles.providerHeaderWrapper}
        title="ارائه دهنده‌ها"
        children={
          data && (
            <ProviderHeader
              id={id}
              tite={data.pages[0].provider.name || ""}
              summery={data.pages[0].provider.summary || ""}
              image={data.pages[0].provider.pic_url || ""}
              alt={data.pages[0].provider.name || ""}
            />
          )
        }
      />
      <ProviderPageContent
        tab={searchParams?.get("tab") || ProviderTabs.COURSES}
        courses={courses}
        description={data?.pages[0].provider.description || ""}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage || false}
      />
    </div>
  );
};
export default ProviderPage;
