"use client";
import { useEffect } from "react";
import { ProductTabData } from "@repo/core/types/product";
import { elementStickyEventListener } from "@/utils/elementStickyEventListener";
import Item from "./Item";
interface Props {
  tabData: ProductTabData[];
}
const ProductTabsController: React.FC<Props> = ({ tabData }) => {
  useEffect(() => {
    return elementStickyEventListener({
      // plain anchor class replaces the old hashed css-module selector
      selector: ".product-tabs-controller",
      top: 138,
      callback: (isSticky, el) => {
        // ponytail: old style.sticky had no rules in the scss module;
        // keeping the class toggle behavior with a literal name
        el.classList[isSticky ? "add" : "remove"]("is-stuck");
      },
    });
  }, []);

  return (
    <div className="product-tabs-controller sticky top-[122px] z-[200] w-full select-none rounded-b-xl bg-white transition duration-200 max-md:top-[154px] max-md:mb-2 max-md:rounded-xl max-md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)]">
      <ul className="m-0 flex list-none items-center justify-center px-0 py-2.5">
        {tabData.map((data) => (
          <Item key={data.id} tabData={data} />
        ))}
      </ul>
    </div>
  );
};

export default ProductTabsController;
