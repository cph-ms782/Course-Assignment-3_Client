import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import facade from "./components/loginFacade";
import LogIn from "./components/LogIn";
import Data from "./components/Data";
import Home from "./components/Home";

function App() {
  console.log("App");
  const token = localStorage.getItem("jwtToken");
  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  const logout = () => {
    console.log("App - logout");
    facade.logout();
    setLoggedIn(false);
    console.log("loggedIn", loggedIn);
  };
  const login = (user, pass) => {
    console.log("App - login");
    facade.login(user, pass).then(res => setLoggedIn(true));
    console.log("loggedIn", loggedIn);
  };
  return (
    <div>
      <Router >
        <div>
          <Header loggedIn={loggedIn} />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/data"><Data loggedIn={loggedIn} /></Route>
            <Route path="/log"><LogIn
              facade={facade}
              loggedIn={loggedIn}
              login={login}
              logout={logout}
            /></Route>
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Header({ loggedIn }) {
  console.log("Header");
  return (
    <div>
      <ul className="header">
        <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
        <li><NavLink activeClassName="active" to="/data">Data</NavLink></li>
        <li><NavLink activeClassName="active" to="/log">{loggedIn ? <div>Logout</div> : <div>Login</div>}</NavLink></li>
      </ul>
    </div>
  )
}

function NoMatch() {
  console.log("NoMatch");
  return (
    <div>
      hello NoMatch
    </div>
  )
}

export default App;
