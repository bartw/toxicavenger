import * as firebase from "firebase";

export default class SprintService {
  constructor(team, onChanged) {
    const ref = firebase.database().ref("sprints/" + team);
    let sprints = [];

    if (onChanged) {
      ref.on("child_added", data => {
        const newSprint = {
          id: data.key,
          name: data.val().name
        };
        sprints = [newSprint, ...sprints];
        onChanged(sprints);
      });

      ref.on("child_removed", data => {
        sprints = sprints.filter(sprint => sprint.id !== data.key);
        onChanged(sprints);
      });
    }

    this.add = (name) => {
      ref.push({ name });
    };

    this.delete = id => {
      ref.child(id).remove();
    };

    this.dispose = () => {
      if (onChanged) {
        ref.off();
      }
    };
  }
}
