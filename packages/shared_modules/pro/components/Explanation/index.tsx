import { ExplanationItem } from "@repo/core/types/dr-pro";
import Image from "next/image";

const explanationContainerCls =
  "mt-5 flex w-full flex-col items-start rounded-[25px] border border-solid border-black px-[15px] py-[10px]";
const itemContainerCls = "z-[5] flex flex-row items-center gap-[10px]";
const rightSideCls = "z-[5] mx-[10px] flex flex-col gap-[10px]";
const titleCls = "pt-1 text-[10px] font-bold text-gray";
const descriptionCls = "flex items-start text-[16px] font-bold text-end";
const picCls = "rounded-[10px] object-cover";

const Explanation = ({ data }: { data?: ExplanationItem[] }) => {
  return (
    <div className={explanationContainerCls}>
      {data?.map((item, index) => (
        <div className={itemContainerCls}>
          <div className={rightSideCls}>
            <div className={picCls}>
              <Image
                src={item.picture}
                sizes="100vw"
                alt={item.title}
                className={picCls}
                width={50}
                height={50}
              />
            <p className={titleCls} key={index}>
              {item.title}
            </p>
            </div>
          </div>
          <h3 className={descriptionCls}>{item.description}</h3>
        </div>
      ))}
    </div>
  );
};

export default Explanation;
