import React from "react";

type Props = {
  suggestions: { display_name: string; lat: string; lon: string }[];
  onSelect: (item: any) => void;
};

const SearchSuggestions: React.FC<Props> = ({ suggestions, onSelect }) => {
  if (!suggestions.length) return null;
  return (
    <ul className="absolute left-0 right-0 mt-2 bg-[#1f2d3d] rounded-lg shadow-lg max-h-56 overflow-y-auto border border-[#2a3b4d] z-70">
      {suggestions.map((item, idx) => (
        <li
          key={idx}
          onClick={() => onSelect(item)}
          className="px-4 py-2 cursor-pointer hover:bg-[#2a3b4d] text-sm md:text-base"
        >
          {item.display_name}
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestions;
