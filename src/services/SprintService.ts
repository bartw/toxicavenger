import * as firebase from "firebase/app";
import { CancellableCallback } from "./CancellableCallback";
import Sprint from "../entities/Sprint";

type SprintCallback = (sprints: Sprint[]) => void;

export default class SprintService {
  private sprints: Sprint[];
  private ref: firebase.database.Reference;
  private addedCallback: CancellableCallback;
  private removedCallback: CancellableCallback;
  private onChanged: SprintCallback;

  constructor(team: string, onChanged: SprintCallback) {
    this.sprints = [];
    this.onChanged = onChanged;
    this.ref = firebase.database().ref("sprints/" + team);

    if (this.onChanged) {
      this.attachAddedCallback();
      this.attachRemovedCallback();
    }
  }

  public add = (name): void => {
    this.ref.push({ name });
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

  private attachAddedCallback = () => {
    this.addedCallback = this.ref.on("child_added", this.onAdded);
  };

  private onAdded = (data: firebase.database.DataSnapshot) => {
    const newSprint = new Sprint(data.key, data.val().name);
    this.sprints = [newSprint, ...this.sprints];
    this.onChanged(this.sprints);
  };

  private attachRemovedCallback = () => {
    this.removedCallback = this.ref.on("child_removed", this.onRemoved);
  };

  private onRemoved = (data: firebase.database.DataSnapshot) => {
    this.sprints = this.sprints.filter(sprint => sprint.id !== data.key);
    this.onChanged(this.sprints);
  };

  public static getSprint(team, id): firebase.Promise<any> {
    return firebase
      .database()
      .ref("sprints/" + team + "/" + id)
      .once("value")
      .then(snapshot => new Sprint(id, snapshot.val().name));
  }
}
