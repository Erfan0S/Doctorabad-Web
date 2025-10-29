import { ModalProps } from "@repo/core/types/modals";
import { Register } from "../../../userSidePanel/modal_components/register";

export const RegisterModal = ({
  data,
}: ModalProps<{ onVerifySuccess?: () => void }>) => {
  return <Register onVerifySuccess={data?.onVerifySuccess} />;
};
