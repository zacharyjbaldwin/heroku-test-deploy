import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import ToolBar from './components/Navigation/Toolbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthContext } from './shared/context/auth-context';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback(userId => {
    setIsLoggedIn(true);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/profile">
          <Login />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      userId: userId,
      login: login,
      logout: logout
    }}>
      <Router>
        <ToolBar />
        <main className='mt-3'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                {routes}
              </div>
            </div>
          </div>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
