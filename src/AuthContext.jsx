import React from 'react';

const AuthContext = React.createContext({
    loggedIn: false,
    toggleLoggedIn: () => {},
  });

export default AuthContext;