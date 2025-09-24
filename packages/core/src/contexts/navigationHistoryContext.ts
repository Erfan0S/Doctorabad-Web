import { createContext } from "react";

type NavigationHistoryContextType = {
  goBack: (searchParams?: string) => void;
  history: string[];
};

export const NavigationHistoryContext = createContext<
  NavigationHistoryContextType | undefined
>(undefined);
