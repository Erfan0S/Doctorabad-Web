import HomeHeader from '@/components/headers/homeHeader';
import WebAppGuide from '@/components/webApp/WebAppGuide';
import DiviceSwitchShell from '@repo/shared_modules/components/DiviceSwitchShell';
import React from 'react';

const IosPwaGuidePage = () => {
  return (
    <>
                      <DiviceSwitchShell desktop={null} mobile={<HomeHeader  />} />

    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
      >
      <WebAppGuide />
    </div>
      </>
  );
};

export default IosPwaGuidePage;
