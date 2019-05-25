import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Home         from "components/pages/Home";
import Sandbox      from "components/pages/Sandbox";
import Login        from "components/pages/Login";
import CoursesLead  from "components/pages/CoursesLead";
import TestsSchemas from "components/pages/TestsSchemas";
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
                  <ProtectedRoute roles={[ "teacher" ]} component={CoursesLead} path="/courses-lead" />
                  <ProtectedRoute roles={[ "teacher" ]} component={TestsSchemas} path="/tests-schemas" />
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