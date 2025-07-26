import { UserPlanItem as UserPlanItemType } from "@repo/core/types/user";
import React from "react";
import styles from "./myCourses.module.scss";

type Props = {
  item: UserPlanItemType;
};

export default function UserPlanItem({ item }: Props) {
  const { created_at, title, expired_at } = item;

  const createdAtDate = created_at.split(" ")[0];
  const expiredAtDate = expired_at.split(" ")[0];
  const expireHour = expired_at.split(" ")[1];

  return (
    <div className={styles.UserPlanItem}>
      <p>
        من در تاریخ {createdAtDate} {title} را فعال کردم و این طرح تا تاریخ{" "}
        {expiredAtDate} ساعت {expireHour} فعال خواهد بود.
      </p>
    </div>
  );
}
