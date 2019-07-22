import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import Ink from "react-ink";

import { Icon, FAB } from "../"

describe("FAB component", () => {
  let wrapper, props;

  const fab = () => {
    if (!wrapper) {
      wrapper = shallow(<FAB {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { icon: "iconName" };
  }


  beforeEach(resetWrapper);

  it("renders a button", () => {
    expect(fab().find("button").length).toBe(1);
  });

  describe("the rendered button", () => {
    const button = () => fab().find("button");

    it("has a suitable class name", () => {
      expect(button().hasClass("fab")).toBe(true);
    });

    it("receives all the other props passed to the component", () => {
      props.testProp = "abc";
      expect(button().prop("testProp")).toBe("abc");
    });

    it("renders the Icon component with `icon` prop passed as a `name` and other proper props", () => {
      expect(button().find(Icon).length).toBe(1);
      expect(button().find(Icon).prop("name")).toBe("iconName");
      expect(button().find(Icon).prop("color")).toBe("inverted");
      expect(button().find(Icon).prop("size")).toBe("small");
    });

    it("renders the Ink component", () => {
      expect(button().find(Ink).length).toBe(1);
      expect(button().find(Ink).prop("radius")).toBe(80);
    });

    it("is wrapped the Link component if the `to` prop is passed", () => {
      expect(button().parent().length).toBe(0);
      resetWrapper();

      props.to = "/";
      expect(button().parent().type()).toBe(Link);
      expect(button().parent().prop("to")).toBe("/");
    });

  });

});