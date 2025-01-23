import { AddAddressModal } from "@/components/modals/AddAddressModal";
import { BugReportModal } from "@/components/modals/BugReportModal";
import { TrackingModal } from "@/components/modals/TrackingModal";
import { VideoModal } from "@/components/modals/VideoModal";
import { QRContents } from "@/components/qr-contents";
import { ModalTypes } from "@/types/modals";
import { CoreModalsList } from "@repo/core";

export const ModalsList: any = {
  ...CoreModalsList,
  // [ModalTypes.REGISTER]: RegisterModal,
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
