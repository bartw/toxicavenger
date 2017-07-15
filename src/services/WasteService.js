import * as firebase from "firebase";
import WasteItem from "../entities/WasteItem";

export default class WasteService {
  constructor(team, sprint, onChanged) {
    const ref = firebase.database().ref("waste/" + team + "/" + sprint);
    let waste = [];

    if (onChanged) {
      ref.on("child_added", data => {
        const newWaste = new WasteItem(
          data.key,
          data.val().userId,
          data.val().userName,
          data.val().type,
          data.val().description,
          data.val().duration
        );
        waste = [newWaste, ...waste];
        onChanged(waste);
      });

      ref.on("child_removed", data => {
        waste = waste.filter(item => item.id !== data.key);
        onChanged(waste);
      });
    }

    this.add = (userId, userName, type, description, duration) => {
      ref.push({
        userId,
        userName,
        type,
        description,
        duration: parseFloat(duration).toFixed(1)
      });
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
