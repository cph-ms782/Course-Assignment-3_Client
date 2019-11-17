import URL from "../settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class LoginFacade {
  setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  loggedIn = () => {
    console.log("loggedIn func");
    const loggedIn = this.getToken() != null;
    return loggedIn;
  };
  logout = () => {
    localStorage.removeItem("jwtToken");
  };
  login = (user, pass) => {
    console.log("user, pass", user, pass)
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        this.setToken(res.token);
      })
      .catch(err => { throw err });
  };

  getRole = () => {
    let jwt = localStorage.getItem("jwtToken");
    let jwtData = jwt.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.roles;
  };

  makeOptions(method, addToken, body) {
    console.log("makeOptions");
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': "application/json"
      }
    };
    if (addToken && this.loggedIn()) {
      opts.headers["x-access-token"] = this.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    console.log("opts", opts);
    return opts;
  }

  fetchSW = () => {
    console.log("fetchSW");
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/sw/datadto", options).then(handleHttpErrors);
  }

  fetchData = () => {
    console.log("fetchData");
    const options = this.makeOptions("GET", true); //True add's the token
    if (this.getRole() === "admin") {
      return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
    } else {
      return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }
  };

}
const facade = new LoginFacade();
export default facade;
