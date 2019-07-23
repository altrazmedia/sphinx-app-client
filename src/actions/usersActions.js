import axios from "config/axios";
import * as types from "./types";

/**
 * Fetches the list of all users
 */
export const fetchUsersList = () => dispatch => {
  dispatch({
    type: types.USERS_LIST_LOADING,
    payload: true,
  });

  axios
    .get("users/list")
    .then(response => {
      dispatch({
        type: types.USERS_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch(err => {
      dispatch({
        type: types.USERS_LIST_ERROR,
        payload: err.response,
      });
    });
};

/**
 * Sending a new user data to the server and adding it to current users list in store
 * @param {Object} payload
 * @param {String} payload.label
 * @param {String} payload.email
 * @param {String} payload.role User role ("admin" || "student" || "teacher")
 * @param {String} payload.password
 * @param {Function} payload.onSuccess callback
 * @param {Function} payload.onError callback
 */
export const addUser = payload => (dispatch, getState) => {
  const { label, email, role, password, onSuccess, onError } = payload;

  const userData = { label, email, role, password };

  axios
    .post("users", userData)
    .then(response => {
      const { users } = getState(); // current users list
      const usersUpdated = [response.data, ...users.data]; // adding new user to the beggining of the list
      // Saving updated list
      dispatch({
        type: types.USERS_LIST_SUCCESS,
        payload: usersUpdated,
      });
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch(err => {
      if (onError) {
        onError(err.response);
      }
    });
};
