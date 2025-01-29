import { create } from 'zustand';

export const authorizedActionStorage = create<null | (() => void)>(() => null);
