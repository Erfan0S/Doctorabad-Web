import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "@repo/shared_modules/components";
import generalGetNextPageParam from "@repo/core/constants/functions/generalGetNextPageParam";
import ExamOrderItem from "./ExamOrderItem";
import style from "./sinlgesList.module.scss";

const SidePanelOrdersExam: React.FC = () => {
  // api.getExamOrdersList();
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: () => api.getExamOrdersList(),
    queryKey: ["examOrdersList"],
    getNextPageParam: generalGetNextPageParam,
    initialPageParam: 1,
  });

  if (data?.pages[0].data.data.length === 0) {
    return <div>هیچ تک‌آزمونی نیست!</div>;
  }

  if (isLoading) return <Loading size={22} />;

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
      className={style.examOrderListContainer}
    >
      {data?.pages.map((page, i) =>
        page?.data?.data?.map((item) => (
          <div>{<ExamOrderItem item={item} />}</div>
        ))
      )}
    </InfiniteScroll>
  );
};

export default SidePanelOrdersExam;
