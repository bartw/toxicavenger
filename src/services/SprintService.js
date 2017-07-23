import * as firebase from "firebase";
import Sprint from "../entities/Sprint";

export default class SprintService {
  constructor(team, onChanged) {
    const ref = firebase.database().ref("sprints/" + team);
    let sprints = [];
    let addedCallback;
    let removedCallback;

    if (onChanged) {
      addedCallback = ref.on("child_added", data => {
        const newSprint = new Sprint(data.key, data.val().name);
        sprints = [newSprint, ...sprints];
        onChanged(sprints);
      });

      removedCallback = ref.on("child_removed", data => {
        sprints = sprints.filter(sprint => sprint.id !== data.key);
        onChanged(sprints);
      });
    }

    this.add = name => {
      ref.push({ name });
    };

    this.delete = id => {
      ref.child(id).remove();
    };

    this.dispose = () => {
      if (onChanged) {
        ref.off("child_added", addedCallback);
        ref.off("child_removed", removedCallback);
      }
    };
  }
}
