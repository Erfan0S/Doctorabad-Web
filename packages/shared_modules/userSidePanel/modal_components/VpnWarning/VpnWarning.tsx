import React from "react";
import styles from "./VpnWarningModal.module.scss";
import { ModalWrapper } from "../../../common/components";

const VpnWarning: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div className={styles.vpnWarningModal}>
      <ModalWrapper
        closeModal={closeModal}
        haveAppIcon={false}
        className={styles.modalContent}
      >
        <div className={styles.iconWrapper}>
          <svg
            className={styles.warningIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className={styles.warningText}>
          اگر از VPN استفاده می‌کنید، پیشنهاد می‌شود برای تجربه کاربری بهتر آن
          را خاموش کنید!
        </p>
      </ModalWrapper>
    </div>
  );
};

export default VpnWarning;
