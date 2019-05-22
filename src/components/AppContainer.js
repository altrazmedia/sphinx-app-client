import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Sandbox from "components/pages/Sandbox";
import Login from "components/pages/Login";
import Sidebar from "components/others/Sidebar";

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
      <Switch>
        {
          process.env.NODE_ENV === "development" ? 
            <Route path="/sandbox" component={Sandbox} />
          : null
        }
        {
          isUserLoggedIn ? 
            <>
              <Sidebar />
            </>
          : <Login />
        }
      </Switch>
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