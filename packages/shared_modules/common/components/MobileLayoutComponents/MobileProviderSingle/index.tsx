"use client";
import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";
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
  defaultBackUrl?: string;
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
        <div className="w-full p-[15px] [&>div]:text-[16px]">
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
  defaultBackUrl,
  ...rest
}: Props) => {
  const searchParams = useSearchParams();

  return isLoading ? (
    <Loading pageLoader app={app} />
  ) : (
    <div>
      <PageHeader
        className="[&>div:last-child]:p-0"
        title={headertitle}
        app={app}
        children={<ProviderHeader app={app} {...rest} />}
        defaultBackUrl={defaultBackUrl}
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
