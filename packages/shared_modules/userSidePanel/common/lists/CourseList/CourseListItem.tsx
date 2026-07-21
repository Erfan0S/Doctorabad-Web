// @ts-ignore
import Clock from "../../../../assets/svg/clock";
// @ts-ignore
import CoinIcon from "../../../../assets/svg/coin";
// @ts-ignore
import Hat from "../../../../assets/svg/hat";
// @ts-ignore
import HomeIcon from "../../../../assets/svg/home";
import Image from "next/image";
import { CourseListItemType, CourseOrderItem } from "@repo/core/types/course";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import formatDuration from "@repo/core/utils/formatDuration";
import { Suspense } from "react";
import CartCheckIcon from "../../../../assets/svg/cartCheck";
import CardCheck from "../../../../assets/svg/cardCheck";
import CalenderCheck from "../../../../assets/svg/calenderCheck";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { OrderType } from "@repo/core/types/cart";
import { FavoriteButton } from "../../../../common/components";
import { Apps } from "@repo/core/types/general";

type Props = {
  course: CourseListItemType | CourseOrderItem;
  type?: "course" | "order";
  toggleFavoriteAction?: () => Promise<any>;
  initialFavoriteState?: boolean;
};

const MetaData = ({ course }: { course: CourseListItemType }) => {
  return (
    <div className="flex w-full items-center gap-5 text-[0.72rem] text-[#666] max-[768px]:text-[0.75rem] max-[425px]:gap-4 max-[425px]:text-[0.6rem]">
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <Clock fontSize={16} />
          <span>{formatDuration(course.duration)} ساعت</span>
        </div>

        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <CoinIcon fontSize={16} />
          <div className="flex flex-col items-start [&_span]:leading-[13px]">
            <span
              style={{
                textDecoration: course.price_off ? "line-through" : "",
              }}
            >
              {priceFormatter(course.price_main)} تومن
            </span>
            {course.price_off ? (
              <span>{priceFormatter(course.price_off)} تومن</span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <Hat fontSize={16} />
          <span>{course.provider.name}</span>
        </div>
        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <HomeIcon fontSize={16} />
          <span>{course.student_count} دانشجو</span>
        </div>
      </div>
    </div>
  );
};

const OrderMetaData = ({ orderCourse }: { orderCourse: CourseOrderItem }) => {
  return (
    <div className="flex w-full items-center gap-5 text-[0.72rem] text-[#666] max-[768px]:text-[0.75rem] max-[425px]:gap-4 max-[425px]:text-[0.6rem]">
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <CartCheckIcon fontSize={16} />
          <span>{orderCourse.order_code}</span>
        </div>
        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <CalenderCheck fontSize={16} />
          <span>{orderCourse.created_at}</span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-[#8b8b8b] [&_svg]:h-4 [&_svg]:w-4">
          <CardCheck fontSize={16} />
          <div className="flex flex-col items-start [&_span]:leading-[13px]">
            <span
              style={{
                textDecoration: orderCourse.price_off ? "line-through" : "",
              }}
            >
              {priceFormatter(orderCourse.price_main)} تومن
            </span>
            {orderCourse.price_off ? (
              <span>{priceFormatter(orderCourse.price_off)} تومن</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
const CourseListItem = ({
  course,
  type = "course",
  initialFavoriteState,
  toggleFavoriteAction,
}: Props) => {
  let MetaDataComponent;

  switch (type) {
    case "course":
      MetaDataComponent = MetaData;
      break;
    case "order":
      MetaDataComponent = OrderMetaData;
      break;
    default:
      MetaDataComponent = Suspense;
      break;
  }

  return (
    <div className="relative mb-4 flex items-center justify-between rounded-2xl bg-white p-2 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
      <a
        href={generateSingleProductUrlFromId(course.id, "", OrderType.Course)}
        target="_blank"
      >
        {course.pic_url ? (
          <Image
            src={course.pic_url}
            alt={course.title}
            width={115}
            height={65}
            className="aspect-video h-[65px] rounded-lg object-cover shadow-[-1px_4px_10px_0px_rgba(0,0,0,0.36)]"
          />
        ) : (
          <div className="aspect-video h-[65px] rounded-lg object-cover shadow-[-1px_4px_10px_0px_rgba(0,0,0,0.36)]" />
        )}
      </a>
      <div className="ms-4 flex h-full flex-1 flex-col justify-between gap-[5px]">
        <div className="flex flex-row flex-nowrap justify-between gap-[5px] [&_h3]:mb-2 [&_h3]:text-[0.8rem] [&_h3]:font-semibold [&_h3]:text-[#333]">
          <a
            href={generateSingleProductUrlFromId(
              course.id,
              "",
              OrderType.Course,
            )}
            target="_blank"
          >
            <h3>{course.title}</h3>
          </a>
          {toggleFavoriteAction && (
            <FavoriteButton
              action={toggleFavoriteAction}
              initialState={initialFavoriteState || false}
              app={Apps.LEARN}
            />
          )}
        </div>
        <MetaDataComponent
          course={course as CourseListItemType}
          orderCourse={course as CourseOrderItem}
        />
      </div>
      <div className="absolute bottom-4 end-4 w-5 rounded-[5px] bg-[#c2c2c2] px-0 py-[2px] text-center text-white">
        {course.language == 1 ? "Fa" : "En"}
      </div>
    </div>
  );
};

export default CourseListItem;
