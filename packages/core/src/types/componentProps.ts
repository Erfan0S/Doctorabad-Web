import { Apps } from "./general";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  app?: Apps;
  variant?: "default" | "outline" | "secondary" | "danger";
  disabled?: boolean;
}
