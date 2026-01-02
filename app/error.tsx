'use client'

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      
      {/* Illustration */}
      <div className="mb-10">
        <img
          src="/404-computer.svg"
          alt="Error Illustration"
          className="mx-auto max-w-105 w-full"
        />
      </div>

      {/* Error Text */}
      <p className="text-red-600 font-semibold text-lg mb-2">
        Something went wrong
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        Oops! An unexpected error occurred.
      </h1>

      <p className="text-gray-500 mb-6">
        Don’t worry — you can try again or navigate back safely.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
        <button
          onClick={reset}
          className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium hover:bg-gray-50 transition"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="rounded-md border border-indigo-600 px-5 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
