export default class Sprint {
  public id: string;
  public name: string;

  constructor(id, name) {
    this.id = id;
    this.name = name;
    Object.freeze(this);
  }
}
