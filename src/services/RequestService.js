import * as firebase from "firebase";
import Request from "../entities/Request";

export default class RequestService {
  constructor(team, onChanged) {
    const ref = firebase.database().ref("requests/" + team);
    let requests = [];
    let addedCallback;
    let removedCallback;

    if (onChanged) {
      addedCallback = ref.on("child_added", data => {
        const newRequest = new Request(
          data.key,
          data.val().userId,
          data.val().userName
        );
        requests = [newRequest, ...requests];
        onChanged(requests);
      });

      removedCallback = ref.on("child_removed", data => {
        requests = requests.filter(request => request.id !== data.key);
        onChanged(requests);
      });
    }

    this.add = (userId, userName) => {
      ref.push({ userId: userId, userName });
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
