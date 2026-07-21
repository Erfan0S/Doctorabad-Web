"use client";
import { useReducer } from "react";
import TriangleDown from "@/assets/svg/triangleDown";

interface Props {
  title: string;
  isActive?: boolean;
  contentSpacing?: boolean;
  children?: React.ReactNode;
}

// was Accordion.module.scss (dead `&--spacing` dropped - contentSpacing prop
// was never wired to a class)
const TITLE =
  "cursor-pointer flex items-center border-0 border-b border-solid border-gray [&_span]:leading-10 [&_span]:font-medium [&_span]:text-gray [&_svg]:ms-auto [&_svg]:fill-orange";

const Accordion: React.FC<Props> = ({ title, isActive = true, children }) => {
  const [active, toggleActive] = useReducer((show) => !show, isActive);

  return (
    <div className="mb-2 last-of-type:mb-0">
      <div
        className={`${TITLE} ${active ? "[&_svg]:[transform:rotateX(180deg)]" : ""}`}
        onClick={toggleActive}
      >
        <span>{title}</span>
        <TriangleDown width={18} height={18} />
      </div>
      <div className={active ? "block" : "hidden"}>{children}</div>
    </div>
  );
};

export default Accordion;
