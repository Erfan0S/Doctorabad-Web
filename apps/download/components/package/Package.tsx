import React from "react";
import { PackageTabsData } from "./tabs/tabs-data";
import { PackageItem, PackageTab } from "@/types/packages";
import { Apps } from "@repo/core/types/general";
import { MobileProductLayout } from "@repo/shared_modules/components";
import { OrderType } from "@repo/core/types/cart";
import { PackageActiveButton, PackageAppOnlyButton } from "./PackageButton";
import Image from "next/image";
import PackageHeaderSuffix from "../Header/packageHeaderSuffix";

type Props = {
  packageItem: PackageItem;
  lessonParam?: string | null;
  activeTab?: string;
};

const Package = ({ packageItem, activeTab }: Props) => {
  const tabsData = PackageTabsData({
    packageItem,
  });

  return (
    <MobileProductLayout
      tabsData={tabsData}
      tabParam={activeTab || PackageTab.SPECIFICATIONS}
      app={Apps.DOWNLOAD}
      preview={
        <div
          style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}
        >
          <Image
            src={packageItem.picture}
            alt={packageItem.title}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      }
      title={packageItem.title}
      headerSuffix={<PackageHeaderSuffix packageItem={packageItem} />}
      provider={{
        name: packageItem.authors?.[0]?.title || "",
        img_url: packageItem.provider_picture,
        id: packageItem.provider_id,
      }}
      productButtonProps={{
        installment_payment: packageItem.user_has_access
          ? false
          : packageItem.installment_payment,
        installment_text: packageItem.installment_text || undefined,
        mainPrice: packageItem.main_price ?? 0,
        offPrice: packageItem.off_price,
        productId: packageItem.id,
        orderType: OrderType.Package,
        app: Apps.DOWNLOAD,
        replaceButton: (packageItem.user_has_access ||
          packageItem.main_price == null) && (
          <PackageActiveButton packageItem={packageItem} />
        ),
        children: <PackageAppOnlyButton packageItem={packageItem} />,
      }}
    />
  );
};

export default Package;
