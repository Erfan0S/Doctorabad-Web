export enum ModalTypes {
  REGISTER = "REGISTER",
  SIDE_PANEL = "SidePanel",
  TRACKING = "TRACKING",
  BUG_REPORT = "BUG_REPORT",
  ADD_ADDRESS = "ADD_ADDRESS",
  ORDER_DETAIL = "ORDER_DETAIL",
  CLUB_INFO = "CLUB_INFO",
  CLUB_SINGLE_GET_CODE = "CLUB_SINGLE_GET_CODE",
  CLUB_SINGLE_SHOW_DESC = "CLUB_SINGLE_SHOW_DESC",
  MY_MESSAGES_DETAIL = "MY_MESSAGES_DETAIL",
  QR_CONTENTS = "QR_CONTENTS",
  VIDEO = "video",
}

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

export type ModalList = {
  [key in ModalTypes]: React.FC<ModalProps>;
};
