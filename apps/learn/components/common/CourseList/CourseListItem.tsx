import Clock from "@/assets/svg/clock";
import CoinIcon from "@/assets/svg/coin";
import Image from "next/image";
import React from "react";

import Hat from "@/assets/svg/hat";
import HomeIcon from "@/assets/svg/home";
import { CourseListItemType } from "@/types/courses";
import styles from "./CourseList.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import formatDuration from "@/utils/formatDuration";

type Props = {
  course: CourseListItemType;
};

const CourseListItem = ({ course }: Props) => {
  return (
    <div className={styles.courseCard}>
      {course.pic_url ? (
        <Image
          src={course.pic_url}
          alt={course.title}
          width={80}
          height={80}
          className={styles.courseImage}
        />
      ) : (
        <div className={styles.courseImage} />
      )}
      <div className={styles.courseInfo}>
        <h3 className={styles.title}>{course.title}</h3>
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
                  {!(course.price_main <= 0)
                    ? priceFormatter(course.price_main) + " تومن"
                    : "رایگان"}
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
      </div>
      <div className={styles.courseLanguageTag}>
        {course.language == 1 ? "Fa" : "En"}
      </div>
    </div>
  );
};

export default CourseListItem;
