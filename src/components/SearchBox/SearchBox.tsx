import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  setSearch: (value: string) => void;
  handlePage: (num: number) => void;
}

export default function SearchBox({
  search,
  setSearch,
  handlePage,
}: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    handlePage(1);
  };

  return (
    <>
      <input
        className={css.input}
        value={search}
        onChange={handleChange}
        type="text"
        placeholder="Search notes"
      />
    </>
  );
}
