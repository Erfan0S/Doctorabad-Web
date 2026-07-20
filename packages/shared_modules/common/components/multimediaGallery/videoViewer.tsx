import React from "react";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import Image, { ImageProps } from "next/image";
import Play from "../../../assets/svg/play";

type Props = {
  src: string;
  thumbnailProps: ImageProps;
};

export const VideoViewer = ({ src, thumbnailProps }: Props) => {
  return (
    <div
      className="relative h-full w-full [&_img]:brightness-[0.7] [&_svg]:absolute [&_svg]:left-1/2 [&_svg]:top-1/2 [&_svg]:z-[100] [&_svg]:h-[40px] [&_svg]:w-[40px] [&_svg]:-translate-x-1/2 [&_svg]:-translate-y-1/2 [&_svg]:cursor-pointer"
      onClick={() => modalActions.addModal(ModalTypes.VIDEO, { src })}
    >
      <Play fill="#eee" />

      {!!thumbnailProps.src && thumbnailProps.src !== src ? (
        <Image {...thumbnailProps} />
      ) : (
        <video controls={false} preload="metadata">
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
