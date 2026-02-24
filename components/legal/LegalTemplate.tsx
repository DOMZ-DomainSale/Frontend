'use client';

import React, { ReactNode } from 'react';

export type LegalTemplateProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalTemplate({
  title,
  lastUpdated,
  children,
}: LegalTemplateProps) {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24">
          {children}
        </div>

        <footer className="mt-16 pt-8 border-t text-sm text-slate-500">
          © {new Date().getFullYear()} Domz.com LLC. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

// Reusable Section
export type SectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalSection({ title, children }: SectionProps) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 text-slate-700 leading-7">{children}</div>
    </section>
  );
}
