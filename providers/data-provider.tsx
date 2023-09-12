'use client';

import { ApolloProvider } from '@apollo/client/react';

import client from '@/lib/data';

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
