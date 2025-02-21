import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import SelectFilterModal from "./SelectFilterModal";
import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";
import { VideoQualitySelector } from "../../course/videoQualitySelectorModal/VideoQualitySelector";

export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.SELECT_FILTER]: SelectFilterModal,
  [ModalTypes.VIDEO_QUALITY_SELECTOR]: VideoQualitySelector,
};
