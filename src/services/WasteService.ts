import * as firebase from "firebase/app";
import WasteItem from "../entities/WasteItem";
import { CancellableCallback } from "./CancellableCallback";

type WasteCallback = (waste: WasteItem[]) => void;

export default class WasteService {
  private waste: WasteItem[];
  private ref: firebase.database.Reference;
  private addedCallback: CancellableCallback;
  private removedCallback: CancellableCallback;
  private onChanged: WasteCallback;

  public constructor(team: string, sprint: string, onChanged: WasteCallback) {
    this.waste = [];
    this.onChanged = onChanged;
    this.ref = firebase.database().ref("waste/" + team + "/" + sprint);

    if (this.onChanged) {
      this.attachAddedCallback();
      this.attachRemovedCallback();
    }
  }

  public add = (userId, userName, type, description, duration): void => {
    this.ref.push({
      userId,
      userName,
      type,
      description,
      duration: parseFloat(duration).toFixed(1)
    });
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
    const newWaste = new WasteItem(
      data.key,
      data.val().userId,
      data.val().userName,
      data.val().type,
      data.val().description,
      data.val().duration
    );
    this.waste = [newWaste, ...this.waste];
    this.onChanged(this.waste);
  };

  private attachRemovedCallback = (): void => {
    this.removedCallback = this.ref.on("child_removed", this.onRemoved);
  };

  private onRemoved = (data: firebase.database.DataSnapshot): void => {
    this.waste = this.waste.filter(item => item.id !== data.key);
    this.onChanged(this.waste);
  };
}
