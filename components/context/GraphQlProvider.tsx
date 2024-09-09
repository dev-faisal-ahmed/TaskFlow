'use client';

import { PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/graphQlClient';

export const GraphQlProvider = ({ children }: PropsWithChildren) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
