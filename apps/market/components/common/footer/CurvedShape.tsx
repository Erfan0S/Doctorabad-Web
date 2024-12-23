import { SVGProps } from 'react';

const CurvedShape: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 80" fill="none" {...props}>
            <path d="M0 80C603 -109.5 1354 180 1920 0V80H0Z" />
        </svg>
    );
};

export default CurvedShape;
