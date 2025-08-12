import Image from "next/image";
import style from "./SidePanelOrdersLearning.module.scss";
import Link from "next/link";
import React from "react";
import {Loading} from "@repo/shared_modules/components";
import {CourseListItemType, CourseOrderItem} from "@repo/core/types/course";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {api} from "../../../api/Api";
import InfiniteScroll from "react-infinite-scroller";
import {generateCourseUrlFromId} from "@repo/core/utils/UrlUtils";
import {placeHolderDataUrl} from "@repo/core/constants/placeHolderDataUrl";
import {modalActions} from "@repo/core/modal/modals";
import Basket from "../../../assets/svg/basket";
import Clock from "../../../assets/svg/clock";
import {toFullPersianDateString} from "@repo/core/utils/toFullPersianDateString";
import Dollar from "../../../assets/svg/dollar";
import {priceFormatter} from "@repo/core/utils/priceFormatter";
import {ModalTypes} from "../../../common/modal/modalsTypes";
import {OrderType} from "@repo/core/types/cart";
import CourseList from "../../common/lists/CourseList";
import {PaginatedResponse, ResponseType} from "@repo/core/types/general";
import CourseListItem from "../../common/lists/CourseList/CourseListItem";

const SidePanelFavoritesLearning: React.FC = () => {
  const {data, isLoading} = useQuery({
    queryFn: () => api.getLearnOrdersList(),
    queryKey: ["previousOrdersList"],
    staleTime: 0,
  });

  if (isLoading) return <Loading size={22} />;

  return (
    <div>
      {data?.data?.data &&
        data?.data?.data?.map((item) => (
          <CourseListItem key={item.id} course={item} type="order" />
        ))}
    </div>
  );
};

export default SidePanelFavoritesLearning;
