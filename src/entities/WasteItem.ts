export default class WasteItem {
  public id: string;
  public userId: string;
  public userName: string;
  public type: string;
  public description: string;
  public duration: number;

  constructor(id: string, userId: string, userName: string, type: string, description: string, duration: string) {
    this.id = id;
    this.userId = userId;
    this.userName = userName;
    this.type = type;
    this.description = description;
    this.duration = parseFloat(duration);
    Object.freeze(this);
  }
}
