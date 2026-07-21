"use client";

import { isUserLoggedIn } from "@repo/core/utils/authUtils";
import { Apps } from "@repo/core/types/general";
import { useQuery } from "@tanstack/react-query";
import { api } from "@repo/shared_modules/api";
import Logo from "../../common/components/logo";
import ProTag from "../../common/components/proTag";
import HeaderButtons from "../HeaderButtons";

type Props = {
  type: Apps;
  className?: string;
};

const MobileHeaderBase = ({ type, className }: Props) => {
  const { data: activePlanData, isSuccess: isActivePlanSuccess } = useQuery({
    queryFn: () => api.getDrProActivePlan(),
    queryKey: ["active_plan"],
    enabled: !!isUserLoggedIn(),
    retry: 1,
  });

  const isPro =
    isActivePlanSuccess && (activePlanData?.data?.data?.left_days ?? 0) > 0;

  return (
    <div
      className={`flex w-full flex-row-reverse items-center justify-between py-[5px] ${type} ${className ?? ""}`}
    >
      <div className="order-1 flex items-center gap-2">
        <Logo />
        <ProTag active={isPro} />
      </div>
      <HeaderButtons />
    </div>
  );
};

export default MobileHeaderBase;
