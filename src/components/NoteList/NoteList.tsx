import css from "./NoteList.module.css";
import { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
  deletingId: string;
}
export default function NoteList({ notes, onDelete, isDeleting, deletingId }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const disabled = isDeleting && deletingId === note.id;
        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                className={css.button}
                onClick={() => onDelete(note.id!)}
                disabled={disabled}
                aria-busy={disabled}
              >
                {disabled ? "Deleting…" : "Delete"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
