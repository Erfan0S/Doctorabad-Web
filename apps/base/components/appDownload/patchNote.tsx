import { PatchNotesType } from '@/types/patchNote';
import React from 'react';

const PatchNote = ({ versionNO, patchNotes }: PatchNotesType) => {
  const patchNoteTypeHandler = (type: string) => {
    switch (type) {
      case 'add':
        return <span className="text-green-base">افزودن</span>;

      case 'upgrade':
        return <span className="text-[#0000ff]">ارتقا</span>;

      case 'edit':
        return <span className="text-red">اصلاح</span>;

      default:
        return;
    }
  };

  return (
      <div className="rounded-2xl bg-[#f2f2f2] px-4 py-3 max-[550px]:px-3 max-[550px]:py-2">
        <div className="flex flex-row items-center">
          <h3 className="m-0 ml-[10px] text-[length:large] font-extrabold">نسخه {versionNO}</h3>
          <hr className="m-0 h-[3px] flex-1 rounded-[50px] border-0 bg-green-base" />
        </div>
        <ul className="py-[10px] pr-[50px] max-[550px]:pr-[30px] [&_span]:text-[15px] [&_span]:font-bold [&_span]:leading-[35px]">
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
