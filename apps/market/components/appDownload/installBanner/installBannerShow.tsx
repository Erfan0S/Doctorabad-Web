'use client';
import { IS_INSTALL_BANNER_SHOW_LOCAL } from '@/constants/constants';

import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import InstallBanner from './installBanner';
import { usePathname } from 'next/navigation';
import { HomeStatisticsType } from '@/types/homeStatistics';

type Props = {
  statistic: HomeStatisticsType;
};

export const InstallBannerShow = ({ statistic }: Props) => {
  let [isBannerShow, setIsBannerShow] = useState<boolean | null>(false);
  let pathName = usePathname();

  useEffect(() => {
    setIsBannerShow(
      !localStorage.getItem(IS_INSTALL_BANNER_SHOW_LOCAL) &&
        isMobile &&
        pathName != '/app' &&
        pathName != '/pwa'
    );
  }, [pathName]);

  return <>{isBannerShow ? <InstallBanner androidDownloadLink={statistic.direct_download_url} /> : null}</>;
};
