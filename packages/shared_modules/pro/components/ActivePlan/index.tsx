const containerCls =
  "flex w-full items-center justify-between rounded-[20px] border-2 border-solid border-green-pro px-[15px] py-[3px]";
const titleCls = "mt-2 text-[20px] font-bold text-black";
const activePlanCls =
  "rounded-2xl bg-green px-6 py-[5px] text-[16px] font-bold text-white";
const noPlanCls =
  "rounded-xl bg-red px-6 py-[5px] text-[16px] font-bold text-white";

const ActivePlan = ({ data }: { data?: DrProActivePlan }) => {
  return (
    <div className={containerCls}>
        <h2 className={titleCls}>وضعیت اشتراک</h2>
      <div className={(data?.left_days ?? 0) > 0 ? activePlanCls : noPlanCls}>{(data?.left_days ?? 0) > 0 ? `${data?.left_days} روز مانده` : "غیرفعال"}</div>
    </div>
  );
};

import { DrProActivePlan } from "@repo/core/types/dr-pro";

export default ActivePlan;