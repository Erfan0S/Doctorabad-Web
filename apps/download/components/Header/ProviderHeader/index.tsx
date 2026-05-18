import TabsController from "@/components/common/TabsController";
import { ProviderTabs, TabData } from "@/types/packages";
import React from "react";
import styles from "./ProviderHeader.module.scss";
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
      <div className={styles.ProviderHeader}>
        <div className={styles.blueBackground} />
        <Image
          src={image}
          alt={alt || "ناشر"}
          width={150}
          height={80}
          placeholder={placeHolderDataUrl}
        />
        <div className={styles.providerInfo}>
          <h3>{title}</h3>
          <h3>{summary}</h3>
        </div>
      </div>
      <TabsController
        tabData={ProviderTabsData}
        defaultTab={ProviderTabs.PACKAGES}
        className={styles.tabsContainer}
      />
    </div>
  );
};

export default ProviderHeader;
