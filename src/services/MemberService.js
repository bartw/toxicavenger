import * as firebase from "firebase";
import Member from "../entities/Member";

export default class MemberService {
  constructor(team, onChanged) {
    const ref = firebase.database().ref("members/" + team);
    let members = [];
    let valueCallback;

    if (onChanged) {
      valueCallback = ref.on("value", snapshot => {
        const data = snapshot.val();
        const members = Member.parseMembers(data);
        onChanged(members);
      });
    }

    this.add = (uid, name) => {
      ref.child(uid).set({ name });
    };

    this.delete = uid => {
      ref.child(uid).remove();
    };

    this.dispose = () => {
      if (onChanged) {
        ref.off("value", valueCallback);
      }
    };
  }
}
