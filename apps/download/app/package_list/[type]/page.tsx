import { PageHeader } from "@repo/shared_modules/headers";
import { PackageListConfigs } from "@/constants/PackageList";
import { HomePagePackageSliders } from "@/types/homePage";
import React from "react";
import { Apps } from "@repo/core/types/general";
import PackageListPage from "@/pagesComponents/PackageList";
import CourseListPage from "@/pagesComponents/PackageList";

type Props = {
  params: {
    type: HomePagePackageSliders;
  };
};

const PackageList = ({ params }: Props) => {
  return (
    <div>
      <PageHeader
        app={Apps.DOWNLOAD}
        title={PackageListConfigs[params.type].title}
      />
      <PackageListPage type={params.type} />
    </div>
  );
};

export default PackageList;
