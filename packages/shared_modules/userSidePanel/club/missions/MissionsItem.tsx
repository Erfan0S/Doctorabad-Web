import { MissionType } from "../../types/doctorClub";
import style from "./MissionsItem.module.scss";
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
      className={`${style.wrapper} ${active ? style.active : ""} card_hover`}
      onClick={() => {
        if (loading) return;
        if (diactiveWhenClick) {
          setActive(false);
        }
        mission.onClick?.(active, setActive, setLoading);
      }}
    >
      <div>
        {/* Icon Section (Right in RTL) */}
        <div className={style.iconWrapper}>
          <Image
            src={mission.picture || defaultImage}
            alt={mission.title}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Content Section (Center) */}
        <div className={style.content}>
          <div className={style.title}>{mission.title}</div>
          {mission.description && (
            <div className={style.description}>{mission.description}</div>
          )}
        </div>
      </div>

      {/* Badge Section (Left in RTL) */}
      <div className={`${style.badge} ${active ? style.active : ""}`}>
        {mission.point_label}
      </div>

      {active && mission.onClick && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            if (loading) return;
            mission.onClick?.(active, setActive, setLoading);
          }}
          className={style.button}
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
