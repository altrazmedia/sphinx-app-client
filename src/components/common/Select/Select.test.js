import React from "react";
import { shallow } from "enzyme";

import Select from "./Select";
import Option from "./Option";
import { Icon } from "../";

describe("Select component", () => {
  let wrapper, props;

  const select = () => {
    if (!wrapper) {
      wrapper = shallow(<Select {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { };
  }

  beforeEach(resetWrapper);

  it("renders a div", () => {
    expect(select().first().type()).toBe("div");
  });

  describe("the rendered div", () => {

    const div = () => select().first();

    it("has a suitable class name", () => {
      expect(div().hasClass("select")).toBe(true);
    });

    it("has a class based on `fullWidth` prop", () => {
      expect(div().hasClass("select--fullWidth")).toBe(false);
      resetWrapper();
      
      props.fullWidth = true;
      expect(div().hasClass("select--fullWidth")).toBe(true);
    });

    it("has a class based on `isOpen` state value", () => {
      expect(div().hasClass("select--open")).toBe(false);
      select().setState({ isOpen: true });
      expect(div().hasClass("select--open")).toBe(true);
    });

    it("has a class based on `isActive` state value", () => {
      expect(div().hasClass("select--active")).toBe(false);
      select().setState({ isActive: true });
      expect(div().hasClass("select--active")).toBe(true);
    });

    it("has a tabIndex set to `0`", () => {
      expect(div().prop("tabIndex")).toBe(0);
    });

    it("receives all the other props passed to the component", () => {
      props.testProp = "abc";
      expect(div().prop("testProp")).toBe("abc");
    });

    it("sets the `isOpen` and `isActive` state values to `false` after blur event", () => {
      select().setState({ isOpen: true, isActive: true });
      div().simulate("blur");
      expect(select().state("isOpen")).toBe(false);
      expect(select().state("isActive")).toBe(false);
    });

    it("sets the `isActive` state value to `true` after focus event", () => {
      div().simulate("focus");
      expect(select().state("isActive")).toBe(true);
    })

    it("toggles the `isOpen` state value on space bar click and prevents the event's default behavior", () => {
      const mock = jest.fn();
      select().setState({ isOpen: true });
      div().simulate("keydown", { keyCode: 32, preventDefault: mock });
      expect(select().state("isOpen")).toBe(false);
      expect(mock).toBeCalledTimes(1);
    });

    it("renders a header div", () => {
      expect(div().find("div.select__header").length).toBe(1);
    });

    describe("the header div", () => {

      const header = () => div().find("div.select__header");

      it("renders the Icon component with a suitable class name and the `name` prop based on `isOpen` state value", () => {
        expect(header().find(Icon).length).toBe(1);
        expect(header().find(Icon).prop("className")).toBe("select__icon");
        expect(header().find(Icon).prop("name")).toBe("caret-down");
        select().setState({ isOpen: true });
        expect(header().find(Icon).prop("name")).toBe("caret-up");
      });

      it("renders an empty span if the `value` and `placeholder` props are not provided", () => {
        expect(header().find("span").length).toBe(1);
        expect(header().find("span").text()).toBeFalsy();
      });

      it("renders the `placeholder` into a span if there is no `value` provided or if value doesn't suit any option", () => {
        props.placeholder = "test placeholder";
        expect(header().find("span").length).toBe(1);
        expect(header().find("span").text()).toBe("test placeholder");
        expect(header().find("span").hasClass("select__placeholder")).toBe(true);
        resetWrapper();

        props.options = [
          { value: "1", text: "one" },
          { value: "2", text: "two" }
        ];
        props.value = "3";
        props.placeholder = "test placeholder";
        expect(header().find("span").length).toBe(1);
        expect(header().find("span").text()).toBe("test placeholder");
      });

      it("renders the selected option's `text` prop", () => {
        props.placeholder = "test placeholder";
        props.options = [
          { value: "1", text: "one" },
          { value: "2", text: "two" }
        ];
        props.value = "2";

        expect(header().render().text()).toBe("two");
      });

    });

    it("renders the options wrapper div", () => {
      expect(div().find("div.select__options").length).toBe(1);
    });

    describe("the options wrapper div", () => {

      const optionsWrapper = () => div().find("div.select__options");
      const options = [
        { value: "1", text: "one" },
        { value: "2", text: "two" }
      ];

      beforeEach(() => props.options = options);

      it("renders the Option component for every element in `options` prop arary", () => {
        expect(optionsWrapper().find(Option).length).toBe(2);
      });

      it("sets `isSelected` prop to the option which value is equal to `value` prop", () => {
        props.value = "1";
        expect(optionsWrapper().find(Option).at(0).prop("isSelected")).toBe(true);
        expect(optionsWrapper().find(Option).at(1).prop("isSelected")).toBe(false);
      });

      it("passes the handleOptionClick function as a `onClick` prop with option object as a argument", () => {
        const mock = jest.fn();
        select().instance().handleOptionClick = mock;
        optionsWrapper().find(Option).at(0).prop("onClick")();
        expect(mock).toBeCalledTimes(1);
        expect(mock).toBeCalledWith(options[0]);
      });

      it("spreads all the keys from `option` object as props", () => {
        Object.keys(options[0]).forEach(key => {
          expect(optionsWrapper().find(Option).at(0).prop(key)).toBe(options[0][key])
        });
      });

    });

  });

  describe("the handleOptionClick method", () => {

    it("calls the `onChange` function from props and passes the option value as a argument", () => {
      const onChange = jest.fn();
      props.onChange = onChange;
      select().instance().handleOptionClick({ value: "1", text: "one" });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith("1");
    });

    it("sets the `isOpen` state value to `false`", () => {
      select().setState({ isOpen: true });
      select().instance().handleOptionClick();
      expect(select().state("isOpen")).toBe(false);
    });

  });

});