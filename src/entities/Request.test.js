import Request from "./Request";

const createRequest = () =>
  new Request("id", "uid", "userName");

test("Given a request when calling Object.isFrozen then returns true", () => {
  const request = createRequest();
  expect(Object.isFrozen(request)).toBeTruthy();
});
