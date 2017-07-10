import * as firebase from "firebase";

export default class AuthenticationService {
  constructor(onAuthStateChanged) {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    this.login = () => {
      auth.signInWithPopup(provider);
    };

    this.logout = () => {
      auth.signOut();
    };

    this.getCurrentUser = () => auth.currentUser;
    this.isAuthenticated = () => !!auth.currentUser;

    auth.onAuthStateChanged(onAuthStateChanged);
  }
}
