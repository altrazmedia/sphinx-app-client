import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/** Returning the react-router-dom Route if user has a required role  */
export const ProtectedRoute = props => {
  const { currentUser, roles, ...rest } = props;

  if (
    currentUser.isUserLoggedIn &&
    currentUser.data.role &&
    roles.includes(currentUser.data.role)
  ) {
    return <Route {...rest} />;
  }

  return <Redirect to="/" />;
};

ProtectedRoute.propTypes = {
  currentUser: PropTypes.object.isRequired, // logged user's data
  roles: PropTypes.arrayOf(PropTypes.string), // list of rules required to enter the route
};

const READ = state => ({
  currentUser: state.currentUser,
});

export default connect(READ)(ProtectedRoute);
