import Image from "next/image";
import { PageHeader } from "@repo/shared_modules/headers";
import Link from "next/link";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";
import { Apps } from "@repo/core/types/general";
import {
  PreventContext,
  TabsController,
} from "@repo/shared_modules/components";
import { MobileTabsConfigWithContent } from "@repo/core/types/configs";
import ProductButton, { ProductButtonProps } from "./ProductButton";
import { baseUrls } from "@repo/core/constants/routePath";

type Props = {
  tabsData: MobileTabsConfigWithContent[];
  app: Apps;
  title: string;
  preview: string | React.ReactNode;
  productButtonProps?: ProductButtonProps;
  provider?: {
    img_url: string;
    name?: string;
    id?: number;
  };
  headerSuffix?: React.ReactNode;
  headerTitle?: string;
  tabParam?: string;
  providerBaseUrl?: string;
};

const MobileProductLayout = ({
  headerSuffix,
  headerTitle,
  tabsData,
  app = Apps.BASE,
  provider,
  title,
  preview,
  productButtonProps,
  tabParam,
  providerBaseUrl = "/providers",
}: Props) => {
  return (
    <div className={`z-[3] ${app}`}>
      {/* ?: uncomment in product */}
      {/* <PreventContext /> */}
      <PageHeader
        title={headerTitle}
        app={app}
        suffix={headerSuffix}
        haveMargin={false}
      />
      <div>
        <div className="w-full [direction:rtl]">
          <div className="relative z-[100] bg-smoke pt-[10px]">
            <div className="flex w-full max-w-[100vw] flex-col items-center px-[15px]">
              {/* image or video */}
              {typeof preview === "string" ? (
                <div className="flex w-full justify-center [&>img]:h-full [&>img]:w-auto [&>img]:max-h-[min(250px,25vh)] [&>img]:rounded-[20px]">
                  <Image
                    src={preview}
                    alt={title}
                    width={0}
                    height={0}
                    sizes="100vh"
                    placeholder={placeHolderDataUrl}
                  />
                </div>
              ) : (
                preview
              )}
              <div className="my-[15px] flex w-full items-center justify-center">
                {!!provider?.id ? (
                  <Link
                    href={
                      // ?: fix for market
                      `${providerBaseUrl}/${provider.id}`
                    }
                  >
                    {/* provider image */}
                    <Image
                      src={provider?.img_url || ""}
                      alt={provider?.name || "ارائه دهنده"}
                      width={100}
                      height={44}
                      placeholder={placeHolderDataUrl}
                      className="h-[44px] w-[100px] rounded-lg border border-solid border-app-base bg-white object-cover"
                      style={{ objectFit: "contain" }}
                    />
                  </Link>
                ) : (
                  <Image
                    src={provider?.img_url || ""}
                    alt={provider?.name || "ارائه دهنده"}
                    width={100}
                    height={44}
                    placeholder={placeHolderDataUrl}
                    className="h-[44px] w-[100px] rounded-lg border border-solid border-app-base bg-white object-cover"
                  />
                )}
                <h1 className="m-0 !ms-[5px] flex h-auto min-h-[stretch] flex-1 items-center justify-center rounded-lg border border-solid border-app-base bg-white px-[10px] py-[2px] text-center text-[16px] font-bold leading-[17px] text-black shadow-sm">
                  {title}
                </h1>
              </div>
            </div>
          </div>
          <div className="sticky top-[55px] z-20 bg-smoke shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
            <TabsController
              tabData={tabsData}
              app={app}
              defaultTab={tabsData[0].id}
              className="[&_ul>li]:leading-[40px]"
            />
          </div>
          <div className="relative z-[2] mt-[15px] px-[15px]">
            {tabsData.map((tab, i) => {
              return tabParam
                ? tab.id == tabParam
                  ? tab.content
                  : null
                : i == 0
                  ? tab.content
                  : null;
            })}
          </div>
          {!!productButtonProps && (
            <ProductButton app={app} {...productButtonProps} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileProductLayout;
