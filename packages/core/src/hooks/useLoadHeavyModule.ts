import { useEffect, useState } from "react";

export const useLoadHeavyModule = <M>(
  loader: () => Promise<{ default: M }>
): [M | null, boolean] => {
  const [loadingModule, setLoadingModule] = useState(true);
  const [module, setModule] = useState<M | null>(null);

  useEffect(() => {
    loader().then((map) => {
      // @ts-ignore
      setModule(() => map.default || map);
      setLoadingModule(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [module, loadingModule];
};
