import { SVGProps } from 'react';

const TriangleDown: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path d="M6.5,8.5l6,7l6-7H6.5z" />
            <rect style={{ fill: 'none' }} width="24" height="24" />
            <rect style={{ fill: 'none' }} width="24" height="24" />
        </svg>
    );
};

export default TriangleDown;
