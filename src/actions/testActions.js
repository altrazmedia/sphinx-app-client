import axios      from "config/axios";
import * as types from "./types";

/**
 * Fetches the single test
 */
export const fetchTest = payload => dispatch => {

  const { id } = payload;

  dispatch({
    type: types.TEST_LOADING,
    payload: true
  })

  axios.get(`tests/single/${id}`)
    .then(response => {
      dispatch({
        type: types.TEST_SUCCESS,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: types.TEST_ERROR,
        payload: err.response
      })
    })

}