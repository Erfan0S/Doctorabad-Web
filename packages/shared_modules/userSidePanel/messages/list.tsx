import { SidePanelPageProps } from '@/types/sidePanel';
import SidePanelHeader from '../header';
import style from './SidePanelMessages.module.scss';
import { messagesData } from './messages-data';
import Image from 'next/image';
import Link from 'next/link';
import EmailOpen from '@/assets/svg/emailOpen';
import EmailClose from '@/assets/svg/emailClose';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { api } from '@/api/Api';
import { MessageItem } from '@/types/user';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '@/components/common/loading';
import React from 'react';
import { toFullPersianDateString } from '@/utils/toFullPersianDateString';
import classNames from 'classnames';
import { placeHolderDataUrl } from '@/constants/placeHolderDataUrl';

type Props = {
  openMessage: (id: number) => void;
};

const MessageList: React.FC<Props> = ({ openMessage }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<MessageItem[]>({
    queryKey: ['messages'],
    initialPageParam: 1,
    staleTime: Infinity,
    queryFn: ({ pageParam }) => api.getMessageList(Number(pageParam)).then((res) => res.data.data),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return (lastPageParam as number) + 1;
    },
  });

  return (
    <>
      <div className={style.sidePanelMessages}>
        <InfiniteScroll
          pageStart={1}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Loading size={36} />}
        >
          <div className={style.productCommentsHeader}>
            {data?.pages.map((data, i) => (
              <React.Fragment key={i}>
                {data.map(({ created_at, id, pic_url, seen, summary, title }, index) => (
                  <div key={id} className={classNames(style.sidePanelMessagesItem, seen ? '' : style.unseen)}>
                    <div className={style.sidePanelMessagesItemImage}>
                      <Image width={75} height={75} src={pic_url || placeHolderDataUrl} alt="OrdersImage" />
                    </div>
                    <div className={style.sidePanelMessagesItemContent}>
                      <div className={style.sidePanelMessagesItemTitle}>
                        <span>{title}</span>
                        {seen ? <EmailOpen /> : <EmailClose />}
                      </div>
                      <div className={style.sidePanelMessagesItemFooter}>
                        <span>{toFullPersianDateString(created_at)}</span>
                        <button onClick={() => openMessage(id)}>نشونم بده!</button>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default MessageList;
