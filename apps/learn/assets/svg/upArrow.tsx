import { SVGProps } from 'react';

const UpArrow: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || '30px'}
      height={props.height || '30px'}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 6V18M12 6L7 11M12 6L17 11"
        stroke={props.stroke || 'currentColor' || '#000000'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpArrow;
