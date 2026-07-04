import PatchNoteList from "@/components/appDownload/patchNoteList";
import HomeHeader from "@/components/headers/homeHeader";
import { homeMetadata } from "@repo/core/metadata/home";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { Metadata } from "next";
import { MobileHomeHeader } from "@repo/shared_modules/headers";
import { Apps } from "@repo/core/types/general";
import Footer from "../../../../packages/shared_modules/common/components/footer";
import { api } from "@repo/shared_modules/api";

export const metadata: Metadata = homeMetadata(
  "/changelog",
  "تغییرات نسخه | دکترآباد",
  "لیست تغییرات و به‌روزرسانی‌های اپلیکیشن دکترآباد",
);

const ChangelogPage = async () => {
    const statistic = (await api.getHomeStatistics()).data.data;
  
  return (
    <>
      <DiviceSwitchShell desktop={null} mobile={<MobileHomeHeader type={Apps.BASE} />} /> 

      <div className="container">
        <PatchNoteList />
      </div>
            <DiviceSwitchShell
        desktop={<Footer statistic={statistic} />}
        mobile={<Footer statistic={statistic} />}
      />
    </>
  );
};

export default ChangelogPage;
