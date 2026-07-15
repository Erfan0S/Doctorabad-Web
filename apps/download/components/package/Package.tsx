import React from "react";
import { PackageTabsData } from "./tabs/tabs-data";
import { PackageItem, PackageTab } from "@/types/packages";
import { Apps } from "@repo/core/types/general";
import { MobileProductLayout } from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import { PackageActiveButton, PackageAppOnlyButton } from "./PackageButton";
import Image from "next/image";
import PackageHeaderSuffix from "../Header/packageHeaderSuffix";
import { downloadPaths } from "@repo/core/constants/routePath";

type Props = {
  packageItem: PackageItem;
  lessonParam?: string | null;
  activeTab?: string;
};

const Package = ({ packageItem, activeTab }: Props) => {
  const tabsData = PackageTabsData({
    packageItem,
  });

  const imageSrc =
    packageItem?.picture ?? packageItem?.provider_picture ?? undefined;

  return (
    <MobileProductLayout
      tabsData={tabsData}
      tabParam={activeTab || PackageTab.SPECIFICATIONS}
      app={Apps.DOWNLOAD}
      providerBaseUrl={downloadPaths.publishers}
      preview={
        imageSrc ? (
          <div className="relative flex w-full items-center justify-center">
            <Image
              src={imageSrc}
              alt={packageItem?.title || ""}
              width={140}
              height={100}
              className="aspect-[3/4] h-auto max-h-[200px] w-auto max-w-full rounded-2xl"
            />
          </div>
        ) : null
      }
      title={packageItem?.title}
      headerSuffix={<PackageHeaderSuffix packageItem={packageItem} />}
      provider={{
        name: packageItem.authors?.[0]?.title || "",
        img_url: packageItem?.provider_picture,
        id: packageItem?.provider_id,
      }}
      productButtonProps={{
        installment_payment: packageItem?.user_has_access
          ? false
          : packageItem?.installment_payment,
        installment_text: packageItem?.installment_text || undefined,
        mainPrice: packageItem?.main_price ?? 0,
        offPrice: packageItem?.off_price,
        productId: packageItem?.id,
        orderType: OrderType.Package,
        app: Apps.DOWNLOAD,
        replaceButton: (packageItem?.user_has_access ||
          packageItem?.main_price == null) && (
          <PackageActiveButton packageItem={packageItem} />
        ),
        children: <PackageAppOnlyButton packageItem={packageItem} />,
      }}
    />
  );
};

export default Package;
