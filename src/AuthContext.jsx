import React from 'react';

const AuthContext = React.createContext({
    loggedIn: false,
    toggleLoggedIn: () => {},
    token: '',
    setToken: () => {}
  });

export default AuthContext;