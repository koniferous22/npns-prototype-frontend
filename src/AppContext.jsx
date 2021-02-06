import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AuthContext from './AuthContext';
import { Provider } from 'react-redux';

import store from './store'


const client = new ApolloClient({
  uri: 'http://localhost:3000/',
  cache: new InMemoryCache()
  });

console.log(JSON.stringify(store, null ,2));

function AppContext({ children }) {
  const [loggedIn, toggleLoggedIn] = useState(false);
  const [token, setToken] = useState({});
  const [user, setUser] = useState({});
  
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AuthContext.Provider value={{
          loggedIn,
          logIn: () => toggleLoggedIn(true),
          logOut: () => toggleLoggedIn(false),
          token,
          setToken: (t) => setToken(t),
          user,
          setUser: (u) => setUser(u)
        }}>
          {children}
        </AuthContext.Provider>
      </Provider>
    </ApolloProvider>
  );
};

export default AppContext;