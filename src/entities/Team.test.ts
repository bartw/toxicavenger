import {} from "jest";
import Team from "./Team";

const createTeam = () => new Team("id", "owner", "name");
const areTeamsEqual = (team1, team2) =>
  team1.id === team2.id &&
  team1.owner === team2.owner &&
  team1.name === team2.name;

test("Given a team when calling Object.isFrozen then returns true", () => {
  const team = createTeam();
  expect(Object.isFrozen(team)).toBeTruthy();
});

test("Given an empty json when ParseTeams then an empty list is returned", () => {
  const data = {};
  expect(Team.parseTeams(data)).toEqual([]);
});

test("Given teams as json data when ParseTeams then a list of teams is returned", () => {
  const data = {
    owner1Id: {
      team1Id: {
        name: "team1Name"
      }
    },
    owner2Id: {
      team2Id: {
        name: "team2Name"
      }
    }
  };

  const teams = Team.parseTeams(data);

  expect(teams).toHaveLength(2);
  expect(
    areTeamsEqual(teams[0], new Team("team1Id", "owner1Id", "team1Name"))
  ).toBeTruthy();
  expect(
    areTeamsEqual(teams[1], new Team("team2Id", "owner2Id", "team2Name"))
  ).toBeTruthy();
});

test("Given a team and a userId when the owner of the team is not that userId then isOwner returns false", () => {
    var team = new Team("teamId", "ownerId", "teamName")
    expect(team.isOwner("otherId")).toBeFalsy();
})

test("Given a team and a userId when the owner of the team is that userId then isOwner returns true", () => {
    var team = new Team("teamId", "ownerId", "teamName")
    expect(team.isOwner("ownerId")).toBeTruthy();
})