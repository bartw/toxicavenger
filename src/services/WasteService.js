import * as firebase from "firebase";

export default class WasteService {
  constructor(team, sprint, onChanged) {
    const ref = firebase.database().ref("waste/" + team + "/" + sprint);
    let waste = [];

    if (onChanged) {
      ref.on("child_added", data => {
        const newWaste = {
          id: data.key,
          description: data.val().description,
          duration: data.val().duration
        };
        waste = [newWaste, ...waste];
        onChanged(waste);
      });

      ref.on("child_removed", data => {
        waste = waste.filter(item => item.id !== data.key);
        onChanged(waste);
      });
    }

    this.add = (description, duration) => {
      ref.push({ description, duration });
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
