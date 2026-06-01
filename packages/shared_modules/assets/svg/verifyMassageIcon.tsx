import { SVGProps } from "react";

const VerifyMassageIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.75 0.75H6.75C2.75 0.75 0.75 2.75 0.75 6.75V19.75C0.75 20.3 1.2 20.75 1.75 20.75H14.75C18.75 20.75 20.75 18.75 20.75 14.75V6.75C20.75 2.75 18.75 0.75 14.75 0.75Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default VerifyMassageIcon;
