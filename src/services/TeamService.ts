import * as firebase from "firebase/app";
import Team from "../entities/Team";
import { CancellableCallback } from "./CancellableCallback";

type TeamCallback = (teams: Team[]) => void;

export default class TeamService {
  private ref: firebase.database.Reference;
  private valueCallback: CancellableCallback;
  private onChanged: TeamCallback;

  constructor(onChanged) {
    this.onChanged = onChanged;
    this.ref = firebase.database().ref("teams");

    this.attachValueCallback();
  }

  public add = (owner: string, name: string) => {
    this.ref.child(owner).push({ name });
  };

  public delete = (owner: string, id: string) => {
    this.ref.child(owner).child(id).remove();
  };

  public dispose = () => {
    this.ref.off("value", this.valueCallback);
  };

  private attachValueCallback = () => {
    this.valueCallback = this.ref.on("value", this.onValue);
  };

  private onValue = (snapshot: firebase.database.DataSnapshot) => {
    const data = snapshot.val();
    const teams = Team.parseTeams(data);
    this.onChanged(teams);
  };

  public static getTeam(owner, id) : firebase.Promise<any> {
    return firebase
      .database()
      .ref("teams/" + owner + "/" + id)
      .once("value")
      .then(snapshot => new Team(id, owner, snapshot.val().name));
  }
}
