export interface notesType {
  text: string;
  type: 'add' | 'upgrade' | 'edit';
}

export interface PatchNotesType {
  versionNO: string;
  patchNotes: notesType[];
}
