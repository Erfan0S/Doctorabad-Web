import { ReactNode } from "react";

export type TabDataType = Record<
  string,
  {
    title: string;
    content: ReactNode;
    disabled?: boolean;
  }
>;
