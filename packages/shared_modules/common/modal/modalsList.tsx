// import { AddAddressModal } from "./modals/AddAddressModal";
// import { BugReportModal } from "./modals/BugReportModal";
import { ClubInfoModal } from "./modals/ClubInfo";
import { ClubSingleDescModal } from "./modals/ClubSingleDescModal";
import { ClubSingleGetCodeModal } from "./modals/ClubSingleGetCodeModal";
import { MyMessageDetailModal } from "./modals/MyMessageModal";
import { OrderDetailModal } from "./modals/OrderDetailModal";
import { RegisterModal } from "./modals/RegisterModal";
// import { TrackingModal } from "./modals/TrackingModal";
// import { VideoModal } from "./modals/VideoModal";
// import { QRContents } from "./qr-contents";
import { SidePanel } from "../../userSidePanel";
import { ModalTypes } from "../types/modals";

export const ModalsList = {
  [ModalTypes.REGISTER]: RegisterModal,
  [ModalTypes.SIDE_PANEL]: SidePanel,
  // [ModalTypes.TRACKING]: TrackingModal,
  // [ModalTypes.BUG_REPORT]: BugReportModal,
  // [ModalTypes.ADD_ADDRESS]: AddAddressModal,
  [ModalTypes.ORDER_DETAIL]: OrderDetailModal,
  [ModalTypes.CLUB_INFO]: ClubInfoModal,
  [ModalTypes.CLUB_SINGLE_GET_CODE]: ClubSingleGetCodeModal,
  [ModalTypes.CLUB_SINGLE_SHOW_DESC]: ClubSingleDescModal,
  [ModalTypes.MY_MESSAGES_DETAIL]: MyMessageDetailModal,
  // [ModalTypes.QR_CONTENTS]: QRContents,
  // [ModalTypes.VIDEO]: VideoModal,
};
