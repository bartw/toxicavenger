import * as firebase from "firebase";
import _ from "lodash";

function mapTeams(snapshot) {
  return _(snapshot.val())
    .mapValues((teams, uid) =>
      _(teams)
        .mapValues((team, id) => _.merge({}, team, { id }, { uid }))
        .values()
        .value()
    )
    .values()
    .flatten()
    .value();
}

export default class TeamService {
  constructor(onChanged) {
      firebase.database().ref("teams").on("value", snapshot => {
        onChanged(mapTeams(snapshot));
      });

    this.add = (uid, name) => {
      if (!uid || !name) {
        return;
      }
      firebase.database().ref("teams/" + uid).push({ name: name });
    };

    this.delete = (uid, id) => {
      firebase.database().ref("teams/" + uid + "/" + id).remove();
    };
  }
}
