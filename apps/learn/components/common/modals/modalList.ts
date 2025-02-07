import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import SelectFilterModal from "./SelectFilterModal";
import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";

export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.SELECT_FILTER]: SelectFilterModal,
};
