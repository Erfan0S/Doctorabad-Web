import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import QuestionInfoModal from "./QuestionInfoModal";

export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.QUESTION_INFO]: QuestionInfoModal,
};
