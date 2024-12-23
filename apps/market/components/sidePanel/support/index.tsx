import { SidePanelPage, SidePanelPageProps } from '@/types/sidePanel';
import SidePanelHeader from '../header';
import { useEffect } from 'react';
import { api } from '@/api/Api';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/loading';
import { isUserLoggedIn } from '@/utils/authUtils';
import { modalActions } from '@/states/modals';

const SidePanelSupport: React.FC<SidePanelPageProps> = ({ setPage }) => {
  const onBack = () => {
    if (isUserLoggedIn()) {
      setPage(SidePanelPage.MAIN);
    } else {
      modalActions.removeLastModal();
    }
  };

  return (
    <>
      <SidePanelHeader onBack={onBack} title="پشتیبانی" />
      <iframe
        style={{ height: window.innerHeight - 61 + 'px', width: '100%' }}
        src={'https://www.goftino.com/c/cskpcR'}
      />
    </>
  );
};

export default SidePanelSupport;
