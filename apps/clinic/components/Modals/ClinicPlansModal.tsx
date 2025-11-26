import ClinicPlans from "@/components/ClinicPlans/ClinicPlans";
import { ModalProps } from "@repo/core/types/modals";

export const ClinicPlansModal: React.FC<ModalProps> = ({ closeModal }) => {
  return <ClinicPlans closeModal={closeModal} />;
};
