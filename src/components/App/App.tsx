import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { useState } from "react";
import {
  useMutation,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { createNote, deleteNote } from "../../services/noteService";
import { Note, NoteFormValues } from "../../types/note";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

export default function App() {
  const [search, setSearh] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);
  const perPage = 12;

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", debouncedSearch, page, perPage],
    queryFn: () => fetchNotes(debouncedSearch, page, perPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const queryClient = useQueryClient();

  const createNoteMutation = useMutation<Note, unknown, NoteFormValues>({
    mutationFn: (newNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      closeModal();
      setPage(1);
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`${msg}`);
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(`${msg}`);
    }
  });

  const handleDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={setSearh} handlePage={setPage} />
        {data && totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      <Toaster position="top-center" reverseOrder={true} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            onCancel={closeModal}
            onSubmit={(values) => createNoteMutation.mutateAsync(values)}
          />
        </Modal>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {isSuccess && data.notes.length > 0 && (
        <NoteList
          notes={data?.notes}
          onDelete={handleDelete}
          deletingId={deleteNoteMutation.variables as string}
          isDeleting={deleteNoteMutation.isPending}
        />
      )}
    </div>
  );
}
