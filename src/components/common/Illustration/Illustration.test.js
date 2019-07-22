import React from "react";
import { shallow } from "enzyme";

import Illustration from "./Illustration"
import * as svgImages from "images/svgImages";
import { Trans } from "react-i18next";

describe("Illustration component", () => {
  let wrapper, props;

  const illustration = () => {
    if (!wrapper) {
      wrapper = shallow(<Illustration {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { };
  }


  beforeEach(resetWrapper);

  
  it("renders a div", () => {
    expect(illustration().type()).toBe("div");
  });

  describe("the rendered div", () => {
    it("has suitable a class name", () => {
      expect(illustration().hasClass("illustration")).toBe(true);
    });

    it("has a custom class name", () => {
      expect(illustration().hasClass("testClass")).toBe(false);
      resetWrapper();
      props.className = "testClass";
      expect(illustration().hasClass("testClass")).toBe(true);
    });

    it("receives all the other props passed to the component", () => {
      expect(illustration().first().prop("testProp")).toBeFalsy();
      resetWrapper();
      props.testProp = "abc";
      expect(illustration().first().prop("testProp")).toBe("abc");
    });

    describe("image element", () => {

      const image = () => illustration().children().first();

      it("is rendered as svg if a valid `variant` prop is passed", () => {
        props.variant = "empty";
        expect(image().type()).toBe(svgImages.empty);
      });

      it("is rendered as svg based on `image` prop, even if the `variant` prop is passed as well", () => {
        props.variant = "empty";
        props.image = "search";
        expect(image().type()).toBe(svgImages.search);
      });

      it("has a suitable class name", () => {
        expect(image().hasClass("illustration__svg")).toBe(true);
      });

      it("is rendered as a span if `variant` and `image` props are not passed or they're not valid", () => {
        expect(image().type()).toBe("span");
        resetWrapper();
        props.image = "invalidName";
        expect(image().type()).toBe("span");
      });


    });

    describe("header element", () => {

      const header = () => illustration().find("h2");

      it("renders a Trans component with a proper `i18nKey` prop if a valid `variant` prop is passed", () => {
        props.variant = "empty";
        expect(header().children().find(Trans).length).toBe(1);
        expect(header().children().find(Trans).prop("i18nKey")).toBe("emptyBox")
      });

      it("renders a content of the `header` prop if passed (even it the `variant` prop is passed as well)", () => {
        props.variant = "empty";
        props.header = "Test Header";
        expect(header().children().find(Trans).length).toBe(0);
        expect(header().text()).toBe("Test Header");
      });

      it("has a suitable class name", () => {
        props.header = "Test Header";
        expect(header().hasClass("illustration__header")).toBe(true);
      });

      it("is not rendered if the `header` and `variant` props are not passed or they're not valid", () => {
        props.variant = "invalidVariant";
        expect(header().length).toBe(0);
      });

    });

    describe("description element", () => {

      const description = () => illustration().find("p");

      it("renders a Trans component with a proper `i18nKey` prop if a valid `variant` prop is passed", () => {
        props.variant = "fetchError";
        expect(description().children().find(Trans).length).toBe(1);
        expect(description().children().find(Trans).prop("i18nKey")).toBe("fetchError")
      });

      it("renders a content of the `description` prop if passed (even it the `variant` prop is passed as well)", () => {
        props.variant = "fetchError";
        props.description = "Test description";
        expect(description().children().find(Trans).length).toBe(0);
        expect(description().text()).toBe("Test description");
      });

      it("has a suitable class name", () => {
        props.description = "Test description";
        expect(description().hasClass("illustration__description")).toBe(true);
      });

      it("is not rendered if the `description` and `variant` props are not passed or they're not valid", () => {
        props.variant = "invalidVariant";
        expect(description().length).toBe(0);
      });

    });

  });

 
});