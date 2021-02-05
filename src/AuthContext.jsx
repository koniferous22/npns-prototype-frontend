import React from 'react';

const AuthContext = React.createContext({
    loggedIn: false,
    toggleLoggedIn: () => {},
    token: {},
    setToken: () => {},
    user: {},
    setUser: () => {}
  });

export default AuthContext;