export default class Sprint {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    Object.freeze(this);
  }
}
