import React, { useState } from "react";
import "./App.css";
import Todo from "./component/Todo";
import Header from "./component/Header";
import Auth from "./component/Auth"
import AuthContext from "./authContext";

function App() {
  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);
  const onSwitch = pageName => {
    setPage(pageName);
  }

  const authenticate = (isAuth) => {
    setAuthStatus(isAuth);
  }

  return (
    <AuthContext.Provider value={{ status: authStatus, authenticate }}>
      <Header
        onLoadTodos={() => onSwitch('todos')}
        onLoadAuth={() => onSwitch('auth')}
      />
      {page === 'auth' ? <Auth /> : <Todo />}
    </AuthContext.Provider>
  );
}

export default App;
