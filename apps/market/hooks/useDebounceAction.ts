import { useCallback, useRef } from 'react';

const useDebounceAction = <Fn extends (...args: any[]) => any>(fn: Fn, timeout: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const debounceFunction = useCallback(
    (...args: Parameters<Fn>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        fn.apply(this, args);
      }, timeout);
    },
    [fn, timeout]
  );
  return debounceFunction;
};

export default useDebounceAction;
