import { MissionType } from "../../types/doctorClub";
import style from "./MissionsItem.module.scss";
import Image from "next/image";
//@ts-ignore
import defaultImage from "../../../assets/img/logo-type.png";

export default function MissionsItem({ mission }: { mission: MissionType }) {
  return (
    <div
      className={`${style.wrapper} ${mission.active ? style.active : ""} card_hover`}
    >
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

      {/* Badge Section (Left in RTL) */}
      <div className={`${style.badge} ${mission.active ? style.active : ""}`}>
        {mission.point_label}
      </div>
    </div>
  );
}
