'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  activeSwitchComponent?: JSX.Element | null;
  title: string;
  id?: string;
  onToggle?: (state: boolean) => void;
  className?: string;
};

// was OptionSwitch.module.scss; on/off knob variants are swapped, not stacked.
// ponytail: knob keeps physical before:right-* offsets like the original scss.
const LI =
  'w-full flex items-center leading-[30px] font-medium text-gray text-[13px] mb-1 list-none';
const SWITCH_BASE =
  "w-[50px] h-[26px] border-2 border-solid border-orange rounded-2xl m-0 relative cursor-pointer before:content-[''] before:absolute before:top-[2px] before:w-[18px] before:h-[18px] before:rounded-[10px] before:transition-all before:duration-150";
const SWITCH_OFF = 'before:right-[2px] before:bg-gray';
const SWITCH_ON = 'before:right-[26px] before:bg-orange';

const OptionSwitch = ({ activeSwitchComponent, title, id, onToggle, className }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const switchId = 'sw_' + (id ? id : 1);

  useEffect(() => {
    onToggle && onToggle(isChecked);
  }, [isChecked]);

  return (
    <>
      <li className={LI + ' ' + className}>
        <span>{title}</span>
        <div className="ms-auto flex">
          <div
            className={`${SWITCH_BASE} ${isChecked ? SWITCH_ON : SWITCH_OFF}`}
            id={switchId}
            onClick={(e) => {
              setIsChecked((prev) => !prev);
            }}
          />
        </div>
      </li>
      {isChecked && activeSwitchComponent && <li>{activeSwitchComponent}</li>}
    </>
  );
};

export default OptionSwitch;
