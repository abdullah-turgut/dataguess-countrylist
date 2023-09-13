'use client';

import DataTable from '@/components/data-table';

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl px-10 py-4 font-bold tracking-tighter">
        DataGuess | Assignment
      </h1>
      <DataTable />
    </div>
  );
}
