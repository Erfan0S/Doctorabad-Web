import { TrackingModal } from "@/components/modals/TrackingModal";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { ModalsList as SharedModulesModalList } from "@repo/shared_modules/modalsList";
import ProductVariantModal from "@/components/modals/ProductVariantModal";

export const ModalsList: any = {
  ...SharedModulesModalList,
  [ModalTypes.TRACKING]: TrackingModal,
  [ModalTypes.PRODUCT_VARIANT_MODAL]: ProductVariantModal,
};
