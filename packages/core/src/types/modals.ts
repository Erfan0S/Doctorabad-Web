import { ModalTypes } from "@repo/shared_modules/modalsTypes";

export interface Modal {
  type: ModalTypes;
  data: any;
}

export type ModalState = Modal[];

export interface ModalProps<D = any> {
  closeModal: (clearModals?: boolean) => void;
  data: D;
}

// this type throws error if ModalList is empty

// @ts-ignore
// export type ModalData<T extends ModalTypes> = Parameters<
//   (typeof ModalsList)[T]
// >["0"]["data"];

export type ModalData<T extends ModalTypes> = any;

// export type ModalListType = {
//   [key in ModalTypes]: React.FC<ModalProps>;
// };

export type ModalListType = {
  [key in ModalTypes]: any;
};
