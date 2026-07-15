// Tailwind class map replacing FENaPage.module.scss
import { toolClasses } from "../toolClasses";

const styles: Record<string, string> = {
  ...toolClasses,
  sectionContent: "tool-section-content px-8 font-medium",
  listItems: "flex flex-col gap-2 [justify-content:right]",
  item: "tool-option font-bold",
  inputGroup: "tool-input-group w-[60%]",
  inputLabel: "tool-input-label px-[10px]",
};

export default styles;
