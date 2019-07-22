import React from "react";
import { shallow } from "enzyme";

import Option from "./Option";

describe("Option component", () => {
  let wrapper, props;

  const option = () => {
    if (!wrapper) {
      wrapper = shallow(<Option {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { };
  }

  beforeEach(resetWrapper);

  it("renders a div", () => {
    expect(option().type()).toBe("div");
  });

  describe("the rendered div", () => {

    const div = () => option().first();

    it("has a suitable class name", () => {
      expect(div().hasClass("select__option")).toBe(true);
    });

    it("has a class name based on `isSelected` prop", () => {
      props.isSelected = false;
      expect(div().hasClass("select__option--selected")).toBe(false);
      resetWrapper();
      
      props.isSelected = true;
      expect(div().hasClass("select__option--selected")).toBe(true);
    });

    it("has a custom class name", () => {
      props.className = "testClass";
      expect(div().hasClass("testClass")).toBe(true);
    });

    it("receives all the other props passed to the component", () => {
      props.testProp = "abc";
      expect(div().prop("testProp")).toBe("abc");
    });

    it("renders the content of the `text` prop", () => {
      props.text = "Test text";
      expect(div().text()).toBe("Test text");
    });

  });

});