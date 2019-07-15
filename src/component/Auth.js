import React, { useContext } from 'react';
import AuthContext from '../authContext';

function Auth(props) {
  const auth = useContext(AuthContext);

  return (auth.status
    ? <button onClick={() => auth.authenticate(false)}>LogOut!</button>
    : <button onClick={() => auth.authenticate(true)}>LogIn!</button>)
};

export default Auth;