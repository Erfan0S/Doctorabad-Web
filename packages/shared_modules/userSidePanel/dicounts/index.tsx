import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/Api";
import { SidePanelPageProps } from "@repo/core/types/sidePanel";
import { Loading } from "../../common/components";
import { DiscountItem } from "./DiscountItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { PaginationOptions } from "swiper/types";
import { Pagination } from "swiper/modules";
import SidePanelHeader from "../header";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

export const SidePanelDiscounts: React.FC<SidePanelPageProps> = ({
  setPage,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["DiscountPlans"],
    queryFn: () => api.getDiscountPlans(1),
  });

  const paginationOption: PaginationOptions = {
    type: "bullets",
    clickable: true,
  };

  return (
    <>
      <SidePanelHeader setPage={setPage} title="طرح‌های من" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-full w-full p-[50px] pb-[100px]">
          <Swiper
            modules={[Pagination]}
            className="relative flex h-full flex-row overflow-visible [&_.swiper-pagination]:absolute [&_.swiper-pagination]:-bottom-[50px] [&_.swiper-pagination-bullet]:h-[10px] [&_.swiper-pagination-bullet]:w-[10px] [&_.swiper-pagination-bullet]:bg-black [&_.swiper-pagination-bullet-active]:!bg-green-base"
            spaceBetween={30}
            pagination={paginationOption}
            direction="horizontal"
            dir="ltr"
          >
            {data?.data.data.map((item) => (
              <SwiperSlide key={item.id}>
                <DiscountItem data={item} key={item.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};
