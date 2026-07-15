// Tailwind class map replacing PregnancyPage.module.scss
// The Pregnancy calculator diverges the most from the shared pattern, so it
// carries the largest set of overrides (mode selector, date pickers, etc.).
import { toolClasses } from "../toolClasses";

const styles: Record<string, string> = {
  ...toolClasses,
  listItems: "flex flex-col gap-3.5",
  todayDate: "mt-2 text-center text-base font-bold [direction:rtl]",
  modeSelector:
    "relative mt-4 flex flex-col gap-3 rounded-xl border border-solid border-[#eee] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
  modeHeader:
    "absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[20px] bg-green-base px-4 py-1 text-[0.9rem] font-semibold text-white",
  modeOption:
    "flex cursor-pointer items-center justify-between px-2 [&_span]:font-semibold [&_span]:text-[0.95rem] [&_span]:text-[#333]",
  radio: "tool-preg-radio",
  checked: "tool-preg-radio-checked",
  inputLabel: "mb-2 mt-4 text-right text-[0.9rem] font-bold text-black",
  pickerRow: "mb-4 flex justify-between gap-2 [direction:rtl]",
  pickerGroup: "relative flex flex-1 flex-col",
  selectInput: "tool-preg-select",
  pickerLabel: "hidden",
  selectIcon:
    "pointer-events-none absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center [&_svg]:h-6 [&_svg]:w-6 [&_svg]:fill-green-base [&_svg_path]:fill-green-base",
  datesContainer: "p-6",
  toast: "tool-toast rounded-[20px] leading-[1.6] whitespace-pre-wrap",
  interpretation: "tool-interpretation tool-preg-interpretation pb-[80px]",
};

export default styles;
