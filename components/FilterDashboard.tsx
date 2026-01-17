"use client";
import React, { useState } from "react";

export type DomainFilters = {
  extensions: string[];
  startsWith?: string;
  endsWith?: string;
  contains?: string;
  minLength?: number;
  maxLength?: number;
  sellerName?: string;
};

const extensions = [
  ".com", ".org", ".net", ".ai", ".xyz", ".now", ".de",
  ".co", ".io", ".us", ".ca", ".uk", ".au", ".info"
];

type Props = {
  filters: DomainFilters;
  onApply: (filters: DomainFilters) => void;
  onClear: () => void;
};

const FilterDomain = ({ filters, onApply, onClear }: Props) => {
  const [localFilters, setLocalFilters] = useState<DomainFilters>(filters);

  const toggleExtension = (ext: string) => {
    setLocalFilters(prev => ({
      ...prev,
      extensions: prev.extensions.includes(ext)
        ? prev.extensions.filter(e => e !== ext)
        : [...prev.extensions, ext]
    }));
  };

  return (
    <div className="bg-white px-6 pb-10">

      <div className="relative w-full max-w-5xl mx-auto bg-gradient-to-tr from-blue-100 via-white to-blue-200 rounded-3xl shadow-xl px-10 py-8 mb-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Extensions */}
          <div>
            <h4 className="font-bold text-lg mb-4">Extensions</h4>
            <div className="grid grid-cols-2 gap-2">
              {extensions.map(ext => (
                <label key={ext} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={localFilters?.extensions.includes(ext)}
                    onChange={() => toggleExtension(ext)}
                    className="accent-blue-500"
                  />
                  {ext}
                </label>
              ))}
            </div>

            <button
              onClick={onClear}
              className="mt-6 text-blue-600 font-semibold hover:underline"
            >
              Clear Filters
            </button>
          </div>

          {/* Words */}
          <div>
            <h4 className="font-bold text-lg mb-4">Words</h4>
            <input
              placeholder="Starts with"
              className="w-full mb-2 rounded border p-2"
              value={localFilters?.startsWith || ""}
              onChange={e =>
                setLocalFilters({ ...localFilters, startsWith: e.target.value })
              }
            />
            <input
              placeholder="Ends with"
              className="w-full mb-2 rounded border p-2"
              value={localFilters?.endsWith || ""}
              onChange={e =>
                setLocalFilters({ ...localFilters, endsWith: e.target.value })
              }
            />
            <input
              placeholder="Contains"
              className="w-full rounded border p-2"
              value={localFilters?.contains || ""}
              onChange={e =>
                setLocalFilters({ ...localFilters, contains: e.target.value })
              }
            />
          </div>

          {/* Length */}
          <div>
            <h4 className="font-bold text-lg mb-4">Length</h4>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 rounded border p-2"
                value={localFilters?.minLength ?? ""}
                onChange={e =>
                  setLocalFilters({
                    ...localFilters,
                    minLength: Number(e.target.value)
                  })
                }
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 rounded border p-2"
                value={localFilters?.maxLength ?? ""}
                onChange={e =>
                  setLocalFilters({
                    ...localFilters,
                    maxLength: Number(e.target.value)
                  })
                }
              />
            </div>
          </div>

          {/* Seller */}
          <div>
            <h4 className="font-bold text-lg mb-4">Seller</h4>
            <input
              placeholder="Seller name"
              className="w-full rounded border p-2"
              value={localFilters?.sellerName || ""}
              onChange={e =>
                setLocalFilters({
                  ...localFilters,
                  sellerName: e.target.value
                })
              }
            />
          </div>
        </div>

        {/* APPLY BUTTON (THIS IS THE KEY FIX) */}
        <button
          onClick={() => onApply(localFilters)}
          className="absolute right-10 bottom-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-2 rounded-full shadow"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterDomain;
