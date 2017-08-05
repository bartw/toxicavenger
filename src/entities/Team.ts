import * as _ from "lodash";

export default class Team {
  public id: string;
  public owner: string;
  public name: string;

  public constructor(id: string, owner: string, name: string) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    Object.freeze(this);
  }

  public isOwner(user: string) {
    return this.owner === user;
  }

  public static parseTeams(data: any) {
    const owners = _(data).keys().value();
    const teams = _(owners)
      .map(owner => {
        const ownerTeams = _(data[owner]).keys().value();
        return _(ownerTeams)
          .map(ownerTeam => {
            return new Team(ownerTeam, owner, data[owner][ownerTeam].name);
          })
          .value();
      })
      .flatten()
      .value();
    return teams;
  }
}
