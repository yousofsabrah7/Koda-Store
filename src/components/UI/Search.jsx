import { SearchIcon } from "lucide-react";

const Search = ({ placeholder = "Search...", value = "", onChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <SearchIcon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        size={22}
      />

      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-border-subtle
          bg-surface-card
          px-6
          py-3
          pl-10
          text-text-primary
          placeholder:text-text-muted
          transition
          focus:border-accent
          focus:outline-none
        "
      />
    </form>
  );
};

export default Search;
