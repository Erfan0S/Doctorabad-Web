import Clock from "@/assets/svg/clock";
import CoinIcon from "@/assets/svg/coin";
import Image from "next/image";
import React from "react";
import { priceFormatter } from "../../../../../packages/core/src/utils/priceFormatter";
import Hat from "@/assets/svg/hat";
import HomeIcon from "@/assets/svg/home";
import { CourseListItemType } from "@/types/courses";
import styles from "./CourseList.module.scss";

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
              <span>03:28</span>
            </div>

            <div className={styles.metadataItem}>
              <CoinIcon fontSize={16} />
              <span>{priceFormatter(course.price_main)}</span>
            </div>
          </div>
          <div className={styles.metadataWrapper}>
            <div className={styles.metadataItem}>
              <Hat fontSize={16} />
              <span>دکترآباد</span>
            </div>
            <div className={styles.metadataItem}>
              <HomeIcon fontSize={16} />
              <span>1020</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.courseLanguageTag}>Fa</div>
    </div>
  );
};

export default CourseListItem;
