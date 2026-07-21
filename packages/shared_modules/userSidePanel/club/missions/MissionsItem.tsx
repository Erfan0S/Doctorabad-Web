import { MissionType } from "../../types/doctorClub";
import Image from "next/image";
//@ts-ignore
import defaultImage from "../../../assets/img/logo-type.png";
import { Button, Loading } from "../../../common/components";
import { useState } from "react";

export default function MissionsItem({
  mission,
  diactiveWhenClick,
}: {
  mission: MissionType;
  diactiveWhenClick?: boolean;
}) {
  const [active, setActive] = useState(mission.active);
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`relative mb-3 flex cursor-default flex-col items-center justify-between rounded-xl border-solid bg-white px-[5px] py-2 transition-all duration-200 [direction:rtl] ${active ? "border-2 border-green-base" : "border border-[#e2e8f0]"} card_hover`}
      onClick={() => {
        if (loading) return;
        if (diactiveWhenClick) {
          setActive(false);
        }
        mission.onClick?.(active, setActive, setLoading);
      }}
    >
      <div className="flex w-full items-center justify-start">
        {/* Icon Section (Right in RTL) */}
        <div className="relative ml-2.5 h-16 w-16 flex-shrink-0">
          <Image
            src={mission.picture || defaultImage}
            alt={mission.title}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Content Section (Center) */}
        <div className="flex flex-grow flex-col justify-center">
          <div className="mb-1 pl-[60px] text-[0.85rem] font-bold text-[#4b5563]">{mission.title}</div>
          {mission.description && (
            <div className="text-[0.775rem] leading-[1.4] text-[#9ca3af]">{mission.description}</div>
          )}
        </div>
      </div>

      {/* Badge Section (Left in RTL) */}
      <div className={`absolute left-[7px] top-[5px] flex min-w-[60px] flex-shrink-0 items-center justify-center rounded-lg px-2.5 py-1 text-[0.65rem] font-semibold text-white ${active ? "bg-green-base" : "bg-[#cbd5e1]"}`}>
        {mission.point_label}
      </div>

      {active && mission.onClick && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            if (loading) return;
            mission.onClick?.(active, setActive, setLoading);
          }}
          className="mt-2.5 w-full px-1.5 py-1 text-sm"
        >
          {loading ? (
            <Loading size={20} />
          ) : (
            mission.button_text || "دریافت جایزه"
          )}
        </Button>
      )}
    </div>
  );
}
