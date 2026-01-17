'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import Modal from '@/components/model';
import EmailTemplate from '@/components/EmailTemplate';
import { toast } from 'react-toastify';
import Link from 'next/link';
import FilterDomain, { DomainFilters } from '@/components/FilterDashboard';

interface Domain {
  domainId: string;
  finalUrl: string;
  domain: string;
  isChatActive: boolean;
  user: {
    name: string;
  };
}

interface DomainTableProps {
  searchQuery: string;
}

const DomainTable = ({ searchQuery }: DomainTableProps) => {
  /* ---------------- FILTER STATE ---------------- */
  const [showFilter, setShowFilter] = useState(false);

  // User edits these freely
  const [draftFilters, setDraftFilters] = useState<DomainFilters>({
    extensions: [],
  });

  // Only THESE affect the table (Apply button)
  const [appliedFilters, setAppliedFilters] = useState<DomainFilters>({
    extensions: [],
  });

  /* ---------------- DATA STATE ---------------- */
  const [domains, setDomains] = useState<Domain[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  /* ---------------- MODAL STATE ---------------- */
  const [open, setOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);

  const totalPages = Math.ceil(total / limit);

  /* ---------------- FETCH DOMAINS ---------------- */
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_apiLink}domain/public`,
          { params: { page, limit } }
        );

        setDomains(res.data.domains);
        setTotal(res.data.total);
      } catch {
        toast.error('Failed to load domains');
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, [page, limit]);

  /* ---------------- CONNECT ---------------- */
  const handleConnect = (domain: Domain) => {
    if (!domain.isChatActive) return;
    setSelectedDomain(domain);
    setOpen(true);
  };

  /* ---------------- APPLY FILTERS ---------------- */
const filteredDomains = domains.filter(d => {
  const fullDomain = d.domain.toLowerCase();
  const domainName = fullDomain.split(".")[0]; // name without extension
  const search = searchQuery.toLowerCase();

  /* ---------------- SEARCH BAR ---------------- */
  if (search && !fullDomain.includes(search)) return false;

  /* ---------------- EXTENSIONS ---------------- */
  if (
    appliedFilters.extensions.length > 0 &&
    !appliedFilters.extensions.some(ext => fullDomain.endsWith(ext))
  ) {
    return false;
  }

  /* ---------------- WORD MATCHING ---------------- */
  if (appliedFilters.exact) {
    // EXACT match overrides partial matching
    if (appliedFilters.startsWith && domainName !== appliedFilters.startsWith.toLowerCase())
      return false;

    if (appliedFilters.endsWith && domainName !== appliedFilters.endsWith.toLowerCase())
      return false;

    if (appliedFilters.contains && domainName !== appliedFilters.contains.toLowerCase())
      return false;
  } else {
    // Normal partial matching
    if (
      appliedFilters.startsWith &&
      !domainName.startsWith(appliedFilters.startsWith.toLowerCase())
    ) return false;

    if (
      appliedFilters.endsWith &&
      !domainName.endsWith(appliedFilters.endsWith.toLowerCase())
    ) return false;

    if (
      appliedFilters.contains &&
      !domainName.includes(appliedFilters.contains.toLowerCase())
    ) return false;
  }

  /* ---------------- LENGTH ---------------- */
  if (
    appliedFilters.minLength !== undefined &&
    domainName.length < appliedFilters.minLength
  ) return false;

  if (
    appliedFilters.maxLength !== undefined &&
    domainName.length > appliedFilters.maxLength
  ) return false;

  /* ---------------- SELLER ---------------- */
  if (
    appliedFilters.sellerName &&
    !d.user?.name?.toLowerCase().includes(appliedFilters.sellerName.toLowerCase())
  ) return false;

  return true;
});


  return (
    <div className="w-full mt-10">

      {/* EMAIL MODAL */}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Contact Seller">
        {selectedDomain && (
          <EmailTemplate
            domainId={selectedDomain.domainId}
            domain={selectedDomain.domain}
            onClose={() => setOpen(false)}
          />
        )}
      </Modal>

      {/* TABLE CONTAINER */}
      <div className="rounded-xl border border-blue-100 bg-white">

        {/* FILTER BUTTON */}
        <div className="flex justify-between px-4 py-4">
          <button
            onClick={() => setShowFilter(v => !v)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 shadow-md transition-all"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="6" cy="12" r="1.3" />
              <circle cx="12" cy="12" r="1.3" />
              <circle cx="18" cy="12" r="1.3" />
            </svg>
            Filter
          </button>
        </div>

        {/* FILTER PANEL */}
        {showFilter && (
          <FilterDomain
            filters={draftFilters}
            onApply={(filters) => {
              setAppliedFilters(filters);   // ✅ ONLY HERE filters apply
              setDraftFilters(filters);
              setShowFilter(false);
              setPage(1);
            }}
            onClear={() => {
              setDraftFilters({ extensions: [] });
              setAppliedFilters({ extensions: [] });
              setShowFilter(false);
            }}
          />
        )}

        {/* PAGE SIZE SELECTOR */}
        <div className="flex justify-end px-4 py-3 border-b bg-white">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Show</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="border rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>per page</span>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full min-w-150 text-sm border-collapse">
          <thead className="sticky top-0 bg-blue-50 text-blue-900">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Domain</th>
              <th className="px-6 py-4 text-center font-medium">Connect</th>
              <th className="px-6 py-4 text-left font-medium">Seller</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-10 text-center text-gray-500">
                  Loading domains...
                </td>
              </tr>
            ) : (
              filteredDomains.map(d => (
                <tr key={d.domainId} className="border-t">
                  <td className="px-6 py-4">
                    {d.finalUrl ? (
                      <Link href={d.finalUrl} target="_blank" className="text-blue-600 hover:underline">
                        {d.domain}
                      </Link>
                    ) : (
                      <span>{d.domain}</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleConnect(d)}
                      disabled={!d.isChatActive}
                      className={
                        d.isChatActive
                          ? 'text-blue-600 hover:text-blue-800'
                          : 'text-gray-400 cursor-not-allowed'
                      }
                    >
                      <Send size={16} />
                    </button>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {d.user?.name || 'Anonymous'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8 text-sm">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={page === i + 1 ? 'bg-blue-600 text-white px-3 py-1 rounded' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
        </div>
      )}
    </div>
  );
};

export default DomainTable;
