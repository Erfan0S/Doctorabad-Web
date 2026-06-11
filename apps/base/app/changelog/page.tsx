import PatchNoteList from "@/components/appDownload/patchNoteList";
import HomeHeader from "@/components/headers/homeHeader";
import { homeMetadata } from "@repo/core/metadata/home";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import { Metadata } from "next";

export const metadata: Metadata = homeMetadata(
  "/changelog",
  "تغییرات نسخه | دکترآباد",
  "لیست تغییرات و به‌روزرسانی‌های اپلیکیشن دکترآباد",
);

const ChangelogPage = () => {
  return (
    <>
      <DiviceSwitchShell desktop={null} mobile={<HomeHeader />} />

      <div className="container">
        <PatchNoteList />
      </div>
    </>
  );
};

export default ChangelogPage;
