import * as firebase from "firebase/app";
import Request from "../entities/Request";
import { CancellableCallback } from "./CancellableCallback";

type RequestCallback = (requests: Request[]) => void;

export default class RequestService {
  private requests: Request[];
  private ref: firebase.database.Reference;
  private addedCallback: CancellableCallback;
  private removedCallback: CancellableCallback;
  private onChanged: RequestCallback;

  constructor(team: string, onChanged: RequestCallback) {
    this.requests = [];
    this.onChanged = onChanged;
    this.ref = firebase.database().ref("requests/" + team);

    if (onChanged) {
      this.attachAddedCallback();
      this.attachRemovedCallback();
    }
  }

  public add = (userId: string, userName: string): void => {
    this.ref.push({ userId: userId, userName });
  };

  public delete = (id): void => {
    this.ref.child(id).remove();
  };

  public dispose = (): void => {
    if (this.onChanged) {
      this.ref.off("child_added", this.addedCallback);
      this.ref.off("child_removed", this.removedCallback);
    }
  };

  private attachAddedCallback = (): void => {
    this.addedCallback = this.ref.on("child_added", this.onAdded);
  };

  private onAdded = (data: firebase.database.DataSnapshot): void => {
    const newRequest = new Request(
      data.key,
      data.val().userId,
      data.val().userName
    );
    this.requests = [newRequest, ...this.requests];
    this.onChanged(this.requests);
  };
  private attachRemovedCallback = (): void => {
    this.removedCallback = this.ref.on("child_removed", this.onRemove);
  };

  private onRemove = (data: firebase.database.DataSnapshot): void => {
    this.requests = this.requests.filter(request => request.id !== data.key);
    this.onChanged(this.requests);
  };
}
