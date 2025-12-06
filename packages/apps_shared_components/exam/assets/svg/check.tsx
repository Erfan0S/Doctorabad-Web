import { SVGProps } from "react";

const CheckIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="7"
      height="5"
      viewBox="0 0 7 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.9034 0.599909L2.36786 4.13544L0.600098 2.36768"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
