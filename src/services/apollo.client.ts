import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from '@apollo/client';
import { STORAGE_KEY } from '../config/constants';

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(STORAGE_KEY.TOKEN) || null;
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  // link: httpLink,
});
