"use client";

import { useState } from "react";
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
import { MobileHomeHeaderDataConfigWithContent } from "@repo/core/types/configs";
import ProductButton, { ProductButtonProps } from "./ProductButton";

type Props = {
  tabsData: MobileHomeHeaderDataConfigWithContent[];
  app: Apps;
  title: string;
  preview: string | React.ReactNode;
  productButtonProps?: ProductButtonProps;
  provider?: {
    img_url: string;
    name: string;
    id: number;
  };
  headerSiffix?: React.ReactNode;
};

const MobileProductLayout = ({
  headerSiffix,
  tabsData,
  app = Apps.BASE,
  provider,
  title,
  preview,
  productButtonProps,
}: Props) => {
  const [activeTab, setActiveTab] = useState<any>("");

  return (
    <div className={style.wrapper} onContextMenu={(e) => e.preventDefault()}>
      <PreventContext />
      <PageHeader title="" app={app} suffix={headerSiffix} haveMargin={false} />
      <div>
        <div className={style.container}>
          <div className={style.courseHeader}>
            <div className={style.courseHeaderTop}>
              {/* image or video */}
              {typeof preview === "string" ? (
                <Image
                  src={preview}
                  alt={title}
                  width={100}
                  height={44}
                  placeholder={placeHolderDataUrl}
                />
              ) : (
                preview
              )}
              <div className={style["course-title"]}>
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
            <TabsController tabData={tabsData} type={app} />
          </div>
          <div className={style.tabsContent}>
            {tabsData.map((tab) => {
              return tab.id === activeTab ? tab.content : null;
            })}
          </div>
          {!!productButtonProps && <ProductButton {...productButtonProps} />}
        </div>
      </div>
    </div>
  );
};

export default MobileProductLayout;
