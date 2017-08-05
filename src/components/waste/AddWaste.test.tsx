import * as React from "react";
import * as enzyme from "enzyme";
import * as sinon from "sinon";
import { AddWaste } from "./AddWaste";

test("Given no type, a description and a duration when render then the button is disabled", () => {
  const wrapper = enzyme.shallow(<AddWaste onAdd={() => {}} />);
  wrapper.setState({ type: null, description: "bar", duration: "baz" });
  expect(wrapper.find("button").getNode().props.disabled).toBeTruthy();
});

test("Given a type, no description and a duration when render then the button is disabled", () => {
  const wrapper = enzyme.shallow(<AddWaste onAdd={() => {}} />);
  wrapper.setState({ type: "foo", description: null, duration: "baz" });
  expect(wrapper.find("button").getNode().props.disabled).toBeTruthy();
});

test("Given a type, a description and no duration when render then the button is disabled", () => {
  const wrapper = enzyme.shallow(<AddWaste onAdd={() => {}} />);
  wrapper.setState({ type: "foo", description: "bar", duration: null });
  expect(wrapper.find("button").getNode().props.disabled).toBeTruthy();
});

test("Given a type, a description and a duration when render then the button is not disabled", () => {
  const wrapper = enzyme.shallow(<AddWaste onAdd={() => {}} />);
  wrapper.setState({ type: "foo", description: "bar", duration: "baz" });
  expect(wrapper.find("button").getNode().props.disabled).toBeFalsy();
});

test("Given a type, a description and a duration when click the button then onAdd is called with the correct parameters", () => {
  const onAdd = sinon.spy();
  const wrapper = enzyme.shallow(<AddWaste onAdd={onAdd} />);
  wrapper.setState({ type: "foo", description: "bar", duration: "baz" });
  wrapper.find("button").simulate("click");
  expect(onAdd.calledOnce).toBeTruthy();
  expect(onAdd.calledWithExactly("foo", "bar", "baz"));
});
