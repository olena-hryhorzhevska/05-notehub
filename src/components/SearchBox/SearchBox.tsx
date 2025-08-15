import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps {
  search: string;
  setSearch: (value: string) => void;
  handlePage: (num: number) => void;
}

export default function SearchBox({ search, setSearch, handlePage }: SearchBoxProps) {
  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      handlePage(1);
    },
    300
  );

  return (
    <>
      <input
        className={css.input}
        defaultValue={search}
        onChange={handleChange}
        type="text"
        placeholder="Search notes"
      />
    </>
  );
}
