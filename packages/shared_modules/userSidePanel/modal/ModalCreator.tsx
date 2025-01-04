"use client";

import React, { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { lockPageScroll } from "@/utils/lockPageScroll";
import { modalActions, useModals } from "@/states/modals";
import { useRouter } from "next/navigation";
import { ModalsList } from "./modalsList";
import styles from "./modal.module.scss";
import { ModalProps } from "@/types/modals";
import { fadeInAnimation } from "@/constants/animationConfigs";

const ModalCreator = () => {
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
            className={styles.modalOverlay}
            style={{ zIndex: 1100 + index }}
            onClick={() => close()}
          >
            <div
              className={styles.modalWrapper}
              style={{ zIndex: 1100 + index + 1 }}
              onClick={(e) => e.stopPropagation()}
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
