import React from 'react';
import styles from './Video.module.scss';
import { modalActions } from '@/states/modals';
import { ModalTypes } from '@/types/modals';
import { MultiMediaConfig } from './multimediaGallery';
import Image, { ImageProps } from 'next/image';
import Play from '@/assets/svg/play';

type Props = {
  src: string;
  thumbnailProps: ImageProps;
};

export const VideoViewer = ({ src, thumbnailProps }: Props) => {
  return (
    <div className={styles.video} onClick={() => modalActions.addModal(ModalTypes.VIDEO, { src })}>
      <Play fill="#eee" />

      {thumbnailProps.src ? (
        <>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image {...thumbnailProps} />
        </>
      ) : (
        <video controls={false} preload="metadata">
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
