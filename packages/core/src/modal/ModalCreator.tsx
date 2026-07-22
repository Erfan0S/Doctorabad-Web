"use client";

import React, { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { lockPageScroll } from "../utils/lockPageScroll";
import { modalActions, useModals } from "./modals";
import { useRouter } from "next/navigation";
// was modal.module.scss (.modalWrapper was never defined there - className dropped)
import { ModalProps } from "../types/modals";
import { fadeInAnimation } from "../constants/animationConfigs";

type ModalCreatorProps = {
  ModalsList: any;
};

const ModalCreator = ({ ModalsList }: ModalCreatorProps) => {
  const router = useRouter();

  const modals = useModals((s) => s.modals);

  const [hardwareBackHistory, setHardwareBackHistory] = useState(true);

  const closeEvent = useCallback(() => {
    modalActions.removeLastModal();
  }, []);

  const close = useCallback(
    (clearModals?: boolean) => {
      setHardwareBackHistory(false);
      if (clearModals) {
        modalActions.clearModals();
      } else {
        router.back();
        modalActions.removeLastModal();
      }
      setTimeout(() => {
        setHardwareBackHistory(true);
      }, 0);
    },
    [router]
  );
  useEffect(() => {
    lockPageScroll(Boolean(modals.length));
    if (modals.length && hardwareBackHistory) {
      window.addEventListener("popstate", closeEvent);
    }
    return () => window.removeEventListener("popstate", closeEvent);
  }, [modals, hardwareBackHistory, closeEvent]);

  return (
    <AnimatePresence>
      {modals.map((modal, index) => {
        const ModalComponent = ModalsList[modal.type] as React.FC<ModalProps>;
        return (
          <motion.div
            {...fadeInAnimation}
            key={modal.type}
            className="fixed start-0 top-0 z-[998] flex h-full w-full items-center justify-center overflow-hidden bg-black/40 backdrop-blur-[5px] max-sm:items-end max-sm:[justify-content:stretch] max-sm:[&>div]:m-auto"
            style={{ zIndex: 1100 + index }}
            onClick={() => close()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div
              style={{ zIndex: 1100 + index + 1 }}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <ModalComponent closeModal={close} data={modal.data} />
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
export default ModalCreator;
