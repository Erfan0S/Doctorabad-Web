import React from 'react';
import style from './webApp.module.scss';
import Image from 'next/image';

import logo from '@/assets/img/logo-without-text.png';
import uoloadIcon from '@/assets/svg/uplaod';
import addIcon from '@/assets/svg/add';
import iaddMultipleIcon from '@/assets/svg/addmultiple';
import arrow from '@/assets/svg/svg-images/installArrowDown.svg';
import { IS_INSTALL_BANNER_SHOW_LOCAL } from '@/constants/constants';
import Link from 'next/link';

interface StepsType {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const STEPS: StepsType[] = [
  {
    text: 'در نوار پایین رو کمه Share بزنید.',
    icon: uoloadIcon,
  },
  {
    text: 'در منوی باز شده در قسمت پایین Add to Home Screen را بزنید.',
    icon: addIcon,
  },
  {
    text: 'در مرحله بعد در قسمت بالا روی Add بزنید.',
    icon: iaddMultipleIcon,
  },
];

const WebAppGuide = () => {
    return (
        <div className={style['webApp-guide-wrapper']}>
            <div className={style['webApp-guide']}>
                <Image src={logo} alt="doctorabad logo" className={style['webApp-guide-image']} />
                <h3>نصب نسخه وب اپلیکیشن</h3>
                <div className={style['steps-wrapper']}>
                    {STEPS.map((step, index) => (
                        <div key={index} className={style.steps}>
                            <div className={style['steps-logo']}>
                                <step.icon />
                            </div>
                            <span className={style['steps-text']}>{step.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Link href={'/'} className={style['webApp-guide-button']}>
                متوجه شدم
            </Link>
            <Image src={arrow} alt="arrow adown" className={style['arrow-down']} />
        </div>
    );
};

export default WebAppGuide;
