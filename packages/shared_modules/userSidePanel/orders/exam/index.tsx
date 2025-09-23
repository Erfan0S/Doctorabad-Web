import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "@repo/shared_modules/components";
import generalGetNextPageParam from "@repo/core/constants/functions/generalGetNextPageParam";
import { SingleListItem } from "@repo/apps_shared_components";

const SidePanelOrdersExam: React.FC = () => {
  return <div>هیچ تک‌آزمونی نیست!</div>;

  // api.getExamOrdersList();
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: () => api.getLearnOrdersList(),
    queryKey: ["previousOrdersList"],
    getNextPageParam: generalGetNextPageParam,
    initialPageParam: 1,
  });

  if (data?.pages.length === 0) {
    return <div>هیچ تک‌آزمونی نیست!</div>;
  }

  if (isLoading) return <Loading size={22} />;

  console.log(data);

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      useWindow={false}
      getScrollParent={() =>
        document.getElementById("orderListContainer") as HTMLElement
      }
      loader={
        <div style={{ height: "30px", overflow: "hidden" }}>
          <Loading size={20} />
        </div>
      }
    >
      {data?.pages.map((page, i) =>
        page?.data?.data?.map((item) => (
          <div>{/* <SingleListItem item={item} /> */}</div>
        ))
      )}
    </InfiniteScroll>
  );
};

export default SidePanelOrdersExam;
