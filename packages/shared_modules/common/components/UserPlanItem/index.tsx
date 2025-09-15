import { UserPlanItem as UserPlanItemType } from "@repo/core/types/user";
import styles from "./userPlanItem.module.scss";
import { Apps } from "@repo/core/types/general";

type Props = {
  item: UserPlanItemType;
  app?: Apps;
};

export default function UserPlanItem({ item, app = Apps.BASE }: Props) {
  const { created_at, title, expired_at } = item;

  const createdAtDate = created_at.split(" ")[0];
  const expiredAtDate = expired_at.split(" ")[0];
  const expireHour = expired_at.split(" ")[1];

  return (
    <div className={styles.UserPlanItem + " " + styles[app]}>
      <p>
        من در تاریخ {createdAtDate} {title} را فعال کردم و این طرح تا تاریخ{" "}
        {expiredAtDate} ساعت {expireHour} فعال خواهد بود.
      </p>
    </div>
  );
}
