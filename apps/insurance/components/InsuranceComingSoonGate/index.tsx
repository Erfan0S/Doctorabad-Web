"use client";

import { useEffect, useRef } from "react";
import { modalActions, useModals } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { baseUrls } from "@repo/core/constants/routePath";
import { Apps } from "@repo/core/types/general";

const COMING_SOON_MESSAGE = "این بخش به زودی در دسترس قرار می‌گیره";

export default function InsuranceComingSoonGate() {
  const modals = useModals((s) => s.modals);
  const hadModal = useRef(false);

  useEffect(() => {
    modalActions.addModal(ModalTypes.COMING_SOON, {
      message: COMING_SOON_MESSAGE,
    });
  }, []);

  useEffect(() => {
    if (modals.length > 0) {
      hadModal.current = true;
      return;
    }

    if (hadModal.current) {
      window.location.replace(baseUrls[Apps.BASE]);
    }
  }, [modals.length]);

  return null;
}
