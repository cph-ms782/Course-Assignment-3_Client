import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Prompt,
  Switch,
  useParams,
  useHistory,
  useRouteMatch
} from "react-router-dom";
import facade from "./apiFacade";
import funcFacade from "./funcApiFacade";

function App({ facade }) {
  console.log("App");
  return (
    <div>
      <Router >
        <div>
          <Header />
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/data"><Data /></Route>
            <Route path="/log"><AppLogin /></Route>
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Header() {
  console.log("Header");
  return (
    <div>
      <ul className="header">
        <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
        <li><NavLink activeClassName="active" to="/data">Data</NavLink></li>
        <li><NavLink activeClassName="active" to="/log">User</NavLink></li>
      </ul>
    </div>
  )
}

function Home() {
  console.log("Home");
  return (
    <div>
      hello Home
      </div>
  )
}

function Data() {
  console.log("Data");
  var promise;
  const getData = async (promise) => {
    console.log("getData");
    try {
      promise = await facade.fetchSW();
      console.log("promise1", promise);
    } catch (e) {
      console.log("err", e);
    }
    return (
      <div>

        <table className="table">
          <tbody>
            {promise.map((dat) =>
              <tr key={dat.id}>
                <td>{dat.name}</td>
                <td>{dat.url}</td>
              </tr>
            )}
          </tbody>
        </table>


        {promise.map((dat) => (
          <li key={dat.name}>{dat.name} {dat.url}</li>
        ))
        }
      </div >
    )
  }
  console.log("promise2", promise);
  getData();
}

function NoMatch() {
  console.log("NoMatch");
  return (
    <div>
      hello NoMatch
    </div>
  )
}


class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }
  login = evt => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };
  onChange = evt => {
    this.setState({ [evt.target.id]: evt.target.value });
  };
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.login} onChange={this.onChange}>
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button>Login</button>
        </form>
      </div>
    );
  }
}
class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }
  componentDidMount = () => {
    facade.fetchData().then(res => this.setState({ dataFromServer: res.msg }));
  }
  render() {
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
      </div>
    );
  }
}
class AppLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  };
  login = (user, pass) => {
    facade.login(user, pass).then(res => this.setState({ loggedIn: true }));
  };
  render() {
    return (
      <div>
        {!this.state.loggedIn ? (
          <LogIn login={this.login} />
        ) : (
            <div>
              <LoggedIn />
              <button onClick={this.logout}>Logout</button>
            </div>
          )}
      </div>
    );
  }
}
export default App;
