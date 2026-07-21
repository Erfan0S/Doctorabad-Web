import { CircularProgressbar } from "react-circular-progressbar";
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

const PROGRESS_BADGE =
  "absolute -top-[15px] right-1/2 z-10 min-w-[27px] translate-x-1/2 rounded-[15px] border border-solid border-white text-center text-[10px] leading-[25px] text-white shadow-[0_0_5px_rgba(0,0,0,0.15)]";

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
      <span
        className={`${PROGRESS_BADGE} ${isProfileCompleted ? "bg-green" : "bg-red"}`}
      >
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
