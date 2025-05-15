import React from "react";
import PatchNote from "./patchNote";
import { patchNotes } from "@/constants/PatchNotes";

const PatchNoteList = () => {
  return (
    <div>
      {patchNotes.map((patchNote, index) => (
        <PatchNote {...patchNote} key={index} />
      ))}
    </div>
  );
};

export default PatchNoteList;
