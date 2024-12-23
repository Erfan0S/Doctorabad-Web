import { SVGProps } from 'react';

const AngleDown: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 8L12 16L20 8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={props.stroke || 'currentColor' || '#000000'}
      />
    </svg>
  );
};

export default AngleDown;
