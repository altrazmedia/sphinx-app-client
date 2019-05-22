import axios      from "config/axios";
import * as types from "./types";

/**
 * Fetching the list of courses the user is leading
 */
export const fetchLeadCourses = () => dispatch => {

  dispatch({
    type: types.LEAD_COURSES_LOADING,
    payload: true
  })

  axios.get("courses/my-lead")
    .then(response => {
      dispatch({
        type: types.LEAD_COURSES_SUCCESS,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({ type: types.LEAD_COURSES_ERROR, payload: err.response })
    })

}