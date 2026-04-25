import { SelectOptionsWrapper } from "@/components/Modals/SelectOptionsModal";
import  UserInfoModal  from "@/components/Modals/UserInfoModal/UserInfoModal";
import { InsuranceDatePickerModal } from "@/components/Modals/InsuranceDatePicker/InsuranceDatePickerModal";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";

export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.INSURANCE_FIELD_SELECT]: SelectOptionsWrapper,
  [ModalTypes.INSURANCE_INFO]: UserInfoModal,
  [ModalTypes.INSURANCE_DATE_PICKER]: InsuranceDatePickerModal,
};
