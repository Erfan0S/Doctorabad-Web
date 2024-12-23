import React, { useState } from 'react';
import style from './installBanner.module.scss';
import Image from 'next/image';
import logo from '@/assets/img/logo-without-text.png';
import Close_X from '@/assets/svg/close_x';
import { isIOS } from 'react-device-detect';
import { useRouter } from 'next/navigation';
import { IS_INSTALL_BANNER_SHOW_LOCAL } from '@/constants/constants';

type Props = {
  androidDownloadLink: string;
};

const InstallBanner = ({ androidDownloadLink }: Props) => {
  const [isClose, setIsClose] = useState(false);
  const router = useRouter();

  const onInstallHandler = () => {
    if (isIOS) {
      router.push('/pwa');
    } else {
      router.push('/app');
      // window.open(androidDownloadLink, '_blank');
    }
  };

  const onDismisHandler = () => {
    setIsClose(true);

    localStorage.setItem(IS_INSTALL_BANNER_SHOW_LOCAL, 'true');
  };

  return (
    <div className={style.installBannerWrapper + ' ' + (isClose ? style.installBannerClose : '')}>
      <Image className={style.logo} src={logo} alt="drabad logo" />
      <span>دانلود اپلیکیشن دکترآباد</span>
      <button onClick={onInstallHandler}>نصب</button>
      <Close_X onClick={onDismisHandler} />
    </div>
  );
};

export default InstallBanner;
