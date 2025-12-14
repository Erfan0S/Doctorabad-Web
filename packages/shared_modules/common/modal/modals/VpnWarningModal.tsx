import React from "react";
import VpnWarning from "../../../userSidePanel/modal_components/VpnWarning/VpnWarning";
import { ModalProps } from "@repo/core/types/modals";

const VpnWarningModal: React.FC<ModalProps> = ({ closeModal }) => {
  return <VpnWarning closeModal={closeModal} />;
};

export default VpnWarningModal;
