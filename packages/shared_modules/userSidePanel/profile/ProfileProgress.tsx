import { CircularProgressbar } from "react-circular-progressbar";
import style from "./SidePanelProfile.module.scss";
import { User } from "@repo/core/types/user";

type Props = {
  userData: User;
};

const allProfileDataKeys = [
  "name",
  "national_code",
  "mobile",
  "nickname",
  "email",
  "birthday",
  "field_id",
  "grade_id",
  "province_id",
  "city_id",
  "address",
  "postalCode",
];

export const ProfileProgress = ({ userData }: Props) => {
  const percentage = (
    (100 / allProfileDataKeys.length) *
    Object.entries(userData).filter(
      ([key, val]) => allProfileDataKeys.includes(key) && val,
    ).length
  ).toFixed(0);

  const isProfileCompleted = percentage === "100";

  const circularProgressStyle = {
    path: {
      stroke: `${isProfileCompleted ? "#00BC00" : "red"}`,
    },
  };

  return (
    <>
      <span className={isProfileCompleted ? style.green : style.red}>
        {percentage}%
      </span>
      <CircularProgressbar
        strokeWidth={3}
        value={Number(percentage)}
        styles={circularProgressStyle}
      />
    </>
  );
};
