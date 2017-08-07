import * as firebase from "firebase/app";

export type CancellableCallback = (
  a: firebase.database.DataSnapshot,
  b?: string
) => any;