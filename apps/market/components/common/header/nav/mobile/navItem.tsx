'use client';
import { useReducer } from 'react';
import Link from 'next/link';
import AngleDown from '@/assets/svg/angleDown';

interface Props {
  redirect: () => void;
  title: string;
  openChildrenList?: () => void;
}
const MenuItem: React.FC<Props> = ({ redirect, title, openChildrenList }) => {
  return (
    <>
      <li>
        <span onClick={redirect}>{title}</span>
        {openChildrenList && (
          <div onClick={openChildrenList}>
            <AngleDown stroke="#848484" width={18} height={18} />
          </div>
        )}
      </li>
    </>
  );
};

export default MenuItem;
