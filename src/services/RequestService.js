import * as firebase from "firebase";

export default class RequestService {
  constructor(team, onChanged) {
    const ref = firebase.database().ref("requests/" + team);
    let requests = [];

    ref.on("child_added", data => {
      const newRequest = {
        id: data.key,
        member: data.val().member,
        name: data.val().name
      };
      requests = [newRequest, ...requests];
      onChanged(requests);
    });

    ref.on("child_removed", data => {
      requests = requests.filter(request => request.id !== data.key);
      onChanged(requests);
    });

    this.add = (member, name) => {
      ref.push({ member: member, name });
    };

    this.delete = id => {
      ref.child(id).remove();
    };

    this.dispose = () => {
      ref.off();
    };
  }
}
