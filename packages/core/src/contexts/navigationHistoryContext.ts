import { createContext } from "react";

type NavigationHistoryContextType = {
  goBack: (searchParams?: string, ignorePrevSearchParams?: boolean) => void;
  history: string[];
};

export const NavigationHistoryContext = createContext<
  NavigationHistoryContextType | undefined
>(undefined);
