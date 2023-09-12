import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import DataProvider from '@/providers/data-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DataGuess | Countries',
  description: 'Assigmnet for dataguess',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </DataProvider>
  );
}
