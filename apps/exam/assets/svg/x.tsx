import { SVGProps } from "react";

const XIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.600098 0.600098L5.6001 5.6001"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M5.6001 0.600098L0.600097 5.6001"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default XIcon;
