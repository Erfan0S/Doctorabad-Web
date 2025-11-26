import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";
import { ClinicPlansModal } from "@/components/Modals/ClinicPlansModal";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";

export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.EXAM_DISCOUNT_PLANS]: ClinicPlansModal,
};
