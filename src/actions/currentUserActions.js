import axios, { setSessionHeader } from "config/axios";
import { LOGIN, CURRENT_USER_LOADING, CURRENT_USER_SUCCESS, CURRENT_USER_ERROR } from "./types";

/**
 * 
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
  dispatch({ type: LOGIN });
  dispatch(getCurrentUserInfo());
}


export const getCurrentUserInfo = (payload = {}) => dispatch => {
  const { loading = true } = payload;

  if (loading) {
    dispatch({ type: CURRENT_USER_LOADING, payload: true })
  }

  axios.get("me")
    .then(result => {
      const { data } = result;
      dispatch({ type: CURRENT_USER_SUCCESS, payload: data })
    })
    .catch(err => {
      dispatch({ type: CURRENT_USER_ERROR, payload: err.response })
    })
}