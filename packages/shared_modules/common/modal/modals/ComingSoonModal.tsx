import React from "react";
import { ModalProps } from "@repo/core/types/modals";
import { Close_X } from "@repo/shared_modules/icons";
import styles from "./ComingSoonModal.module.scss";

type ComingSoonModalData = {
  message?: string;
};

const DEFAULT_MESSAGE = "این بخش به زودی در دسترس قرار می‌گیره";

const ComingSoonModal: React.FC<ModalProps<ComingSoonModalData>> = ({
  closeModal,
  data,
}) => {
  return (
    <div className={styles.comingSoon}>
      <Close_X onClick={() => closeModal()} className={styles.closeIcon} />
      <p>{data?.message || DEFAULT_MESSAGE}</p>
    </div>
  );
};

export default ComingSoonModal;
