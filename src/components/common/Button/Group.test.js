import React from "react";
import { shallow } from "enzyme";

import Group from "./Group";

describe("ButtonGroup component", () => {
  let wrapper, props;

  const group = () => {
    if (!wrapper) {
      wrapper = shallow(<Group {...props} />);
    }
    return wrapper;
  };

  const resetWrapper = () => {
    wrapper = undefined;
    props = {};
  };

  beforeEach(resetWrapper);

  it("renders a div", () => {
    expect(group().type()).toBe("div");
  });

  describe("the rendered div", () => {
    const div = () => group().first();

    it("has a suitable class name", () => {
      expect(div().hasClass("buttons-group")).toBe(true);
    });

    it("has class names based on props", () => {
      props.align = "center";
      props.className = "testClass";

      expect(div().hasClass("buttons-group--align-center")).toBe(true);
      expect(div().hasClass("testClass")).toBe(true);
    });

    it("receives all the other props passed to the component", () => {
      props.children = "test children";
      props.testProp = "abc";

      expect(div().prop("children")).toBe("test children");
      expect(div().prop("testProp")).toBe("abc");
    });
  });
});
