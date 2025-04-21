import { SVGProps } from 'react';

const AddMultiple: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.5 8L8.5 5.43C8.5 3.14 9.64 2 11.93 2L19.07 2C21.36 2 22.5 3.14 22.5 5.43L22.5 10C22.5 12.29 21.36 13.43 19.07 13.43"
        stroke={props.stroke || 'currentColor' || '#21B11E'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.5 18.57L2.5 14C2.5 11.71 3.64 10.57 5.93 10.57L13.07 10.57C15.36 10.57 16.5 11.71 16.5 14L16.5 18.57C16.5 20.86 15.36 22 13.07 22L5.93 22C3.64 22 2.5 20.86 2.5 18.57Z"
        stroke={props.stroke || 'currentColor' || '#21B11E'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.5 14.87L9.5 18.13"
        stroke={props.stroke || 'currentColor' || '#21B11E'}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.86988 16.5L11.1299 16.5"
        stroke="#21B11E"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AddMultiple;
