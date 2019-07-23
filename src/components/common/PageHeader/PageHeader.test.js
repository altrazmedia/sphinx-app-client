import React from "react";
import { shallow } from "enzyme";

import PageHeader from "./PageHeader";

describe("PageHeader component", () => {
  let wrapper, props;

  const pageHeader = () => {
    if (!wrapper) {
      wrapper = shallow(<PageHeader {...props} />);
    }
    return wrapper;
  };

  const resetWrapper = () => {
    wrapper = undefined;
    props = {};
  };

  beforeEach(resetWrapper);

  it("renders a header element", () => {
    expect(
      pageHeader()
        .first()
        .type()
    ).toBe("header");
  });

  describe("header element", () => {
    const header = () => pageHeader().first();

    it("has a suitable class name", () => {
      expect(header().hasClass("page-header")).toBe(true);
    });

    it("has a custom class name", () => {
      props.className = "testClass";
      expect(header().hasClass("testClass")).toBe(true);
    });

    it("renders an h1 element with the content of the `header` prop inside if its passed", () => {
      expect(header().find("h1").length).toBe(0);
      resetWrapper();

      props.header = "Test header";
      expect(header().find("h1").length).toBe(1);
      expect(
        header()
          .find("h1")
          .hasClass("page-header__header")
      ).toBe(true);
      expect(
        header()
          .find("h1")
          .text()
      ).toBe("Test header");
    });

    it("renders a p element with the content of the `description` prop inside if its passed", () => {
      expect(header().find("p").length).toBe(0);
      resetWrapper();

      props.description = "Test description";
      expect(header().find("p").length).toBe(1);
      expect(
        header()
          .find("p")
          .hasClass("page-header__description")
      ).toBe(true);
      expect(
        header()
          .find("p")
          .text()
      ).toBe("Test description");
    });
  });
});
