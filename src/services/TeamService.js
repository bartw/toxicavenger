import {database} from "firebase";
import Team from "../entities/Team";

export default class TeamService {
  constructor(onChanged) {
    const ref = database().ref("teams");

    const valueCallback = ref.on("value", snapshot => {
      const data = snapshot.val();
      const teams = Team.parseTeams(data);
      onChanged(teams);
    });

    this.add = (owner, name) => {
      ref.child(owner).push({ name });
    };

    this.delete = (owner, id) => {
      ref.child(owner).child(id).remove();
    };

    this.dispose = () => {
      ref.off("value", valueCallback);
    };
  }

  static getTeam(owner, id) {
    return database()
      .ref("teams/" + owner + "/" + id)
      .once("value")
      .then(snapshot => new Team(id, owner, snapshot.val().name));
  }
}
