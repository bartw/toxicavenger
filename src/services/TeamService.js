import * as firebase from "firebase";
import Team from "../entities/Team";

export default class TeamService {
  constructor(onChanged) {
    const ref = firebase.database().ref("teams");
    
    ref.on("value", snapshot => {
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
      ref.off();
    };
  }
}
