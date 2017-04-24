class Auth {

  static authenticateUser(token, email) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', decodeURIComponent(email));
  }

  static getUserEmail(){
    return localStorage.getItem('email');
  }

  static isUserAuthenticated() {
    if(typeof localStorage !== 'undefined'){
      return localStorage.getItem('token') !== null;
    }
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }


  static getToken() {
    return localStorage.getItem('token');
  }

}

export default Auth;
