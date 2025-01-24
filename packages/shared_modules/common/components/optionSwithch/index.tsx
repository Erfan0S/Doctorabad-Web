'use client';
import React, { useEffect, useState } from 'react';
import style from './OptionSwitch.module.scss';
import classNames from 'classnames';

type Props = {
  activeSwitchComponent?: JSX.Element | null;
  title: string;
  id?: string;
  onToggle?: (state: boolean) => void;
  className?: string;
};

const OptionSwitch = ({ activeSwitchComponent, title, id, onToggle, className }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const switchId = 'sw_' + (id ? id : 1);

  useEffect(() => {
    onToggle && onToggle(isChecked);
  }, [isChecked]);

  return (
    <>
      <li className={style.options + ' ' + className}>
        <span>{title}</span>
        <div className={style.optionsWrapper}>
          <div
            className={classNames(style.optionsSwitch, { [style.optionsSwitchActive]: isChecked })}
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
