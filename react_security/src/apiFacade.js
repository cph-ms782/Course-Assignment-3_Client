import URL from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class ApiFacade {
  //Insert utility-methods from a latter step (d) here
  setToken = token => {
    localStorage.setItem("jwtToken", token);
  };
  getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  loggedIn = () => {
    const loggedIn = this.getToken() != null;
    return loggedIn;
  };
  logout = () => {
    localStorage.removeItem("jwtToken");
  };
  login = (user, pass) => {
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        this.setToken(res.token);
      });
  };

  getRole = () => {
    let jwt = localStorage.getItem("jwtToken");
    let jwtData = jwt.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.roles;
  };

  makeOptions(method, addToken, body) {
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
    return opts;
  }

  // makeOptionsCORS(addToken) {
  //   var opts = {
  //     method: "OPTIONS",
  //     headers: {
  //       "Access-Control-Allow-Origin": URL,
  //       'Access-Control-Expose-Headers': "Content-Length"
  //     }
  //   };
  //   if (addToken && this.loggedIn()) {
  //     opts.headers["x-access-token"] = this.getToken();
  //   }
  //   return opts;
  // }

  fetchSW = () => {
    const options = this.makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/sw/data", options).then(handleHttpErrors);
  }

  fetchData = () => {
    const options = this.makeOptions("GET", true); //True add's the token
    if (this.getRole() === "admin") {
      return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
    } else {
      return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }
  };

}
const facade = new ApiFacade();
export default facade;
