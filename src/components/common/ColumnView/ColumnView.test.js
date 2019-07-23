import React from "react";
import { shallow } from "enzyme";

import ColumnView from "./ColumnView";

describe("ColumnView component", () => {
  let wrapper, props;

  const columnView = () => {
    if (!wrapper) {
      wrapper = shallow(<ColumnView {...props} />);
    }
    return wrapper;
  };

  const resetWrapper = () => {
    wrapper = undefined;
    props = {};
  };

  beforeEach(resetWrapper);

  it("renders a div", () => {
    expect(
      columnView()
        .first()
        .type()
    ).toBe("div");
  });

  describe("the rendered div", () => {
    const div = () => columnView().first();

    it("has a suitable class name", () => {
      expect(div().hasClass("column-view")).toBe(true);
    });

    it("renders a custom class name", () => {
      expect(div().hasClass("test")).toBe(false);
      resetWrapper();
      props.className = "test";
      expect(div().hasClass("test")).toBe(true);
    });

    it("receives all the other props passed to the component", () => {
      expect(div().prop("testProp")).toBeFalsy();
      resetWrapper();
      props.testProp = "abc";
      expect(div().prop("testProp")).toBe("abc");
    });

    it("renders whats passed in `children` prop", () => {
      props.children = <p>abc</p>;
      expect(
        div()
          .children()
          .equals(<p>abc</p>)
      ).toBe(true);
    });
  });
});
