import axios from "config/axios";
import * as types from "./types";

/**
 * Fetches the list of all subjects
 */
export const fetchSubjects = () => dispatch => {
  dispatch({
    type: types.SUBJECTS_LOADING,
    payload: true,
  });

  axios
    .get("subjects/list")
    .then(response => {
      dispatch({
        type: types.SUBJECTS_SUCCESS,
        payload: response.data,
      });
    })
    .catch(err => {
      dispatch({
        type: types.SUBJECTS_ERROR,
        payload: err.response,
      });
    });
};

/**
 * Sending a new subject data to the server and adding it to current subjects list in store
 * @param {Object} payload
 * @param {String} payload.code Subject unique code
 * @param {String} payload.name Subject name
 * @param {Function} payload.onSuccess callback
 * @param {Function} payload.onError callback
 */
export const addSubject = payload => (dispatch, getState) => {
  const { name, code, onSuccess, onError } = payload;

  const subjectData = { name, code };

  axios
    .post("subjects", subjectData)
    .then(response => {
      const { subjects } = getState(); // current subjects list
      const subjectsUpdated = [response.data, ...subjects.data]; // adding new subject to the beggining of the list
      // Saving updated list
      dispatch({
        type: types.SUBJECTS_SUCCESS,
        payload: subjectsUpdated,
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
