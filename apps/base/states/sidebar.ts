import { create } from 'zustand';

type Sidebar = {
    show: boolean;
    toggleShow: () => void;
};

export const useSidebar = create<Sidebar>((set) => ({
    show: false,
    toggleShow: () => set((state) => ({ show: !state.show })),
}));
