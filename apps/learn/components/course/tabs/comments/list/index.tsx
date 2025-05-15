import { ProductComments } from "@repo/core/types/product";
import style from "./ProductCommentsList.module.scss";
import ProductCommentsItem from "./item";
import { InfiniteData } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Loading } from "@repo/shared_modules/components";
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
  return comments.pages[0].data.length > 0 ? (
    <InfiniteScroll
      pageStart={1}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={
        <div className={style.productListLoader} key={0}>
          <Loading size={36} color="red" />
        </div>
      }
    >
      <div className={style.productCommentsHeader}>
        {comments.pages.map((data, i) => (
          <React.Fragment key={i}>
            {data.data.map((commentItem, index) => (
              <ProductCommentsItem key={index} comment={commentItem} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  ) : (
    <span className={style.noComments}>اولین نفری باش که نظر میذاره...</span>
  );
};

export default ProductCommentsList;
