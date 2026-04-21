"use client"
import { useReducer } from 'react';
import style from './Accordion.module.scss';
import TriangleDown from '@/assets/svg/triangleDown';

interface Props {
    title: string;
    isActive?: boolean;
    contentSpacing?: boolean;
    children?: React.ReactNode;
}

const Accordion: React.FC<Props> = ({ title, isActive = true, children }) => {
    const [active, toggleActive] = useReducer((show) => !show, isActive);

    return (
        <div className={active ? `${style.accordion} ${style.active}` : `${style.accordion}`}>
            <div className={style.accordionTitle} onClick={toggleActive}>
                <span>{title}</span>
                <TriangleDown width={18} height={18} />
            </div>
            <div className={style.accordionContent}>{children}</div>
        </div>
    );
};

export default Accordion;
