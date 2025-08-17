import axios from "axios";
import { Note, NoteFormValues } from "../types/note";
const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (name: string, page: number, perPage: number): Promise<FetchNotesResponse> => {
  const url = `https://notehub-public.goit.study/api/notes?search=${name}&page=${page}&perPage=${perPage}`;
  const param = {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  }
  const response = await axios.get<FetchNotesResponse>(url, param);
  return response.data;
}


export const createNote = async (note: NoteFormValues): Promise<Note> => {
  const url = `https://notehub-public.goit.study/api/notes`;
  const { data } = await axios.post<Note>(url, note, {
    headers: {
      Authorization: `Bearer ${myToken}`,
      "Content-Type": "application/json",
    },
  })
  return data;
}


export const deleteNote = async (id: string): Promise<Note> => {
  const url = `https://notehub-public.goit.study/api/notes/${id}`;
  const { data} = await axios.delete<Note>(url, {
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  })  
  return data;
}