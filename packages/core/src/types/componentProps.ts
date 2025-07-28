import { Apps } from "./general";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  app?: Apps;
  styleType?: "default" | "outline";
  disabled?: boolean;
}
