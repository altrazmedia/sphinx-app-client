import React from "react";
import { shallow } from "enzyme";

import Loader from "./";

describe("Input component", () => {
  let wrapper, props;

  const loader = () => {
    if (!wrapper) {
      wrapper = shallow(<Loader {...props} />);
    }
    return wrapper;
  };

  const resetWrapper = () => {
    wrapper = undefined;
    props = {};
  };

  beforeEach(resetWrapper);

  it("renders a div", () => {
    expect(loader().type()).toBe("div");
  });

  describe("the rendered div", () => {
    it("has a suitable class name", () => {
      expect(loader().hasClass("loader")).toBe(true);
    });

    it("has a custom class name", () => {
      props.className = "testClass";
      expect(loader().hasClass("testClass")).toBe(true);
    });

    it("receives all the other props passed to the component", () => {
      props.testProp = "abc";
      expect(
        loader()
          .first()
          .prop("testProp")
      ).toBe("abc");
    });

    it("renders a `preloader` div which renders exactly 10 divs", () => {
      expect(loader().find(".loader__preloader").length).toBe(1);
      expect(
        loader()
          .find(".loader__preloader")
          .children().length
      ).toBe(10);
      expect(
        loader()
          .find(".loader__preloader")
          .children()
          .find("div").length
      ).toBe(10);
    });
  });
});
