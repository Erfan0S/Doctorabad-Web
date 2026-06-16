import HomeHeader from "@/components/headers/homeHeader";
import WebAppGuide from "@/components/webApp/WebAppGuide";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import React from "react";
import { MobileHomeHeader } from "@repo/shared_modules/headers";
import { Apps } from "@repo/core/types/general";
import Footer from "../../../../packages/shared_modules/common/components/footer";
import { api } from "@repo/shared_modules/api";

const IosPwaGuidePage = async () => {
  const statistic = (await api.getHomeStatistics()).data.data;

  return (
    <>
      <DiviceSwitchShell
        desktop={null}
        mobile={<MobileHomeHeader type={Apps.BASE} />}
      />

      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <WebAppGuide />
      </div>
      <DiviceSwitchShell
        desktop={<Footer statistic={statistic} />}
        mobile={null}
      />
    </>
  );
};

export default IosPwaGuidePage;
