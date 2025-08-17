import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBox({ search, onSearchChange }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
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
