import {auth} from "firebase";

export default class AuthenticationService {
  constructor(onAuthStateChanged) {
    this.auth = auth();
    onAuthStateChanged(this.getCurrentUser());
    this.auth.onAuthStateChanged(onAuthStateChanged);
  }

  login = () => {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  };

  logout = () => {
    this.auth.signOut();
  };

  getCurrentUser = () => this.auth.currentUser;
  isAuthenticated = () => !!this.auth.currentUser;
}
