import Clock from "@/assets/svg/clock";
import CoinIcon from "@/assets/svg/coin";
import Image from "next/image";
import React from "react";

import CategoryIcon from "@/assets/svg/category";
import Hat from "@/assets/svg/hat";
import HomeIcon from "@/assets/svg/home";
import { PackageListItemType } from "@/types/courses";
import styles from "./CourseList.module.scss";
import { priceFormatter } from "@repo/core/utils/priceFormatter";
import formatDuration from "@/utils/formatDuration";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { ListProductSnappayNotif } from "@repo/shared_modules/components";

type Props = {
  package_item: PackageListItemType;
};

const CourseListItem = ({ package_item }: Props) => {
  return (
    <div className={styles.courseCard}>
      {package_item.installment_payment && (
        <ListProductSnappayNotif className={styles.installmentPayment} />
      )}
      {package_item.picture ? (
        <Image
          src={package_item.picture || placeHolderDataUrl}
          alt={package_item.title}
          width={115}
          height={65}
          className={styles.courseImage}
          placeholder={placeHolderDataUrl}
        />
      ) : (
        <div className={styles.courseImage} />
      )}
      <div className={styles.courseInfo}>
        <h3 className={styles.title}>{package_item.title}</h3>
        <p className={styles.providerName}>{package_item.provider}</p>
        <div className={styles.metadata}>
          <div className={styles.metadataWrapper}>
            <div className={styles.metadataItem}>
              <CategoryIcon fontSize={16} />
              <span>{package_item.category[0].title || "_"}</span>
            </div>

            <div className={styles.metadataItem}>
              <CoinIcon fontSize={16} />
              <div className={styles.coursePrice}>
                <span
                  style={{
                    textDecoration: package_item.off_price
                      ? "line-through"
                      : "",
                  }}
                >
                  {!(package_item.main_price <= 0)
                    ? priceFormatter(package_item.main_price) + " تومن"
                    : "رایگان"}
                </span>
                {package_item.off_price ? (
                  <span>{priceFormatter(package_item.off_price)} تومن</span>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.metadataWrapper}>
            <div className={styles.metadataItem}>
              <HomeIcon fontSize={16} />
              <span>{package_item?.sell_count || "_"} دانشجو</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.courseLanguageTag}>
        {package_item.language == 1
          ? "Fa"
          : package_item.language == 2
            ? "En"
            : "Ar"}
      </div>
    </div>
  );
};

export default CourseListItem;
