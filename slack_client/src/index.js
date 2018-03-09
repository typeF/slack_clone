import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
// import { HttpLink, createHttpLink } from 'apollo-link-http';
import { HttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import 'semantic-ui-css/semantic.min.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

// const networkInterface = createNetworkInterface({
//   uri: 'http://localhost:8080'
// });

// Non-middleware route

// const httpLink = createHttpLink({
//   uri: 'http://localhost:8080/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('token');
//   const refreshToken = localStorage.getItem('refreshToken');
//   return {
//     headers: {
//       ...headers,
//       tokenX: token,
//       tokenRefresh: refreshToken,
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

// Middleware option

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  operation.setContext({
    headers: {
      tokenX: token,
      tokenRefresh: refreshToken,
    }
  });
  return forward(operation);
});

const refreshTokenLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    console.log('response: ', response);
    return response;
    // const token = headers.get('tokenX');
    // const refreshToken = headers.get('tokenRefresh');

    // if (token) {
    //   localStorage.setItem('token', token);
    // }

    // if (refreshToken) {
    //   localStorage.setItem('refreshToken', refreshToken);
    // }
  })
});

const client = new ApolloClient({
  refreshTokenLink,
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});


// Original working option

// const client = new ApolloClient({
//   link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
//   cache: new InMemoryCache()
// });

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
