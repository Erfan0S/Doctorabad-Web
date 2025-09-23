import { ClubInfoModal } from "./modals/ClubInfo";
import { ClubSingleDescModal } from "./modals/ClubSingleDescModal";
import { ClubSingleGetCodeModal } from "./modals/ClubSingleGetCodeModal";
import { MyMessageDetailModal } from "./modals/MyMessageModal";
import { OrderDetailModal } from "./modals/OrderDetailModal";
import { RegisterModal } from "./modals/RegisterModal";
import { SidePanel } from "../../userSidePanel";
import { ModalTypes } from "./modalsTypes";
import { AddAddressModal } from "./modals/AddAddressModal";
import { BugReportModal } from "./modals/BugReportModal";
import { QRContents } from "@repo/shared_modules/components";
import SelectModal from "./modals/SelectModal";
import { QuestionInfoModal } from "@repo/apps_shared_components";
import { DiscountPlansBuyModal } from "@repo/apps_shared_components/exam";

export const ModalsList: any = {
  [ModalTypes.REGISTER]: RegisterModal,
  [ModalTypes.SIDE_PANEL]: SidePanel,
  [ModalTypes.ORDER_DETAIL]: OrderDetailModal,
  [ModalTypes.CLUB_INFO]: ClubInfoModal,
  [ModalTypes.CLUB_SINGLE_GET_CODE]: ClubSingleGetCodeModal,
  [ModalTypes.CLUB_SINGLE_SHOW_DESC]: ClubSingleDescModal,
  [ModalTypes.BUG_REPORT]: BugReportModal,
  [ModalTypes.MY_MESSAGES_DETAIL]: MyMessageDetailModal,
  [ModalTypes.ADD_ADDRESS]: AddAddressModal,
  [ModalTypes.QR_CONTENTS]: QRContents,
  [ModalTypes.SELECT_FILTER]: SelectModal,
  [ModalTypes.QUESTION_INFO]: QuestionInfoModal,
  [ModalTypes.EXAM_DISCOUNT_PLANS]: DiscountPlansBuyModal,
};
