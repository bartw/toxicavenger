export default class WasteItem {
  public id: string;
  public userId: string;
  public userName: string;
  public type: string;
  public description: string;
  public duration: number;

  constructor(id, userId, userName, type, description, duration) {
    this.id = id;
    this.userId = userId;
    this.userName = userName;
    this.type = type;
    this.description = description;
    this.duration = parseFloat(duration);
    Object.freeze(this);
  }
}
