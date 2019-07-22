import React from "react";
import { shallow } from "enzyme";

import { Icon, Input } from "../"

describe("Input component", () => {
  let wrapper, props;

  const input = () => {
    if (!wrapper) {
      wrapper = shallow(<Input {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { };
  }

  beforeEach(resetWrapper);

  it("renders a div", () => {
    expect(input().type()).toBe("div");
  });

  describe("the rendered div", () => {

    it("has a suitable class name", () => {
      expect(input().hasClass("input")).toBe(true);
    });

    it("has classes based on props", () => {
      expect(input().hasClass("input--fullWidth")).toBe(false);
      expect(input().hasClass("input--error")).toBe(false);
      resetWrapper();
      props.error = true;
      props.fullWidth = true;
      expect(input().hasClass("input--fullWidth")).toBe(true);
      expect(input().hasClass("input--error")).toBe(true);
    });

    it("has a class based on `isActive` state value", () => {
      expect(input().hasClass("input--active")).toBe(false);
      input().setState({ isActive: true });
      expect(input().hasClass("input--active")).toBe(true);
    });

    
    describe("icon wrapper", () => {

      const iconWrapper = () => input().find(".input__icon-wrapper");

      it("is rendered as a div if the `icon` prop is passed", () => {
        props.icon = "testIcon";
        expect(iconWrapper().length).toBe(1);
      });

      it("renders the Icon component with `icon` prop value passed as the `name` prop and a suitable class name", () => {
        props.icon = "testIcon";
        expect(iconWrapper().find(Icon).length).toBe(1);
        expect(iconWrapper().find(Icon).prop("className")).toBe("input__icon");
        expect(iconWrapper().find(Icon).prop("name")).toBe("testIcon");
      });

      it("is not rendered if the `icon` prop is not passed", () => {
        props.icon = undefined;
        expect(iconWrapper().length).toBe(0);
      });

    });

    describe("error message", () => {

      const errorMessage = () => input().find(".input__error");

      it("is rendered as a span if the `error` prop is a not empty string", () => {
        props.error = "testError";
        expect(errorMessage().length).toBe(1);
        expect(errorMessage().type()).toBe("span");
      });

      it("renders the content of the `error` prop", () => {
        props.error = "testError";
        expect(errorMessage().text()).toBe("testError");
      });

      it("is not rendered if the `error` prop is not passed or is empty", () => {
        props.error = undefined;
        expect(errorMessage().length).toBe(0);
        resetWrapper();
        props.error = "";
        expect(errorMessage().length).toBe(0);
      });

    });

    describe("input element", () => {

      const inputElement = () => input().find("input");

      it("is rendered with a suitable class name", () => {
        expect(inputElement().hasClass("input__input")).toBe(true);
      });

      it("receives all the others props passed to the component", () => {
        props.testProp = "abc";
        expect(inputElement().prop("testProp")).toBe("abc");
      });

      it("changes `isActive` state value to `true` after the focus event", () => {
        expect(input().state("isActive")).toBe(false);
        inputElement().simulate("focus");
        expect(input().state("isActive")).toBe(true);
      });

      it("changes `isActive` state value to `false` after the blur event", () => {
        input().setState({ isActive: true });
        inputElement().simulate("blur");
        expect(input().state("isActive")).toBe(false);
      });

    });

  });


});