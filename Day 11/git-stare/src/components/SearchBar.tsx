import { useState } from "react";

interface Props {
  onSearch: (username: string) => void;
}

function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState("");
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  const handleSearch = () => {
    if (!input) return;
    onSearch(input);
    const newHistory = Array.from(new Set([input, ...history])).slice(0, 5);
    localStorage.setItem("history", JSON.stringify(newHistory));
  };

  return (
    <div>
      <input
        className="border p-2"
        placeholder="Enter GitHub username"
        value={input}
        onChange={e => setInput(e.target.value)}
        list="history-options"
      />
      <datalist id="history-options">
        {history.map((h: string) => (
          <option key={h} value={h} />
        ))}
      </datalist>
      <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
