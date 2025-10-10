import React from "react";
import styles from "./Video.module.scss";
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
      className={styles.video}
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
