import React from "react";
import { shallow } from "enzyme";

import Icon from "./Icon"

describe("Icon component", () => {
  let wrapper, props;

  const icon = () => {
    if (!wrapper) {
      wrapper = shallow(<Icon {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { name: "abc" };
  }


  beforeEach(resetWrapper);

  it("renders an `i` element", () => {
    expect(icon().type()).toBe("i");
  });

  describe("the `i` element", () => {

    it("has suitable a class name", () => {
      expect(icon().hasClass("icon")).toBe(true);
    });

    it("has a custom class name", () => {
      expect(icon().hasClass("testClass")).toBe(false);
      resetWrapper();
      props.className = "testClass";
      expect(icon().hasClass("testClass")).toBe(true);
    });

    it("has the FontAwesome class name", () => {
      expect(icon().hasClass("fas")).toBe(true);
    });

    it("has class names based on props", () => {
      props.name = "testName";
      props.size = "big";
      props.color = "error";
      
      expect(icon().hasClass("fa-testName")).toBe(true);
      expect(icon().hasClass("icon--size-big")).toBe(true);
      expect(icon().hasClass("icon--color-error")).toBe(true);
    })

  })


})