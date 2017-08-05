export default class Sprint {
  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    Object.freeze(this);
  }
}
