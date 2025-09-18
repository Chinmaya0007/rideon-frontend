import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <div className="w-full relative z-[100] pointer-events-auto">
      <div className="flex items-center rounded-lg bg-[#223449] shadow-md px-2 py-2">
        <Search className=" text-[#90abcb] mr-2" />
        <input
          type="text"
          placeholder="Where to?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm md:text-base text-white placeholder:text-[#90abcb] focus:outline-none cursor-text"
        />
      </div>
    </div>
  );
};

export default SearchBar;
