import { PatchNotesType } from '@/types/patchNote';
import React from 'react';
import style from './AppDownload.module.scss';

const PatchNote = ({ versionNO, patchNotes }: PatchNotesType) => {
  const patchNoteTypeHandler = (type: string) => {
    switch (type) {
      case 'add':
        return <span className={style.patchNoteAdd}>افزودن</span>;

      case 'upgrade':
        return <span className={style.patchNoteUpgrade}>ارتقا</span>;

      case 'edit':
        return <span className={style.patchNoteEdit}>اصلاح</span>;

      default:
        return;
    }
  };

  return (
      <div className={style.patchNoteWrapper}>
        <div className={style.patchNoteHeader}>
          <h3>نسخه {versionNO}</h3>
          <hr />
        </div>
        <ul className={style.patchNotes}>
          {patchNotes.map((patchNote, index) => (
              <li key={index}>
                {patchNoteTypeHandler(patchNote.type)}
                <span>{' ' + patchNote.text}</span>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default PatchNote;
