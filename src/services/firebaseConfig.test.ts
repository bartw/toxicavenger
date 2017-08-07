var FIREBASE_CONFIG;
import config from "./firebaseConfig";

test("Given a config then the correct parameters are present", () => {
  expect(config.apiKey).toBeTruthy();
  expect(config.authDomain).toBeTruthy();
  expect(config.databaseURL).toBeTruthy();
  expect(config.projectId).toBeTruthy();
})

test("Given a config when calling Object.isFrozen then returns true", () => {
  expect(Object.isFrozen(config)).toBeTruthy();
});
