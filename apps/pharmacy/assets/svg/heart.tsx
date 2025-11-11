import { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number;
}

const HeartIcon: React.FC<IconProps> = ({
  size = 24,
  strokeWidth = 1.5,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"     
      strokeWidth={strokeWidth}  
      xmlns="http://www.w3.org/2000/svg"
      {...props}                 
    >
      <path
        d="M12 21.65C11.69 21.65 11.39 21.61 11.14 21.52C7.32 20.21 1.25 15.56 1.25 8.69C1.25 5.19 4.08 2.35 7.56 2.35C9.25 2.35 10.83 3.01 12 4.19C13.17 3.01 14.75 2.35 16.44 2.35C19.92 2.35 22.75 5.2 22.75 8.69C22.75 15.57 16.68 20.21 12.86 21.52C12.61 21.61 12.31 21.65 12 21.65Z"
        fill="none"
      />
    </svg>
  );
};

export default HeartIcon;
