import { ModalProps } from "@repo/core/types";
import React from "react";

type Props = ModalProps<{ src: string }>;

export const VideoModal = ({ data }: Props) => {
  return (
    <video
      style={{ maxWidth: "90vw", maxHeight: "80vh", borderRadius: "10px" }}
      controls
    >
      <source src={data.src} type="video/mp4" />
    </video>
  );
};
