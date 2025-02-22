import Tracking from "@/components/tracking";
import { ModalProps } from "@repo/core/types/modals";

export const TrackingModal: React.FC<ModalProps> = ({ closeModal }) => {
  return <Tracking closeModal={closeModal} />;
};
