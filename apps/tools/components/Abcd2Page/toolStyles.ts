// Tailwind class map replacing Abcd2Page.module.scss
import { toolClasses } from "../toolClasses";

const styles: Record<string, string> = {
  ...toolClasses,
  listItems: "flex flex-col gap-3.5",
  table: "tool-table tool-table-compact",
};

export default styles;
