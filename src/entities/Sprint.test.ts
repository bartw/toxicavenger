import Sprint from "./Sprint";

const createSprint = () =>
  new Sprint("id", "nName");

test("Given a sprint when calling Object.isFrozen then returns true", () => {
  const sprint = createSprint();
  expect(Object.isFrozen(sprint)).toBeTruthy();
});
