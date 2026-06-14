import { SVGProps } from "react";

const ShareIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 16 18"
      {...props}
    >
      <path
        stroke="#51526C"
        strokeLinecap="round"
        strokeWidth="1.2"
        d="M10.278 13.182c0-.396.105-.783.306-1.123l-5.047-2.94a2.217 2.217 0 0 1-3.487.451 2.221 2.221 0 1 1 3.488-2.687l5.043-2.944a2.21 2.21 0 0 1-.133-1.969 2.222 2.222 0 0 1 3.622-.72 2.22 2.22 0 1 1-3.49 2.689L5.539 6.883a2.21 2.21 0 0 1 0 2.235l5.046 2.94a2.217 2.217 0 0 1 3.486-.448 2.22 2.22 0 1 1-3.792 1.572z"
      ></path>
    </svg>
  );
};

export default ShareIcon;
