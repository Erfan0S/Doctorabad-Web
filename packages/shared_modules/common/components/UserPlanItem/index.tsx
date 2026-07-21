import { UserPlanItem as UserPlanItemType } from "@repo/core/types/user";
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
    <div
      className={
        "relative mb-4 flex w-full items-center justify-center rounded-2xl bg-white px-2 py-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]" +
        " " +
        app
      }
    >
      <p className="m-0 w-full text-center text-[length:small] font-bold text-app-base">
        من در تاریخ {createdAtDate} {title} را فعال کردم و این طرح تا تاریخ{" "}
        {expiredAtDate} ساعت {expireHour} فعال خواهد بود.
      </p>
    </div>
  );
}
