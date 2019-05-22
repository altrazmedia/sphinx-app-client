import axios, { setSessionHeader, removeSessionHeader } from "config/axios";
import * as types  from "./types";


/**
 * @param {Object} payload
 * @param {String} email
 * @param {String} password
 * @param {Function} onError Callback function invoked if request has failed
 */
export const login = ({ email, password, onError }) => dispatch => {
  axios.post("session", { email, password })
    .then(result => {
      const { session_id } = result.data;
      dispatch(onUserLogin(session_id));
    })
    .catch(err => {
      if (onError) { onError(err.response) }
    })
}

/**
 * User has logged in
 * @param {String} session_id 
 */
export const onUserLogin = (session_id) => dispatch => {
  localStorage.setItem("session_id", session_id);
  setSessionHeader(session_id); // Setting the requests header
  dispatch({ type: types.LOGIN });
  dispatch(getCurrentUserInfo());
}

/**
 * Logging out the user
 */
export const logout = () => dispatch => {
  axios.delete("session")
    .finally(() => {
      // Removing info about user's session from localStorage and axios config regardless of result of removing session in database
      localStorage.removeItem("session_id");
      removeSessionHeader();
      dispatch({ type: types.LOGOUT })
    })
}


/**
 * Fetching current user info
 * @param {Object} payload 
 * @param {Boolean} payload.loading Should state.currentUser.loading filed be modified
 */
export const getCurrentUserInfo = (payload = {}) => dispatch => {
  const { loading = true } = payload;

  if (loading) {
    dispatch({ type: types.CURRENT_USER_LOADING, payload: true })
  }

  axios.get("me")
    .then(result => {
      const { data } = result;
      dispatch({ type: types.CURRENT_USER_SUCCESS, payload: data })
    })
    .catch(err => {
      dispatch({ type: types.CURRENT_USER_ERROR, payload: err.response })
    })
}