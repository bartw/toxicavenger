import * as firebase from "firebase";
import _ from "lodash";

function mapTeams(snapshot) {
  return _(snapshot.val())
    .mapValues((teams, owner) =>
      _(teams)
        .mapValues((team, id) => _.merge({}, team, { id }, { owner }))
        .values()
        .value()
    )
    .values()
    .flatten()
    .value();
}

export default class TeamService {
  constructor(onChanged) {
    const ref = firebase.database().ref("teams");

    ref.on("value", snapshot => {
      onChanged(mapTeams(snapshot));
    });

    this.add = (owner, name) => {
      if (!owner || !name) {
        return;
      }
      firebase
        .database()
        .ref("teams/" + owner)
        .push({ name: name, members: [owner] });
    };

    this.join = (member, id) => {
      firebase.database().ref("teamrequests/" + id + "/" + member).set(true);
    };

    this.approve = (owner, member, id) => {
      const ref = firebase.database().ref("teams/" + owner + "/" + id);
      ref.once("value").then(snapshot => {
        const members = snapshot.val().members;
        firebase.database().ref("teams/" + owner + "/" + id).set({
          members: [...members, member]
        });
        firebase.database().ref("teamrequests/" + id + "/" + member).remove();
      });
    };

    this.decline = (member, id) => {
      firebase.database().ref("teamrequests/" + id + "/" + member).remove();
    };

    this.removeMember = (owner, member, id) => {
      const ref = firebase.database().ref("teams/" + owner + "/" + id);
      ref.once("value").then(snapshot => {
        const members = snapshot.val().members;
        firebase.database().ref("teams/" + owner + "/" + id).set({
          members: members.filter(existingMember => existingMember !== member)
        });
      });
    };

    this.delete = (owner, id) => {
      firebase.database().ref("teams/" + owner + "/" + id).remove();
    };

    this.dispose = () => {
      ref.off();
    }
  }
}
