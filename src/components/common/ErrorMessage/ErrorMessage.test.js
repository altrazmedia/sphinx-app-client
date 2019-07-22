import React from "react";
import { shallow } from "enzyme";

import { Icon, ErrorMessage } from "../"

describe("ErrorMessage component", () => {
  let wrapper, props;

  const errorMessage = () => {
    if (!wrapper) {
      wrapper = shallow(<ErrorMessage {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { };
  }


  beforeEach(resetWrapper);

  
  describe("when `content` prop is not provided", () => {

    it("renders `null`", () => {
      expect(errorMessage().type()).toBe(null);
    })

  })


  describe("when `content` prop is provided", () => {

    const content = <p>test</p>;

    beforeEach(() => {
      props.content = content;
    })

    
    it("render a div", () => {
      expect(errorMessage().first().type()).toBe("div");
    });

    describe("the rendered div", () => {

      const div = () => errorMessage().first();

      it("has a suitable class name", () => {
        expect(div().hasClass("error-message")).toBe(true);
      });

      it("has a class name based on `fullWidth` prop", () => {
        props.fullWidth = true;
        expect(div().hasClass("error-message--fullWidth")).toBe(true);
      });

      it("renders a custom class name", () => {
        props.className = "test-class";
        expect(div().hasClass("test-class")).toBe(true);
      })

      it("receives all the other props passed to the component", () => {
        props.test = "abc";
        expect(div().prop("test")).toBe("abc");
      });

      it("renders the `Icon` component and passes proper props to it", () => {
        expect(div().find(Icon).length).toBe(1);
        expect(div().find(Icon).prop("color")).toBe("inverted");
        expect(div().find(Icon).prop("name")).toBe("exclamation-triangle");
        expect(div().find(Icon).prop("className")).toBe("error-message__icon");
      });

      it("renders whats passed as `content` prop", () => {
        expect(div().children().at(1).equals(content)).toBeTruthy();
      })

    })

  })


})