import { initializeApp } from "firebase";
import firebaseConfig from "./firebaseConfig";

export default class AppService {
  static initialize() {
    initializeApp(firebaseConfig);
  }
}
