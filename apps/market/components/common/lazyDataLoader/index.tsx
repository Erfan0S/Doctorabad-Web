'use client';

import { ResponseType } from '@/types/general';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type Props<D = any> = {
  loader: () => Promise<ResponseType<D>>;
  queryKey: string;
  component: (p: { data: D }) => ReactNode;
  placeHolder: () => ReactNode;
};

export const LazyDataLoader = <S extends Object>({
  loader,
  component: Component,
  queryKey,
  placeHolder: PlaceHolder,
}: Props<S>) => {
  const { data, isLoading, isPending, isSuccess, isError, refetch } = useQuery({
    queryFn: loader,
    queryKey: [queryKey],
    retry: false,
    enabled: false,
  });
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !isSuccess) refetch();
    },
    threshold: 0.5,
  });

  if (isLoading || isPending)
    return (
      <div ref={ref}>
        <PlaceHolder />
      </div>
    );

  if (isError)
    return (
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <p style={{ flex: '0 0 100%', maxWidth: '100%', textAlign: 'center' }}>
            مشکل در دریافت اطلاعات.مجددا تلاش کنید
          </p>
          <button onClick={() => refetch()}>تلاش دوباره</button>
        </div>
        <div style={{ filter: 'blur(5px)' }}>
          <PlaceHolder />
        </div>
      </div>
    );

  return <Component data={data!.data} />;
};
