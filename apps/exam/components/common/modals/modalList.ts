import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import ExitConfirmModal from "./ExitConfirmModal/ExitConfirmModal";
import EndExamModal from "./EndExamModal/EndExamModal";
import AnswerSheetModal from "./AnswerSheet";
import QuestionInfoModal from "./QuestionInfoModal";
import DiscountPlansBuyModal from "./DiscountPlansBuyModal";
import BuyRecommendationModal from "./BuyRecommendationModal";

export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.EXAM_EXIT_CONFIRM]: ExitConfirmModal,
  [ModalTypes.EXAM_END_CONFIRM]: EndExamModal,
  [ModalTypes.EXAM_ANSWER_SHEET]: AnswerSheetModal,
  [ModalTypes.QUESTION_INFO]: QuestionInfoModal,
  [ModalTypes.EXAM_DISCOUNT_PLANS]: DiscountPlansBuyModal,
  [ModalTypes.BUY_RECOMMENDATION]: BuyRecommendationModal,
};
