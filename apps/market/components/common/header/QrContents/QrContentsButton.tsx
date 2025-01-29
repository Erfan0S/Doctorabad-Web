"use client";
import { modalActions } from "@/states/modals";
import { ModalTypes } from "@/types/modals";
import { authorizeClientAction } from "@repo/core/utils";
import Image from "next/image";
import React from "react";
import QRScannerIcon from "@/assets/img/gift.png";

export const QrContentsButton = () => {
  return (
    <button
      onClick={authorizeClientAction(() =>
        modalActions.addModal(ModalTypes.QR_CONTENTS)
      )}
    >
      <Image src={QRScannerIcon} alt="qr scanner" />
    </button>
  );
};
