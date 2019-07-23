import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Home from "components/pages/Home";
import Sandbox from "components/pages/Sandbox";
import Course from "components/pages/Course";
import CoursesList from "components/pages/CoursesList";
import TestsSchemas from "components/pages/TestsSchemas";
import Test from "components/pages/Test";
import TestsLead from "components/pages/TestsLead";
import MyTests from "components/pages/MyTests";
import Subjects from "components/pages/Subjects";
import Users from "components/pages/Users";
import GroupsList from "components/pages/GroupsList";
import Group from "components/pages/Group";

import Login from "components/others/Login";
import NotFound from "components/others/404";
import Sidebar from "components/others/Sidebar";

import { ProtectedRoute, Loader, Illustration } from "components/common";

import { checkForSession } from "actions/currentUserActions";

class AppContainer extends PureComponent {
  componentDidMount = () => {
    this.props.checkForSession(); // checking if there is a session id saved from the last visit on the page
  };

  render = () => {
    const { isUserLoggedIn, loading, error } = this.props.currentUser;

    return (
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <Illustration variant="fetchError" />
        ) : (
          <>
            {process.env.NODE_ENV === "development" ? (
              <Route path="/sandbox" component={Sandbox} />
            ) : null}
            {isUserLoggedIn ? (
              <div className="app">
                <Sidebar />
                <div className="app__container">
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <ProtectedRoute
                      roles={["teacher"]}
                      component={CoursesList}
                      path="/courses-lead"
                    />
                    <ProtectedRoute
                      roles={["student"]}
                      component={CoursesList}
                      path="/my-courses"
                    />
                    <ProtectedRoute
                      roles={["admin"]}
                      component={CoursesList}
                      path="/courses"
                    />
                    <ProtectedRoute
                      roles={["teacher"]}
                      component={TestsSchemas}
                      path="/tests-schemas"
                    />
                    <ProtectedRoute
                      roles={["admin"]}
                      component={Subjects}
                      path="/subjects"
                    />
                    <ProtectedRoute
                      roles={["admin"]}
                      component={GroupsList}
                      path="/groups"
                    />
                    <ProtectedRoute
                      roles={["admin", "teacher"]}
                      component={Group}
                      path="/group/:code"
                    />
                    <ProtectedRoute
                      roles={["teacher"]}
                      component={TestsLead}
                      path="/tests-lead"
                    />
                    <ProtectedRoute
                      roles={["student"]}
                      component={MyTests}
                      path="/my-tests"
                    />
                    <Route path="/course/:code" exact component={Course} />
                    <Route path="/test/:id" exact component={Test} />
                    <Route path="/users" exact component={Users} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            ) : (
              <Login />
            )}
          </>
        )}
      </>
    );
  };
}

const READ = state => ({
  currentUser: state.currentUser,
});

const EMIT = dispatch => ({
  checkForSession: () => dispatch(checkForSession()),
});

export default connect(
  READ,
  EMIT
)(AppContainer);
