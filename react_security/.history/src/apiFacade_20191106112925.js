const URL = "http://localhost:8080/securitystarter/";
function handleHttpErrors(res) {
 if (!res.ok) {
   return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}

class ApiFacade {
 //Insert utility-methods from a latter step (d) here
 makeOptions(method,addToken,body) {
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && this.loggedIn()) {
     opts.headers["x-access-token"] = this.getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
 }
}
const facade = new ApiFacade();
export default facade;
