import {database} from "firebase";
import WasteItem from "../entities/WasteItem";

export default class WasteService {
  constructor(team, sprint, onChanged) {
    const ref = database().ref("waste/" + team + "/" + sprint);
    let waste = [];
    let addedCallback;
    let removedCallback;

    if (onChanged) {
      addedCallback = ref.on("child_added", data => {
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

      removedCallback = ref.on("child_removed", data => {
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
        ref.off("child_added", addedCallback);
        ref.off("child_removed", removedCallback);
      }
    };
  }
}
