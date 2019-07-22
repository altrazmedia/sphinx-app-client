import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import Ink from "react-ink";


import { Button, Icon } from "../";

describe("Button component", () => {
  let wrapper, props;

  const buttonComponent = () => {
    if (!wrapper) {
      wrapper = shallow(<Button {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { };
  }

  beforeEach(resetWrapper);

  it("renders a button element", () => {
    expect(buttonComponent().type()).toBe("button");
  });

  describe("the button element", () => {

    const button = () => buttonComponent().find("button");

    it("has a suitable class name", () => {
      expect(button().hasClass("button")).toBe(true);
    });

    it("has class names based on props", () => {
      props.color = "error";
      props.variant = "text";
      props.size = "small";
      props.iconPosition = "left";
      props.className = "testClass";
      expect(button().hasClass("button--color-error")).toBe(true);
      expect(button().hasClass("button--variant-text")).toBe(true);
      expect(button().hasClass("button--size-small")).toBe(true);
      expect(button().hasClass("button--icon-position-left")).toBe(true);
      expect(button().hasClass("testClass")).toBe(true);
    });

    it("receives all the other props passed to the component", () => {
      props.disabled = true;
      props.testProp = "abc";
      expect(button().prop("disabled")).toBe(true);
      expect(button().prop("testProp")).toBe("abc");
    });

    it("renders the Ink component if `disabled` prop is not set to true", () => {
      expect(button().find(Ink).length).toBe(1);
      resetWrapper();
      
      props.disabled = true;
      expect(button().find(Ink).length).toBe(0);
    });

    it("renders the content of `content` or `children` prop if the `variant` is other than `icon`", () => {
      props.content = "test content";
      props.children = "test children";
      expect(button().render().text()).toBe("test content");
      resetWrapper();
      
      props.children = "test children";
      expect(button().render().text()).toBe("test children");
      resetWrapper();

      props.content = "test content";
      props.variant = "icon";
      expect(button().render().text()).toBeFalsy();
    });

    it("renders the Icon component if the `icon` prop is passed", () => {
      expect(button().find(Icon).length).toBe(0);
      resetWrapper();

      props.icon = "times";
      expect(button().find(Icon).length).toBe(1);
      expect(button().find(Icon).prop("name")).toBe("times");
      expect(button().find(Icon).prop("size")).toBe("small");
    });

    it("renders the content and Icon component in the order dependent on `iconPosition` prop", () => {
      props.icon = "iconName";
      props.content = "test content";
      props.iconPosition = "left";
      expect(button().children().at(0).type()).toBe(Icon);
      expect(button().children().at(1).text()).toBe("test content");
      resetWrapper();

      props.icon = "iconName";
      props.content = "test content";
      props.iconPosition = "right";
      expect(button().children().at(0).text()).toBe("test content");
      expect(button().children().at(1).type()).toBe(Icon);
    });

    it("is wrapped in the Link component if the `to` prop is passed", () => {
      expect(button().parent().length).toBe(0);
      resetWrapper();

      props.to = "/home";
      expect(button().parent().type()).toBe(Link);
      expect(button().parent().prop("to")).toBe("/home");
    });

  });

});