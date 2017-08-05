import Member from "./Member";

const createMember = () => new Member("uid", "name");

test("Given a member when calling Object.isFrozen then returns true", () => {
  const member = createMember();
  expect(Object.isFrozen(member)).toBeTruthy();
});

test("Given an empty json when ParseMembers then an empty list is returned", () => {
  const data = {};
  expect(Member.parseMembers(data)).toEqual([]);
});

test("Given members as json data when ParseMembers then a list of members is returned", () => {
  const data = {
    member1Id: {
      name: "member1Name"
    },
    member2Id: {
      name: "member2Name"
    }
  };
  expect(Member.parseMembers(data)).toEqual([
    new Member("member1Id", "member1Name"),
    new Member("member2Id", "member2Name")
  ]);
});
