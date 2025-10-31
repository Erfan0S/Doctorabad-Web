import { SVGProps } from "react";

const Close_X: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={props.fill || "#fff"}
      color={props.color || "#fff"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 11.0573L15.3 7.75732L16.2427 8.69999L12.9427 12L16.2427 15.3L15.3 16.2427L12 12.9427L8.69999 16.2427L7.75732 15.3L11.0573 12L7.75732 8.69999L8.69999 7.75732L12 11.0573Z"
        fill={props.fill || "currentColor" || "#fff"}
        color={props.color || "currentColor" || "#fff"}
      />
    </svg>
  );
};

export default Close_X;
