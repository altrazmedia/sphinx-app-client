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


/**
 * Fetches the list of tests the logged in user has created
 */
export const fetchLeadTests = () => dispatch => {

  dispatch({
    type: types.TESTS_LIST_LOADING,
    payload: true
  })

  axios.get(`tests/my-lead`)
    .then(response => {
      dispatch({
        type: types.TESTS_LIST_SUCCESS,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: types.TESTS_LIST_ERROR,
        payload: err.response
      })
    })
}

/**
 * Fetches the list of tests the logged in user is taking part in
 */
export const fetchMyTests = () => dispatch => {

  dispatch({
    type: types.TESTS_LIST_LOADING,
    payload: true
  })

  axios.get(`tests/my`)
    .then(response => {
      dispatch({
        type: types.TESTS_LIST_SUCCESS,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: types.TESTS_LIST_ERROR,
        payload: err.response
      })
    })
}