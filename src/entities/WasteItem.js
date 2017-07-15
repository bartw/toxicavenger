export default class WasteItem {
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
