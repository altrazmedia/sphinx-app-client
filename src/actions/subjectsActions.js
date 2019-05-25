import axios      from "config/axios";
import * as types from "./types";

/**
 * Fetches the list of all subjects
 */
export const fetchSubjects = () => dispatch => {

  dispatch({
    type: types.SUBJECTS_LOADING,
    payload: true
  })

  axios.get("subjects")
    .then(response => {
      dispatch({
        type: types.SUBJECTS_SUCCESS,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: types.SUBJECTS_ERROR,
        payload: err.response
      })
    })

}