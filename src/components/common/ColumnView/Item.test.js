import React from "react";
import { shallow } from "enzyme";

import ColumnViewItem from "./Item";

describe("ColumnViewItem component", () => {
  let wrapper, props;

  const columnViewItem = () => {
    if (!wrapper) {
      wrapper = shallow(<ColumnViewItem {...props} />);
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
      columnViewItem()
        .first()
        .type()
    ).toBe("div");
  });

  describe("the rendered div", () => {
    const div = () => columnViewItem().first();

    it("has a suitable class name", () => {
      expect(div().hasClass("column-view__item")).toBe(true);
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

    it("renders 2 divs", () => {
      expect(div().children().length).toBe(2);
      expect(
        div()
          .children()
          .at(0)
          .type()
      ).toBe("div");
      expect(
        div()
          .children()
          .at(1)
          .type()
      ).toBe("div");
    });

    describe("the 1st div", () => {
      const div1 = () =>
        div()
          .children()
          .first();

      it("has a suitable class name", () => {
        expect(div1().hasClass("column-view__name")).toBe(true);
      });

      it("renders whats passed in `name` prop", () => {
        props.name = <p>test name</p>;
        expect(
          div1()
            .children()
            .equals(<p>test name</p>)
        ).toBe(true);
      });
    });

    describe("the 2nd div", () => {
      const div2 = () =>
        div()
          .children()
          .at(1);

      it("has a suitable class name", () => {
        expect(div2().hasClass("column-view__value")).toBe(true);
      });

      it("renders whats passed in `value` prop", () => {
        props.value = <p>test value</p>;
        expect(
          div2()
            .children()
            .equals(<p>test value</p>)
        ).toBe(true);
      });
    });
  });
});
