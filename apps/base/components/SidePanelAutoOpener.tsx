"use client";
import { modalActions } from "@repo/core/modal/modals";
import { SidePanelPage } from "@repo/core/types/sidePanel";
import { authorizeClientAction } from "@repo/core/utils/authUtils";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useEffect, useRef } from "react";

export default function SidePanelAutoOpener({
  initialPage,
}: {
  initialPage: SidePanelPage;
}) {
  const opened = useRef(false);

useEffect(() => {
  if (!opened.current) {
    opened.current = true;
    authorizeClientAction(() =>
      modalActions.addModal(ModalTypes.SIDE_PANEL, { initialPage })
    )();   
  }
}, [initialPage]);


  return null;
}
