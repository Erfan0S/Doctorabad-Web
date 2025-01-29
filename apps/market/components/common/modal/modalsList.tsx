import { BugReportModal } from "@/components/modals/BugReportModal";
import { TrackingModal } from "@/components/modals/TrackingModal";
import { VideoModal } from "@/components/modals/VideoModal";
import { QRContents } from "@/components/qr-contents";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";

export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.TRACKING]: TrackingModal,
  [ModalTypes.BUG_REPORT]: BugReportModal,
  [ModalTypes.QR_CONTENTS]: QRContents,
  [ModalTypes.VIDEO]: VideoModal,
};
