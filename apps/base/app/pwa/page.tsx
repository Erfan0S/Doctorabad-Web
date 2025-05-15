import WebAppGuide from '@/components/webApp/WebAppGuide';
import React from 'react';

const IosPwaGuidePage = () => {
  return (
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
  );
};

export default IosPwaGuidePage;
