import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import QuestionInfoModal from "./QuestionInfoModal";
import ExamStartModal from "./ExamStartModal/ExamStartModal";
import ExitConfirmModal from "./ExitConfirmModal/ExitConfirmModal";
import EndExamModal from "./EndExamModal/EndExamModal";
import AnswerSheetModal from "./AnswerSheet";

export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.QUESTION_INFO]: QuestionInfoModal,
  [ModalTypes.EXAM_START]: ExamStartModal,
  [ModalTypes.EXAM_EXIT_CONFIRM]: ExitConfirmModal,
  [ModalTypes.EXAM_END_CONFIRM]: EndExamModal,
  [ModalTypes.EXAM_ANSWER_SHEET]: AnswerSheetModal,
};
