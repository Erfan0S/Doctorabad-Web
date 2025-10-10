"use client";

import { MultimediaType } from "@repo/core/types/general";
import React, { useEffect, useState } from "react";
import { ImageProps } from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { ImageViewer } from "./imageViewer";
import { VideoViewer } from "./videoViewer";

export type MultiMediaConfig = {
  src: string;
  video_src?: string;
  type: MultimediaType;
  alt: string;
};

type ImagesDimensions = { [key: string]: { width: number; height: number } };

type Props = {
  config: MultiMediaConfig[];
  containerSelector: string;
  imageProps: Omit<ImageProps, "src" | "alt">;
  renderVideo?: (conf: MultiMediaConfig) => React.ReactNode;
  renderParent?: (
    conf: MultiMediaConfig,
    MediaNode: React.ReactNode
  ) => React.ReactNode;
};

export const MultimediaGallery = ({
  config,
  imageProps,
  renderParent,
  renderVideo,
  containerSelector,
}: Props) => {
  const [imagesDimensions, setImagesDimensions] = useState<ImagesDimensions>(
    {}
  );
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: containerSelector,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      (lightbox as any) = null;
    };
  }, [imagesDimensions, containerSelector]);

  return config.map((config) => {
    const { alt, src, type } = config;

    const props = { ...imageProps, alt: alt, src };

    let node = null;

    switch (type) {
      case MultimediaType.IMAGE:
        node = (
          <ImageViewer
            imageProps={props}
            imageDimensions={imagesDimensions[src]}
            setDimensions={(data) =>
              setImagesDimensions((prev) => ({ ...prev, [src]: data }))
            }
            key={alt}
          />
        );
        break;
      case MultimediaType.VIDEO:
        const video = (
          <VideoViewer
            src={config.video_src!}
            thumbnailProps={props}
            key={alt}
          />
        );
        node = renderVideo ? renderVideo(config) : video;
        break;
    }
    return renderParent ? renderParent(config, node) : node;
  });
};
