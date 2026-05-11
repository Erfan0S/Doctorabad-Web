import React from "react";
import { PackageContentProps } from "../tabs-data";
import sanitize from "@repo/core/utils/sanitize";

const PackageDescription = ({ packageItem }: PackageContentProps) => {
  return (
    <div style={{ width: "100%" }}>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(packageItem.description),
        }}
      />
    </div>
  );
};

export default PackageDescription;
