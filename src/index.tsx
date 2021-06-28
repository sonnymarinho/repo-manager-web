import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';
import { client } from './services/apollo.client';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
