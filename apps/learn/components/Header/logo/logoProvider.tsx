'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import React from 'react';
import MobileHeader from '../mobileHeader';
import Logo from '.';

const LogoProvider = () => {
  const isMobile = useMediaQuery('max-width:768px');

  return isMobile ? <MobileHeader /> : <Logo />;
};

export default LogoProvider;
