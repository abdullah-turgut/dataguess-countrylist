'use client';

import { useState } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { useQuery, gql } from '@apollo/client';

import client from '@/lib/data';

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
