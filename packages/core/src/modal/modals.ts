import { ModalData, ModalState, ModalTypes } from "../types/modals";
import { create } from "zustand";

const initialState = { modals: [] };

export const useModals = create<{ modals: ModalState }>(() => initialState);

export const modalActions = {
  addModal<T extends ModalTypes, D extends ModalData<T>>(type: T, data?: D) {
    useModals.setState((prev) => ({
      modals: [...prev.modals, { type, data }],
    }));
    window.history.pushState(null, "", "#");
  },
  removeLastModal() {
    useModals.setState((prev) => ({
      modals: prev.modals.filter(
        (_, index) => index + 1 !== prev.modals.length
      ),
    }));
  },
  clearModals() {
    useModals.setState(initialState, true);
  },
};
