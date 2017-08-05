export default class Request {
  public id: string;
  public userId: string;
  public userName: string;
  
  constructor(id, userId, userName) {
    this.id = id;
    this.userId = userId;
    this.userName = userName;
    Object.freeze(this);
  }
}
