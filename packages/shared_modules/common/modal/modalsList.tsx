import { ClubInfoModal } from "./modals/ClubInfo";
import { ClubSingleDescModal } from "./modals/ClubSingleDescModal";
import { ClubSingleGetCodeModal } from "./modals/ClubSingleGetCodeModal";
import { MyMessageDetailModal } from "./modals/MyMessageModal";
import { OrderDetailModal } from "./modals/OrderDetailModal";
import { RegisterModal } from "./modals/RegisterModal";
import { SidePanel } from "../../userSidePanel";
import { ModalTypes } from "@repo/core/types";

export const ModalsList = {
  [ModalTypes.REGISTER]: RegisterModal,
  [ModalTypes.SIDE_PANEL]: SidePanel,
  [ModalTypes.ORDER_DETAIL]: OrderDetailModal,
  [ModalTypes.CLUB_INFO]: ClubInfoModal,
  [ModalTypes.CLUB_SINGLE_GET_CODE]: ClubSingleGetCodeModal,
  [ModalTypes.CLUB_SINGLE_SHOW_DESC]: ClubSingleDescModal,
  [ModalTypes.MY_MESSAGES_DETAIL]: MyMessageDetailModal,
};
