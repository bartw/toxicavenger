import _ from "lodash";

export default class Team {
  constructor(id, owner, name) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.isOwner = user => owner === user;
    Object.freeze(this);
  }

  static parseTeams(data) {
    const owners = _(data).keys().value();
      const teams = _(owners).map(owner => {
        const ownerTeams = _(data[owner]).keys().value();
        return _(ownerTeams).map(ownerTeam => {
          return new Team(ownerTeam, owner, data[owner][ownerTeam].name);
        }).value();
      }).flatten().value();
      return teams;
  }
}
