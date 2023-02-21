import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import ToolBar from './components/Navigation/Toolbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {

  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Redirect to="/" />
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
      isLoggedIn: !!token,
      token: token,
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
