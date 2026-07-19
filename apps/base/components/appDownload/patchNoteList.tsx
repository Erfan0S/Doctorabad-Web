import PatchNote from "./patchNote";
import { patchNotes } from "@/constants/PatchNotes";

const PatchNoteList = () => {
  return (
    <section className="mx-auto w-full px-2 pb-10 pt-6 max-[550px]:px-1 max-[550px]:pb-8 max-[550px]:pt-4">
      <div className="mb-5 text-center">
        <h1 className="mb-2 mt-0 text-[28px] font-black max-[550px]:text-[22px]">تغییرات نسخه</h1>
        <p className="m-0 text-base font-semibold text-[#666] max-[550px]:text-sm">جدیدترین به‌روزرسانی‌های اپلیکیشن دکترآباد</p>
      </div>
      <div className="flex flex-col gap-4">
        {patchNotes.map((patchNote) => (
          <PatchNote {...patchNote} key={patchNote.versionNO} />
        ))}
      </div>
    </section>
  );
};

export default PatchNoteList;
