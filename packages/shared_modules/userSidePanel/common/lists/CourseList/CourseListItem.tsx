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
import styles from "./CourseList.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import formatDuration from "@repo/core/utils/formatDuration";
import { Suspense } from "react";
import CartCheckIcon from "../../../../assets/svg/cartCheck";
import CardCheck from "../../../../assets/svg/cardCheck";
import CalenderCheck from "../../../../assets/svg/calenderCheck";
import { generateSingleProductUrlFromId } from "@repo/core/utils/UrlUtils";
import { OrderType } from "@repo/core/types/cart";

type Props = {
  course: CourseListItemType | CourseOrderItem;
  type?: "course" | "order";
};

// TODO: Make two seprate components for course and order

const MetaData = ({ course }: { course: CourseListItemType }) => {
  return (
    <div className={styles.metadata}>
      <div className={styles.metadataWrapper}>
        <div className={styles.metadataItem}>
          <Clock fontSize={16} />
          <span>{formatDuration(course.duration)} ساعت</span>
        </div>

        <div className={styles.metadataItem}>
          <CoinIcon fontSize={16} />
          <div className={styles.coursePrice}>
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
      <div className={styles.metadataWrapper}>
        <div className={styles.metadataItem}>
          <Hat fontSize={16} />
          <span>{course.provider.name}</span>
        </div>
        <div className={styles.metadataItem}>
          <HomeIcon fontSize={16} />
          <span>{course.student_count} دانشجو</span>
        </div>
      </div>
    </div>
  );
};

const OrderMetaData = ({ orderCourse }: { orderCourse: CourseOrderItem }) => {
  return (
    <div className={styles.metadata}>
      <div className={styles.metadataWrapper}>
        <div className={styles.metadataItem}>
          <CartCheckIcon fontSize={16} />
          <span>{orderCourse.order_code}</span>
        </div>
        <div className={styles.metadataItem}>
          <CalenderCheck fontSize={16} />
          <span>{orderCourse.created_at}</span>
        </div>
      </div>
      <div className={styles.metadataWrapper}>
        <div className={styles.metadataItem}>
          <CardCheck fontSize={16} />
          <div className={styles.coursePrice}>
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
const CourseListItem = ({ course, type = "course" }: Props) => {
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
    <a
      href={generateSingleProductUrlFromId(course.id, "", OrderType.Course)}
      target="_blank"
    >
      <div className={styles.courseCard}>
        {course.pic_url ? (
          <Image
            src={course.pic_url}
            alt={course.title}
            width={115}
            height={65}
            className={styles.courseImage}
          />
        ) : (
          <div className={styles.courseImage} />
        )}
        <div className={styles.courseInfo}>
          <h3 className={styles.title}>{course.title}</h3>
          <MetaDataComponent
            course={course as CourseListItemType}
            orderCourse={course as CourseOrderItem}
          />
        </div>
        <div className={styles.courseLanguageTag}>
          {course.language == 1 ? "Fa" : "En"}
        </div>
      </div>
    </a>
  );
};

export default CourseListItem;
