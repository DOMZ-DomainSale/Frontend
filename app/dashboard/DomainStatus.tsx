"use client";

import { useState } from "react";

type Domain = {
  id: string;
  domain: string;
  status: string;
  createdAt: string;
};

const DomainTable = ({ data }: { data: Domain[] }) => {
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredData =
    statusFilter === "All"
      ? data
      : data?.filter((d) => d.status === statusFilter);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200">
      {/* Filter */}
      <div className="p-4 border-b flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Filter by status:</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
          <option value="Manual Review">Manual Review</option>
        </select>
      </div>

      {/* Table */}
      <div className="relative max-h-105 overflow-y-auto">
        <table className="w-full text-left table-auto min-w-max">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10 bg-white/30 backdrop-blur-3xl">
            <tr>
              <th className="p-4 border-b text-sm font-medium text-gray-700">
                Domain Name
              </th>
              <th className="p-4 border-b text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="p-4 border-b text-sm font-medium text-gray-700">
                Added On
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredData?.length ? (
              filteredData.map((domain) => (
                <tr
                  key={domain.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-4 border-b text-sm text-gray-900">
                    {domain.domain}
                  </td>
                  <td className="p-4 border-b text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          domain.status === "Pass"
                            ? "bg-green-100 text-green-700"
                            : domain.status === "Fail"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {domain.status}
                    </span>
                  </td>
                  <td className="p-4 border-b text-sm text-gray-700">
                    {new Date(domain.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="p-6 text-center text-sm text-gray-500"
                >
                  No domains found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DomainTable;
