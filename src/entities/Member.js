export default class Member {
  constructor(uid, name) {
    this.uid = uid;
    this.name = name;
    Object.freeze(this);
  }
}
