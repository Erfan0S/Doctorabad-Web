import { AddAddressModal } from "@/components/modals/AddAddressModal";
import { BugReportModal } from "@/components/modals/BugReportModal";
import { ClubInfoModal } from "@/components/modals/ClubInfo";
import { ClubSingleDescModal } from "@/components/modals/ClubSingleDescModal";
import { ClubSingleGetCodeModal } from "@/components/modals/ClubSingleGetCodeModal";
import { MyMessageDetailModal } from "@/components/modals/MyMessageModal";
import { OrderDetailModal } from "@/components/modals/OrderDetailModal";
import { RegisterModal } from "@/components/modals/RegisterModal";
import { TrackingModal } from "@/components/modals/TrackingModal";
import { VideoModal } from "@/components/modals/VideoModal";
import { QRContents } from "@/components/qr-contents";
import { SidePanel } from "@/components/sidePanel";
import { ModalTypes } from "@/types/modals";
import { CoreModalsList } from "@repo/core";

export const ModalsList: any = {
  ...CoreModalsList,
  // [ModalTypes.REGISTER]: RegisterModal,
  // [ModalTypes.SIDE_PANEL]: SidePanel,
  [ModalTypes.TRACKING]: TrackingModal,
  [ModalTypes.BUG_REPORT]: BugReportModal,
  [ModalTypes.ADD_ADDRESS]: AddAddressModal,
  // [ModalTypes.ORDER_DETAIL]: OrderDetailModal,
  // [ModalTypes.CLUB_INFO]: ClubInfoModal,
  // [ModalTypes.CLUB_SINGLE_GET_CODE]: ClubSingleGetCodeModal,
  // [ModalTypes.CLUB_SINGLE_SHOW_DESC]: ClubSingleDescModal,
  // [ModalTypes.MY_MESSAGES_DETAIL]: MyMessageDetailModal,
  [ModalTypes.QR_CONTENTS]: QRContents,
  [ModalTypes.VIDEO]: VideoModal,
};
