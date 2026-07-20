import Image from "next/image";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import TabsController from "../../../TabsController";
import { Apps } from "@repo/core/types/general";
import { MobileTabsConfig } from "@repo/core/types/configs";
import { ProviderTabs } from "..";

export type ProviderheaderPropsType = {
  title: string;
  image: string;
  summery?: string;
  alt?: string;
  app?: Apps;
  contentTitle?: string;
  descriptionTitle?: string;
  variant?: "primery" | "secondary";
};

const ProviderHeader = ({
  title,
  summery,
  image,
  alt,
  app,
  contentTitle,
  descriptionTitle,
  variant = "primery",
}: ProviderheaderPropsType) => {
  const ProviderTabsData: MobileTabsConfig[] = [
    {
      id: ProviderTabs.CONTENT,
      title: contentTitle || "محصولات",
    },
    {
      id: ProviderTabs.DESCRIPTION,
      title: descriptionTitle || "توضیحات",
    },
  ];

  return (
    <div>
      <div
        className={`relative mb-[10px] flex px-[10px] ${app || ""} ${variant === "secondary" ? "flex-col items-center pt-[27px]" : "flex-row"}`}
      >
        <div
          className={`absolute top-[-1px] start-0 z-[-1] w-screen max-w-[800px] bg-button-bg ${variant === "secondary" ? "h-[67%]" : "h-1/2"}`}
        />
        <Image
          src={image}
          alt={alt || "ارائه دهنده"}
          width={150}
          height={80}
          placeholder={placeHolderDataUrl}
          className={`rounded-[10px] bg-white object-contain ${variant === "secondary" ? "absolute translate-y-[-50%] shadow-[0_0_10px_rgba(111,111,111,0.52)]" : "shadow-[0_0_10px_#f2e3e378]"}`}
          style={{ objectFit: variant == "secondary" ? "cover" : undefined }}
        />
        <div
          className={
            variant == "secondary"
              ? "ms-[10px] flex w-[90%] min-w-0 flex-col items-center justify-center rounded-[10px] bg-white pt-[50px] shadow-[0px_3px_5px_#b5b5b5]"
              : "ms-[10px] flex flex-col justify-center"
          }
        >
          <h3
            className={`text-[15px] ${variant === "secondary" ? "m-0 min-h-[calc(2*1.2em)] min-w-0 max-w-full whitespace-normal break-words leading-[1.2] text-black" : "text-white"}`}
          >
            {title}
          </h3>
          <h3
            className={`text-[15px] ${variant === "secondary" ? "hidden" : "mt-[10px] text-app-base"}`}
          >
            {summery}
          </h3>
        </div>
      </div>
      <TabsController
        tabData={ProviderTabsData}
        defaultTab={ProviderTabs.CONTENT}
        className="mt-[15px] bg-[#e0e0e0] [&_ul_li]:leading-[40px]"
        app={app}
      />
    </div>
  );
};

export default ProviderHeader;
