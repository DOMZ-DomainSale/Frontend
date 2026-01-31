'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface DomainProps {
  name: string;
}

const Domain: React.FC<DomainProps> = ({ name }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/domainbuy?filter=${encodeURIComponent(name)}`)
      }
      className="rounded-2xl bg-white shadow-md w-72 py-7 px-2
                 flex flex-col items-center justify-center
                 cursor-pointer transition
                 hover:shadow-lg hover:-translate-y-1"
    >
      <h5 className="text-2xl font-bold text-gray-900 mb-1">{name}</h5>
      <p className="text-gray-500 text-base">Promoted</p>
    </div>
  );
};

export default Domain;
