// Tailwind class map replacing ApgarPage.module.scss
import { toolClasses } from "../toolClasses";

const styles: Record<string, string> = {
  ...toolClasses,
  listItems: "flex flex-col gap-3.5",
};

export default styles;
