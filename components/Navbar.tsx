import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
     <nav className="bg-linear-to-b from-[#e6effd] to-white w-full">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0.5 font-bold text-2xl select-none">
          {/* Grid logo */}
          <span className="inline-block mr-2">
            {/* 3x3 black grid */}
            <span className="flex flex-col space-y-0.5">
              {[0, 1, 2].map(row => (
                <span key={row} className="flex space-x-0.5">
                  {[0, 1, 2].map(col => (
                    <span key={col} className="w-1.5 h-1.5 bg-black rounded-sm inline-block" />
                  ))}
                </span>
              ))}
            </span>
          </span>
          <span>DOM</span>
          <span className="text-blue-600 ml-px">Z</span>
        </Link>

        {/* Navbar Links */}
        <div className="flex items-center gap-2 bg-red-900">
          <div className="relative">
            {/* Home Link with dropdown arrow */}
            <button className="bg-white text-gray-800 font-medium px-6 py-2 rounded-full shadow border flex items-center hover:bg-gray-50 transition">
              Home
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
          <Link
            href="/buy"
            className="bg-white text-gray-800 font-medium px-6 py-2 rounded-full shadow border hover:bg-gray-50 transition"
          >
            Buy
          </Link>
          <Link
            href="/sell"
            className="bg-white text-gray-800 font-medium px-6 py-2 rounded-full shadow border hover:bg-gray-50 transition"
          >
            Sell
          </Link>
          <Link
            href="/contact"
            className="bg-white text-gray-800 font-medium px-6 py-2 rounded-full shadow border hover:bg-gray-50 transition"
          >
            Contact
          </Link>
        </div>

        {/* My Domz Button */}
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
        >
          My Domz
        </Link>
      </div>
    </nav>
  )
}

export default Navbar