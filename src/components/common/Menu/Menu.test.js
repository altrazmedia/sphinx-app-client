import React from "react";
import { shallow } from "enzyme";

import Menu from "./";

describe("Input component", () => {
  let wrapper, props;

  const menu = () => {
    if (!wrapper) {
      wrapper = shallow(<Menu {...props} />);
    }
    return wrapper;
  }

  const resetWrapper = () => {
    wrapper = undefined;
    props = { };
  }

  beforeEach(resetWrapper);

  it("renders a div", () => {
    expect(menu().type()).toBe("div");
  });

  describe("the rendered div", () => {

    it("has a suitable class name", () => {
      expect(menu().hasClass("menu")).toBe(true);
    });

    it("has a custom calss name", () => {
      props.className = "testClass";
      expect(menu().hasClass("testClass")).toBe(true);
    });

    it("has a class name based on `type` prop", () => {
      props.type = "secondary";
      expect(menu().hasClass("menu--secondary")).toBe(true);
      resetWrapper();
      props.type = "primary";
      expect(menu().hasClass("menu--primary")).toBe(true);
    });

    it("renders a ul element", () => {
      expect(menu().find("ul").length).toBe(1);
    });

    describe("the ul element", () => {
      
      const ul = () => menu().find("ul");

      it("has a suitable class name", () => {
        expect(ul().hasClass("menu__list")).toBe(true);
      });

      it("renders one li for every element in `items` prop array", () => {
        expect(ul().find("li").length).toBe(0);
        resetWrapper();
        props.items = [
          { value: "1" },
          { value: "2" },
          { value: "3" }
        ];
        expect(ul().find("li").length).toBe(3);
      });

      describe("the li elements", () => {
        
        const items = [
          { value: "1", text: "One" },
          { value: "2", text: "Two" },
          { value: "3", text: "Three" }
        ];

        beforeEach(() => {
          props.items = items;
        });

        it("have a suitable class name", () => {
          expect(ul().find("li").first().hasClass("menu__item")).toBe(true);
        });

        it("have a class name if item's `value` is equal to `value` prop", () => {
          props.value = items[0].value;
          expect(ul().find("li").first().hasClass("menu__item--active")).toBe(true);
          expect(ul().find("li").at(1).hasClass("menu__item--active")).toBe(false);
        });

        it("calls a function passed as the `onChange` prop with clicked item's value as a argument", () => {

          const mock = jest.fn();
          props.onChange = mock;

          ul().find("li").first().simulate("click");
          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith(items[0].value);

        });

        it("renders the item's `text` inside", () => {
          expect(ul().find("li").first().text()).toBe(items[0].text);
          expect(ul().find("li").at(1).text()).toBe(items[1].text);
        });

      });

    });

  });

});