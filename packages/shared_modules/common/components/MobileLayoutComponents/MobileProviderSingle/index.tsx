"use client";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";
import styles from "./ProviderHeader/ProviderHeader.module.scss";
import { Loading } from "@repo/shared_modules/components";
import sanitize from "@repo/core/utils/sanitize";
import ProviderHeader, { ProviderheaderPropsType } from "./ProviderHeader";
import { useSearchParams } from "next/navigation";

export enum ProviderTabs {
  CONTENT = "content",
  DESCRIPTION = "description",
}

interface Props extends ProviderheaderPropsType {
  id: number;
  ProviderContent: React.ReactNode;
  ProviderInfo: string;
  headertitle?: string;
  isLoading?: boolean;
}

const ProviderPageContent = ({
  tab,
  content,
  description,
}: {
  tab: string;
  content: React.ReactNode;
  description: string;
}) => {
  switch (tab) {
    case ProviderTabs.CONTENT:
      return <div className="container">{content}</div>;
    case ProviderTabs.DESCRIPTION:
      return (
        <div className={styles.pageDescription}>
          <div dangerouslySetInnerHTML={{ __html: sanitize(description) }} />
        </div>
      );
    default:
      return null;
  }
};

const MobileProviderPageLayout = ({
  id,
  ProviderContent,
  ProviderInfo,
  isLoading,
  headertitle,
  app,
  ...rest
}: Props) => {
  const searchParams = useSearchParams();

  return isLoading ? (
    <Loading pageLoader app={app} />
  ) : (
    <div>
      <PageHeader
        className={styles.providerHeaderWrapper}
        title={headertitle}
        app={app}
        children={<ProviderHeader app={app} {...rest} />}
      />
      <ProviderPageContent
        tab={searchParams?.get("tab") || ProviderTabs.CONTENT}
        content={ProviderContent}
        description={ProviderInfo || ""}
      />
    </div>
  );
};
export default MobileProviderPageLayout;
