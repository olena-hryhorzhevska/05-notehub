export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
export const noteTags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}
