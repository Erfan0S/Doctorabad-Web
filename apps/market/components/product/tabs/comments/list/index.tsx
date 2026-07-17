import { ProductComments } from "@repo/core/types/product";
import ProductCommentsItem from "./item";
import { InfiniteData } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "@/components/common/loading";
import React from "react";
interface Props {
  comments: InfiniteData<ProductComments, unknown>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const ProductCommentsList: React.FC<Props> = ({
  comments,
  fetchNextPage,
  hasNextPage,
}) => {
  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={
        // ponytail: old style.productListLoader had no rules in this scss module - dropped
        <div key={0}>
          <Loading size={36} />
        </div>
      }
    >
      <div className="flex flex-col">
        {comments.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.data.map((commentItem, index) => (
              <ProductCommentsItem key={index} comment={commentItem} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductCommentsList;
