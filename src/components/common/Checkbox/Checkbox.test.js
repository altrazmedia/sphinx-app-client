import React from "react";
import { shallow, mount } from "enzyme";

import Checkbox from "./Checkbox";

describe("Checkbox component", () => {
  let wrapper, props;

  const checkbox = () => {
    if (!wrapper) {
      wrapper = shallow(<Checkbox {...props} />);
    }
    return wrapper;
  };

  const resetWrapper = () => {
    wrapper = undefined;
    props = {};
  };

  beforeEach(resetWrapper);

  it("renders a div", () => {
    expect(checkbox().type()).toBe("div");
  });

  describe("the rendered div", () => {
    const div = () => checkbox().first();

    it("has a suitable class name", () => {
      expect(div().hasClass("checkbox")).toBe(true);
    });

    it("has a custom class name", () => {
      props.className = "testClass";
      expect(div().hasClass("testClass")).toBe(true);
    });

    it("has class names based on `checked` and `disabled` props", () => {
      props.checked = false;
      props.disabled = false;
      expect(div().hasClass("checkbox--checked")).toBe(false);
      expect(div().hasClass("checkbox--disabled")).toBe(false);
      resetWrapper();

      props.checked = true;
      props.disabled = true;
      expect(div().hasClass("checkbox--checked")).toBe(true);
      expect(div().hasClass("checkbox--disabled")).toBe(true);
    });

    it("has a class name based on `isActive` state value", () => {
      expect(div().hasClass("checkbox--active")).toBe(false);
      checkbox().setState({ isActive: true });
      expect(div().hasClass("checkbox--active")).toBe(true);
    });

    it("has a `tabIndex` set to `0`", () => {
      expect(div().prop("tabIndex")).toBe(0);
    });

    it("receives all the other props passed to the component", () => {
      props.testProp = "abc";
      expect(div().prop("testProp")).toBe("abc");
    });

    it("toggles the `isActive` state value on blur and focus events", () => {
      div().simulate("focus");
      expect(checkbox().state("isActive")).toBe(true);
      div().simulate("blur");
      expect(checkbox().state("isActive")).toBe(false);
    });

    it("calls the `click` function on inputRef when space bar is pressed and prevents default browser behavior", () => {
      const prevent = jest.fn();
      const onChange = jest.fn();
      const click = jest.fn();

      props.onChange = onChange;
      checkbox().instance().inputRef = { click };

      div().simulate("keydown", { preventDefault: prevent, keyCode: 32 });

      expect(click).toBeCalledTimes(1);
      expect(prevent).toBeCalledTimes(1);
    });

    it("renders a label element", () => {
      expect(div().find("label").length).toBe(1);
    });

    describe("the label element", () => {
      const label = () => div().find("label");

      it("has a suitable class name", () => {
        expect(label().hasClass("checkbox__label")).toBe(true);
      });

      it("renders the content of the `label` prop", () => {
        props.label = "test label";
        expect(label().text()).toBe("test label");
      });
    });

    it("renders an input element", () => {
      expect(div().find("input").length).toBe(1);
    });

    describe("the input element", () => {
      const input = () => div().find("input");

      it("has a suitable class name", () => {
        expect(input().hasClass("checkbox__input")).toBe(true);
      });

      it("receives the `disabled` and `onChange` props", () => {
        props.disabled = false;
        props.onChange = () => {};
        expect(input().prop("disabled")).toBe(false);
        expect(input().prop("onChange")).toBe(props.onChange);
        resetWrapper();

        props.disabled = true;
        expect(input().prop("disabled")).toBe(true);
      });

      it("has the `id` equal to label's `htmlFor`", () => {
        expect(input().prop("id")).toBe(
          div()
            .find("label")
            .prop("htmlFor")
        );
      });

      it("has the `type` set to `checkbox`", () => {
        expect(input().prop("type")).toBe("checkbox");
      });

      it("saves the ref in `inputRef`", () => {
        const wrapper = mount(<Checkbox {...props} />);
        expect(wrapper.instance().inputRef.id).toBe(
          wrapper.find("input").prop("id")
        );
        wrapper.unmount();
      });
    });
  });
});
