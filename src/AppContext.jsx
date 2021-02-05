import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AuthContext from './AuthContext'

const client = new ApolloClient({
  uri: 'http://localhost:3000/',
  cache: new InMemoryCache()
  });

function AppContext({ children }) {
  const [loggedIn, toggleLoggedIn] = useState(false);
  
  return (
    <div>
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{
        loggedIn,
        logIn: () => toggleLoggedIn(true),
        logOut: () => toggleLoggedIn(false)
      }}>
        {children}
      </AuthContext.Provider>
    </ApolloProvider>
    </div>
  );
};

export default AppContext;