export default class Request {
  constructor(id, userId, userName) {
    this.id = id;
    this.userId = userId;
    this.userName = userName;
    Object.freeze(this);
  }
}
