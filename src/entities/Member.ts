import * as _ from "lodash";

export default class Member {
  public uid: string;
  public name: string;
  
  constructor(uid: string, name: string) {
    this.uid = uid;
    this.name = name;
    Object.freeze(this);
  }

  static parseMembers(data: any) {
    if (!data) {
      return [];
    }
    const members = _(data)
      .keys()
      .map(uid => new Member(uid, data[uid].name))
      .value();
    return members;
  }
}
