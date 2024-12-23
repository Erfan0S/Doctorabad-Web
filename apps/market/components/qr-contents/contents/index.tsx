import { EffectCards } from 'swiper/modules';

import 'swiper/css/effect-cards';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BookContentFile } from '@/types/bookContents';
import styles from './bookContents.module.scss';
import { getMediaType } from '@/utils/getMediaType';

import { placeHolderDataUrl } from '@/constants/placeHolderDataUrl';
import 'photoswipe/style.css';
import { MultimediaGallery } from '@/components/common/multimediaGallery/multimediaGallery';
type Props = { items: BookContentFile[]; title: string };

export const Contents = ({ items, title }: Props) => {
  const gallery = MultimediaGallery({
    config: items.map((item) => {
      const mediaType = getMediaType(item.file_detail.url);

      return {
        alt: item.subtitle,
        src: item.file_detail.thumbnail || item.file_detail.url || placeHolderDataUrl,
        video_src: item.file_detail.url,
        type: mediaType,
      };
    }),
    imageProps: { fill: true },
    containerSelector: '#multiMediaContents',
  });

  return (
    <Swiper
      id="multiMediaContents"
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards]}
      className={styles.ContentsSlider}
    >
      {items.map(({ body, file_detail, subtitle }, i) => {
        return (
          <SwiperSlide className={styles.ContentsSliderSliderItem} key={file_detail.name}>
            <div className={styles.ContentsSliderInnerItem}>
              <div className={styles.ContentsSliderInnerItemImage}>{gallery[i]}</div>
              <h5>{title}</h5>
              <div className={styles.ContentsSliderInnerItemBody}>
                <h6>{subtitle}</h6>
                {body && (
                  <div
                    style={{ overflow: 'auto', maxHeight: '100%' }}
                    dangerouslySetInnerHTML={{ __html: body }}
                  ></div>
                )}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
