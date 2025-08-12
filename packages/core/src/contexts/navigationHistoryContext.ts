import { createContext } from "react";

type NavigationHistoryContextType = {
  goBack: () => void;
  history: string[];
};

export const NavigationHistoryContext = createContext<
  NavigationHistoryContextType | undefined
>(undefined);
