import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import ToolBar from './components/Navigation/Toolbar';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import TutorList from './pages/TutorList';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {

  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    // show these routes if the user is logged in
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/tutors">
          <TutorList />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    // show these routes if the user is not logged in
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/admin">
          <Admin />
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
