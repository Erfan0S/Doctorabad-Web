import TabsController from "@/components/common/TabsController";
import { ProviderTabs, TabData } from "@/types/packages";
import React from "react";
import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

const ProviderTabsData: TabData[] = [
  {
    id: ProviderTabs.PACKAGES,
    title: "محتواها",
  },
  {
    id: ProviderTabs.DESCRIPTION,
    title: "توضیحات",
  },
];

type Props = {
  id: number;
  title: string;
  summary: string;
  image: string;
  alt?: string;
};

const ProviderHeader = ({ id, title, summary, image, alt }: Props) => {
  return (
    <div>
      <div className="relative mb-[10px] flex px-[10px]">
        <div className="absolute -top-px right-0 z-[-1] h-1/2 w-screen max-w-[800px] bg-blue" />
        <Image
          src={image}
          alt={alt || "ناشر"}
          width={150}
          height={80}
          placeholder={placeHolderDataUrl}
          className="rounded-[10px] bg-white object-contain shadow-[0_0_10px_#00000078]"
        />
        <div className="mr-[10px] flex min-w-0 flex-col justify-center">
          <h3 className="m-0 min-h-[calc(2*0.85em)] min-w-0 max-w-full break-words text-[15px] leading-[1.2] text-white">{title}</h3>
          <h3 className="m-0 mt-[10px] min-h-[calc(2*0.85em)] min-w-0 max-w-full break-words text-[15px] leading-[1.2] text-blue">{summary}</h3>
        </div>
      </div>
      <TabsController
        tabData={ProviderTabsData}
        defaultTab={ProviderTabs.PACKAGES}
        className="mt-[15px] bg-[#e0e0e0] [&_ul_li]:leading-10"
      />
    </div>
  );
};

export default ProviderHeader;
