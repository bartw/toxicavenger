export default class Team {
  constructor(id, owner, name) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.isOwner = user => owner === user;
    Object.freeze(this);
  }
}
