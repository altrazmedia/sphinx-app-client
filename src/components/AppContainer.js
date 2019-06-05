import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Home         from "components/pages/Home";
import Sandbox      from "components/pages/Sandbox";
import Course       from "components/pages/Course";
import CoursesList  from "components/pages/CoursesList";
import TestsSchemas from "components/pages/TestsSchemas";
import Test         from "components/pages/Test";
import TestsLead    from "components/pages/TestsLead";
import MyTests      from "components/pages/MyTests";
import Subjects     from "components/pages/Subjects";
import Users        from "components/pages/Users";
import GroupsList   from "components/pages/GroupsList";
import Group        from "components/pages/Group";

import Login        from "components/others/Login";
import NotFound     from "components/others/404";
import Sidebar      from "components/others/Sidebar";

import ProtectedRoute from "components/common/ProtectedRoute";

import { onUserLogin } from "actions/currentUserActions";


class AppContainer extends PureComponent {

  componentDidMount = () => {
    this.checkForUser();
  }

  /** Checks for user session info in localStorage */
  checkForUser = () => {
    const session_id = localStorage.getItem("session_id");
    if (session_id) {
      this.props.onUserLogin(session_id);
    }
  }



  render = () => {
    const { isUserLoggedIn } = this.props;
  
    return (
      <>
        {
          process.env.NODE_ENV === "development" ? 
            <Route path="/sandbox" component={Sandbox} />
          : null
        }
        {
          isUserLoggedIn ? 
            <div className="app">
              <Sidebar />
              <div className="app__container">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <ProtectedRoute roles={[ "teacher" ]} component={CoursesList} path="/courses-lead" />
                  <ProtectedRoute roles={[ "student" ]} component={CoursesList} path="/my-courses" />
                  <ProtectedRoute roles={[ "admin"   ]} component={CoursesList} path="/courses" />
                  <ProtectedRoute roles={[ "teacher" ]} component={TestsSchemas} path="/tests-schemas" />
                  <ProtectedRoute roles={[ "admin"   ]} component={Subjects} path="/subjects" />
                  <ProtectedRoute roles={[ "admin"   ]} component={GroupsList} path="/groups" />
                  <ProtectedRoute roles={[ "admin", "teacher" ]} component={Group} path="/group/:code" />
                  <ProtectedRoute roles={[ "teacher" ]} component={TestsLead} path="/tests-lead" />
                  <ProtectedRoute roles={[ "student" ]} component={MyTests} path="/my-tests" />
                  <Route path="/course/:code" exact component={Course} />
                  <Route path="/test/:id" exact component={Test} />
                  <Route path="/users" exact component={Users} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          : <Login />
        }
      </>
    )

  }


}


const READ = state => ({
  isUserLoggedIn: state.currentUser.isUserLoggedIn
});

const EMIT = dispatch => ({
  onUserLogin: session_id => dispatch(onUserLogin(session_id))
});

export default connect(READ, EMIT)(AppContainer);