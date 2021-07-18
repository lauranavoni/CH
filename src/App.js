import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';

const App = () => {
  const [activeUser, setActiveUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setActiveUser(true);
    }
  }, [activeUser]);


  return (
    <Router>
      <Navbar activeUser={activeUser} setActiveUser={setActiveUser} />
      <div className="container mb-5">
        <Switch>
          <Route path="/login" exact>
            <Login activeUser={activeUser} setActiveUser={setActiveUser} />
          </Route>

          <Route path="/" exact>
            {!activeUser ? <Redirect to="/login" /> : <Home />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
