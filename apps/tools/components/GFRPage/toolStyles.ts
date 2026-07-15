// Tailwind class map replacing GFRPage.module.scss
import { toolClasses } from "../toolClasses";

const styles: Record<string, string> = {
  ...toolClasses,
  sectionContent: "tool-section-content px-8",
  listItems: "flex flex-col gap-3.5 [justify-content:right]",
  item: "tool-option font-bold",
  inputGroup: "tool-input-group w-[70%]",
};

export default styles;
