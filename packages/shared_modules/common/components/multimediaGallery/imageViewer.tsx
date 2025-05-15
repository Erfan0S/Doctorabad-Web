import React from 'react';
import Image, { ImageProps } from 'next/image';

type Dimensions = { width: number; height: number };

type Props = {
  setDimensions: (data: Dimensions) => void;
  imageDimensions: Dimensions | undefined;
  imageProps: ImageProps;
};

export const ImageViewer = ({ imageDimensions, imageProps, setDimensions }: Props) => {
  const src = imageProps.src as string;

  return imageDimensions ? (
    <a
      href={src}
      data-pswp-width={imageDimensions.width}
      data-pswp-height={imageDimensions.height}
      key={src}
      target="_blank"
      rel="noreferrer"
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...imageProps} />
    </a>
  ) : (
    <>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        }}
        {...imageProps}
      />
    </>
  );
};
