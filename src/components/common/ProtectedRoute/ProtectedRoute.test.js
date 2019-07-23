import React from "react";
import { shallow } from "enzyme";
import { Route } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";

describe("ProtectedRoute component", () => {
  let wrapper, props;

  const protectedRoute = () => {
    if (!wrapper) {
      wrapper = shallow(<ProtectedRoute {...props} />);
    }
    return wrapper;
  };

  const resetWrapper = () => {
    wrapper = undefined;
    props = {};
  };

  beforeEach(resetWrapper);

  it("doesn't render anything if there's no logged in user", () => {
    props.currentUser = {
      isUserLoggedIn: false,
    };

    expect(protectedRoute().type()).toBeFalsy();
  });

  it("doesn't render anything if the user's role is not inlcuded in `roles` prop array", () => {
    props.currentUser = {
      isUserLoggedIn: true,
      data: { role: "student" },
    };
    props.roles = ["admin"];

    expect(protectedRoute().type()).toBeFalsy();
  });

  it("if there is a logged in user with a proper role  - renders the Route component and passes all the other props to it", () => {
    props.currentUser = {
      isUserLoggedIn: true,
      data: { role: "admin" },
    };
    props.roles = ["teacher", "admin"];
    props.testProp = "test";

    expect(
      protectedRoute()
        .first()
        .type()
    ).toBe(Route);
    expect(
      protectedRoute()
        .first()
        .prop("testProp")
    ).toBe("test");
  });
});
