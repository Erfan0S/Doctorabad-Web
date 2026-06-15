import { PageHeader } from "@repo/shared_modules/headers";
import React from "react";
import { Apps } from "@repo/core/types/general";
import MyPackages from "@/components/myPackages";

const MyPackagePage = () => {
  return (
    <div>
      <PageHeader app={Apps.DOWNLOAD} title="محتواهای من" />
      <MyPackages />
    </div>
  );
};

export default MyPackagePage;
