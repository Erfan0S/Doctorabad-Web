'use client';
import { CategoryList } from '@/types/category';

import DesktopNav from './desktop/nav';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MobileNav from './mobile/nav';
import { AnimatePresence } from 'framer-motion';
import { useClientComponentInitiated } from '@/hooks/useClientComponentInitiated';

interface Props {
  navData: CategoryList;
}

const Nav = ({ navData }: Props) => {
  const shouldRender = useClientComponentInitiated();
  const isMobile = useMediaQuery('max-width:1200px');

  if (!shouldRender) return null;

  return <>{!isMobile ? <DesktopNav navData={navData} /> : <MobileNav navData={navData} />}</>;
};

export default Nav;
