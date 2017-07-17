import WasteItem from "./WasteItem";

const createWasteItem = () =>
  new WasteItem(1, "uid", "username", "type", "description", 1.5);

test("Given a waste item when calling Object.isFrozen then returns true", () => {
  const wasteItem = createWasteItem();
  expect(Object.isFrozen(wasteItem)).toBeTruthy();
});