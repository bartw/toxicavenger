import * as firebase from "firebase";
import Member from "../entities/Member";

export default class MemberService {
  constructor(team, onChanged) {
    const ref = firebase.database().ref("members/" + team);
    let members = [];

    if (onChanged) {
      ref.on("child_added", data => {
        const newMember = new Member(data.key, data.val().name);
        members = [newMember, ...members];
        onChanged(members);
      });

      ref.on("child_removed", data => {
        members = members.filter(member => member.uid !== data.key);
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
        ref.off();
      }
    };
  }
}
