import { SVGProps } from 'react';

const Squircle: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ccc" {...props}>
      <path
        d="
        M 0 25
        C 0 2.4999999999999996, 2.4999999999999996 0, 25 0
        S 50 2.4999999999999996, 50 25, 47.5 50
          25 50, 0 47.5, 0 25
    "
        transform="
        rotate(
            0,
            25,
            25
        )
        translate(
            0,
            0
        )
    "
      ></path>
    </svg>
  );
};

export default Squircle;
