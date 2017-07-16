import _ from "lodash";

export default class Member {
  constructor(uid, name) {
    this.uid = uid;
    this.name = name;
    Object.freeze(this);
  }

  static parseMembers(data) {
    if (!data) {
      return [];
    }
    const members = _(data).keys().map(uid => new Member(uid, data[uid].name)).value();
    return members;
  }
}
