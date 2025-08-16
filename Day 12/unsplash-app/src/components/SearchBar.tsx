import React from "react";

interface Props {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search photos..."
      style={{
        padding: "0.5rem",
        width: "100%",
        marginBottom: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
  );
};

export default SearchBar;
