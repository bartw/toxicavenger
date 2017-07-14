import * as firebase from "firebase";
import _ from "lodash";

export default class TeamService {
  constructor(onChanged) {
    const ref = firebase.database().ref("teams");
    
    ref.on("value", snapshot => {
      const data = snapshot.val();
      const owners = _(data).keys().value();
      const teams = _(owners).map(owner => {
        const ownerTeams = _(data[owner]).keys().value();
        return _(ownerTeams).map(ownerTeam => {
          return {...data[owner][ownerTeam], owner: owner, id: ownerTeam};
        }).value();
      }).flatten().value();
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
