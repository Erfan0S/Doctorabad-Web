"use client";
import { api } from "@/api/Api";
import { CourseListItemType, ProviderTabs } from "@/types/courses";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import StaticCourseList from "@/components/common/CourseList/StaticCourseList";
import {
  Loading,
  MobileProviderPageLayout,
} from "@repo/shared_modules/components";
import InfiniteScroll from "react-infinite-scroller";
import { Apps } from "@repo/core/types/general";

type Props = {
  id: number;
};

const ProviderPageContent = ({
  courses,
  fetchNextPage,
  hasNextPage,
}: {
  courses: CourseListItemType[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
}) => {
  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Loading key={0} app={Apps.LEARN} />}
    >
      <StaticCourseList courses={courses} />
    </InfiniteScroll>
  );
};

const ProviderPage = ({ id }: Props) => {
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
          }) as CourseListItemType,
      ),
    );
  }, [data]);

  const provider = data?.pages[0].provider;

  return (
    <MobileProviderPageLayout
      ProviderContent={
        <ProviderPageContent
          courses={courses}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      }
      ProviderInfo={provider?.description || ""}
      id={id}
      image={provider?.pic_url || ""}
      summery={provider?.summary}
      title="ارائه دهنده‌ها"
      app={Apps.LEARN}
      contentTitle="دوره‌ها"
      isLoading={isLoading}
    />
  );
};
export default ProviderPage;
