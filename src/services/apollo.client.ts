import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  concat,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { getToken } from '../utils/auth';

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authLink, httpLink),
});

const getAuthLink = (token?: string) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

export const getAuthClient = (token?: string) => {
  const auth = getAuthLink(token);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(auth, httpLink),
  });
};
