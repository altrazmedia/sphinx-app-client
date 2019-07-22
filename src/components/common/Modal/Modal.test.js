import React from "react";
import { shallow } from "enzyme";

import { Modal, Portal, Button } from "../";

describe("Modal component", () => {
  let wrapper, props;

  const modal = () => {
    if (!wrapper) {
      wrapper = shallow(<Modal {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { };
  }

  beforeEach(resetWrapper);

  it("doesn't render anything if the `isOpen` prop is set to `false`", () => {
    props.isOpen = false;
    expect(modal().type()).toBeFalsy();
  });

  it("renders the Portal component", () => {
    expect(modal().first().type()).toBe(Portal);
  });

  it("renders a wrapper div inside the Portal", () => {
    expect(modal().children().first().type()).toBe("div");
  });

  describe("the wrapper div", () => {

    const wrapper = () => modal().children().first();

    it("has a suitable class name", () => {
      expect(wrapper().hasClass("modal")).toBe(true);
    });

    it("has a custom class name", () => {
      props.className = "testClass";
      expect(wrapper().hasClass("testClass")).toBe(true);
    });

    it("receives all the other props passed to the component", () => {
      props.testProp = "abc";
      expect(wrapper().prop("testProp")).toBe("abc");
    });

    it("renders another div", () => {
      expect(wrapper().children().length).toBe(1);
      expect(wrapper().children().first().type()).toBe("div");
    });


    describe("the rendered div", () => {

      const div = () => wrapper().children().first();

      it("has a suitable class name", () => {
        expect(div().hasClass("modal__box")).toBe(true);
      });

      it("renders whats passed in the `children` prop", () => {
        props.children = <p>test</p>;
        expect(div().find("p").length).toBe(1);
        expect(div().find("p").text()).toBe("test");
      })

      it("renders a header element only if the `close` or `title` prop was passed", () => {
        expect(div().find("header").length).toBe(0);
        resetWrapper();

        props.title = "Title";
        expect(div().find("header").length).toBe(1);
        resetWrapper();

        props.close = () => {};
        expect(div().find("header").length).toBe(1);
        resetWrapper();
      });

      describe("header element", () => {
        const header = () => div().find("header");

        it("has a suitable class name", () => {
          props.title = "Title";
          expect(header().hasClass("modal__header")).toBe(true);
        });

        it("renders an h2 element with the content of `title` prop if its passed", () => {
          props.close = () => {};
          expect(header().find("h2").length).toBe(0);
          resetWrapper();

          props.title = "Test title";
          expect(header().find("h2").length).toBe(1);
          expect(header().find("h2").hasClass("modal__title")).toBe(true);
          expect(header().find("h2").text()).toBe("Test title");
        });

        it("renders the Button component with proper props only if the `close` prop is passed", () => {
          props.title = "title";
          expect(header().find(Button).length).toBe(0);
          resetWrapper();

          const close = () => {};
          props.close = close;
          expect(header().find(Button).length).toBe(1);
          expect(header().find(Button).prop("onClick")).toBe(close);
          expect(header().find(Button).prop("variant")).toBe("icon");
          expect(header().find(Button).prop("icon")).toBe("times");
          expect(header().find(Button).prop("className")).toBe("modal__close-btn");

        });

      });

    });

  });

});