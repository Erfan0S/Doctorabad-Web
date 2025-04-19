import { useEffect, useState } from 'react';

export const useClientComponentInitiated = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  return shouldRender;
};
