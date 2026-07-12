import { ModalProps } from "@repo/core/types/modals";
import Tracking from "../../components/tracking";

export const TrackingModal = ({ closeModal }: ModalProps) => {
  return <Tracking closeModal={closeModal} />;
};
