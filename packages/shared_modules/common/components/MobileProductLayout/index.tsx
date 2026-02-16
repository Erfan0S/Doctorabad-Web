import Image from "next/image";
import style from "./ProductLayout.module.scss";
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

type Props = {
  tabsData: MobileTabsConfigWithContent[];
  app: Apps;
  title: string;
  preview: string | React.ReactNode;
  productButtonProps?: ProductButtonProps;
  provider?: {
    img_url: string;
    name: string;
    id: number;
  };
  headerSuffix?: React.ReactNode;
  tabParam?: string;
};

const MobileProductLayout = ({
  headerSuffix,
  tabsData,
  app = Apps.BASE,
  provider,
  title,
  preview,
  productButtonProps,
  tabParam,
}: Props) => {
  console.log(tabParam);

  return (
    <div className={style.wrapper}>
      {/* ?: uncomment in product */}
      {/* <PreventContext /> */}
      <PageHeader title="" app={app} suffix={headerSuffix} haveMargin={false} />
      <div>
        <div className={style.container}>
          <div className={style.producteHeader}>
            <div className={style.producteHeaderTop}>
              {/* image or video */}
              {typeof preview === "string" ? (
                <div className={style.ProductpreviewImage}>
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
              <div className={style["producte-title"]}>
                <Link href={`/providers/${provider?.id}`}>
                  {/* provider image */}
                  <Image
                    src={provider?.img_url || ""}
                    alt={provider?.name || "ارائه دهنده"}
                    width={100}
                    height={44}
                    placeholder={placeHolderDataUrl}
                  />
                </Link>
                <h1>{title}</h1>
              </div>
            </div>
            <TabsController
              tabData={tabsData}
              type={app}
              defaultTab={tabsData[0].id}
            />
          </div>
          <div className={style.tabsContent}>
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
          {!!productButtonProps && <ProductButton {...productButtonProps} />}
        </div>
      </div>
    </div>
  );
};

export default MobileProductLayout;
