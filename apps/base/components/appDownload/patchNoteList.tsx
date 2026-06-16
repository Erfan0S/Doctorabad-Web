import PatchNote from "./patchNote";
import { patchNotes } from "@/constants/PatchNotes";
import style from "./AppDownload.module.scss";

const PatchNoteList = () => {
  return (
    <section className={style.changelogPage}>
      <div className={style.changelogHeader}>
        <h1>تغییرات نسخه</h1>
        <p>جدیدترین به‌روزرسانی‌های اپلیکیشن دکترآباد</p>
      </div>
      <div className={style.patchNoteList}>
        {patchNotes.map((patchNote) => (
          <PatchNote {...patchNote} key={patchNote.versionNO} />
        ))}
      </div>
    </section>
  );
};

export default PatchNoteList;
