import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import SelectFilterModal from "./SelectFilterModal";
import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";
import { VideoQualitySelector } from "../../course/videoQualitySelectorModal/VideoQualitySelector";
import AddLeasonNoteModal from "../../course/video-player/addNoteModal/AddLeasonNoteModal";
import { VideoNotesListModal } from "../../course/videoNotesListModal/VideoNotesListModal";
export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.SELECT_FILTER]: SelectFilterModal,
  [ModalTypes.VIDEO_QUALITY_SELECTOR]: VideoQualitySelector,
  [ModalTypes.ADD_NOTE]: AddLeasonNoteModal,
  [ModalTypes.VIDEO_NOTES_LIST]: VideoNotesListModal,
};
