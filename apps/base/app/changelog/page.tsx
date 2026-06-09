import PatchNoteList from "@/components/appDownload/patchNoteList";
import { homeMetadata } from "@repo/core/metadata/home";
import { Metadata } from "next";

export const metadata: Metadata = homeMetadata(
  "/changelog",
  "تغییرات نسخه | دکترآباد",
  "لیست تغییرات و به‌روزرسانی‌های اپلیکیشن دکترآباد"
);

const ChangelogPage = () => {
  return (
    <div className="container">
      <PatchNoteList />
    </div>
  );
};

export default ChangelogPage;
