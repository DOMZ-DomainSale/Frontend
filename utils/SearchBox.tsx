import { Search, X } from 'lucide-react';

const SearchBox = ({
  value,
  onChange,
  placeholder = 'Search domains…',
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Search icon */}
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onChange('');
        }}
        placeholder={placeholder}
        aria-label="Search domains"
        className="
          w-full
          rounded-full
          border border-slate-300
          bg-white
          py-2 pl-9 pr-9
          text-sm text-slate-900
          placeholder-slate-400
          shadow-sm
          focus:border-blue-500
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
        "
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-slate-400 hover:text-slate-600
            focus:outline-none
          "
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
