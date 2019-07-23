import axios from "config/axios";
import * as types from "./types";

/**
 * Fetches the list of tests schemas
 * @param {Object} payload
 * @param {String} payload.subject Subject _id -> if provided, only tests assigned to this subject will be downlaoded
 */
export const fetchTestsSchemasList = payload => dispatch => {
  dispatch({
    type: types.TESTS_SCHEMAS_LOADING,
    payload: true,
  });

  const { subject } = payload;
  let path = "testsSchemas";

  if (subject) {
    path += `?subject=${subject}`;
  }

  axios
    .get(path)
    .then(response => {
      dispatch({
        type: types.TESTS_SCHEMAS_SUCCESS,
        payload: response.data,
      });
    })
    .catch(err => {
      dispatch({
        type: types.TESTS_SCHEMAS_ERROR,
        payload: err.response,
      });
    });
};

/**
 * Fetches the info of a single test schema
 * @param {Object} payload
 * @param {Strnig} payload.testSchema testSchema id
 */
export const fetchTestSchema = payload => dispatch => {
  dispatch({
    type: types.TEST_SCHEMA_LOADING,
    payload: true,
  });

  const { testSchema } = payload;

  axios
    .get(`testsSchemas/${testSchema}`)
    .then(response => {
      dispatch({
        type: types.TEST_SCHEMA_SUCCESS,
        payload: response.data,
      });
    })
    .catch(err => {
      dispatch({
        type: types.TEST_SCHEMA_ERROR,
        payload: err.response,
      });
    });
};
