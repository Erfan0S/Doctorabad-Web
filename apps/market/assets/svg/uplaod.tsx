import { SVGProps } from "react";

const Upload: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.9398 8.9C20.5398 9.21 22.0098 11.06 22.0098 15.11L22.0098 15.24C22.0098 19.71 20.2198 21.5 15.7498 21.5L9.22976 21.5C4.75976 21.5 2.96976 19.71 2.96976 15.24L2.96976 15.11C2.96976 11.09 4.41976 9.24 7.95976 8.91"
        stroke={props.stroke || "currentColor" || "#21B11E"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.5 15L12.5 3.62"
        stroke={props.stroke || "currentColor" || "#21B11E"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.8501 5.85L12.5001 2.5L9.1501 5.85"
        stroke={props.stroke || "currentColor" || "#21B11E"}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Upload;
