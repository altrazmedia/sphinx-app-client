import axios, { setSessionHeader, removeSessionHeader } from "config/axios";
import * as types from "./types";

const LOCAL_STORAGE_SESSION_ID = "_session_id_";

/**
 * Checking if there is an info about a session in localStorage and if its still valid.
 * This action is dispatched as soon as the app is loaded
 */
export const checkForSession = () => dispatch => {
  const session_id = localStorage.getItem(LOCAL_STORAGE_SESSION_ID);

  if (session_id) {
    dispatch({ type: types.CURRENT_USER_LOADING, payload: true });

    axios
      .get(`session/${session_id}`)
      .then(() => {
        // session id is still valid
        dispatch(onUserLogin(session_id));
      })
      .catch(err => {
        if (err.response.status === 400) {
          // The saved session has expired
          localStorage.removeItem(LOCAL_STORAGE_SESSION_ID);
          dispatch({ type: types.CURRENT_USER_LOADING, payload: false });
        } else {
          // Server error
          dispatch({ type: types.CURRENT_USER_ERROR, payload: err.response });
        }
      });
  }
};

/**
 * @param {Object} payload
 * @param {String} email
 * @param {String} password
 * @param {Function} onError Callback function invoked if request has failed
 */
export const login = ({ email, password, onError }) => dispatch => {
  axios
    .post("session", { email, password })
    .then(result => {
      const { session_id } = result.data;
      dispatch(onUserLogin(session_id));
    })
    .catch(err => {
      if (onError) {
        onError(err.response);
      }
    });
};

/**
 * User has logged in
 * @param {String} session_id
 */
export const onUserLogin = session_id => dispatch => {
  localStorage.setItem(LOCAL_STORAGE_SESSION_ID, session_id);
  setSessionHeader(session_id); // Setting the requests header in axios config
  dispatch({ type: types.LOGIN });
  dispatch(getCurrentUserInfo());
};

/**
 * Logging out the user
 */
export const logout = () => dispatch => {
  axios.delete("session").finally(() => {
    dispatch(onLogout());
  });
};

/**
 * Operations to perform after user has logged out
 * @param {Boolean} sessionExpired is user logged out because his session has expired
 */
export const onLogout = (sessionExpired = false) => dispatch => {
  // Removing info about user's session from localStorage and axios config regardless of result of removing session in database
  localStorage.removeItem(LOCAL_STORAGE_SESSION_ID); // removing the session info from localStorage
  removeSessionHeader(); // removing the header from axios config
  dispatch({ type: types.LOGOUT, payload: sessionExpired });
};

/**
 * Fetching current user info
 * @param {Object} payload
 * @param {Boolean} payload.loading Should state.currentUser.loading filed be modified
 */
export const getCurrentUserInfo = () => dispatch => {
  axios
    .get("me")
    .then(result => {
      const { data } = result;
      dispatch({ type: types.CURRENT_USER_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: types.CURRENT_USER_ERROR, payload: err.response });
    });
};
