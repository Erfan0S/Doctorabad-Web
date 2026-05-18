import styles from "./ProviderHeader.module.scss";
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
        className={`${styles.ProviderHeader} ${styles[app || ""]} ${styles[variant]}`}
      >
        <div className={styles.redBackground} />
        <Image
          src={image}
          alt={alt || "ارائه دهنده"}
          width={150}
          height={80}
          placeholder={placeHolderDataUrl}
          style={{ objectFit: variant == "secondary" ? "fill" : undefined }}
        />
        <div className={styles.providerInfo}>
          <h3>{title}</h3>
          <h3>{summery}</h3>
        </div>
      </div>
      <TabsController
        tabData={ProviderTabsData}
        defaultTab={ProviderTabs.CONTENT}
        className={styles.tabsContainer}
        app={app}
      />
    </div>
  );
};

export default ProviderHeader;
