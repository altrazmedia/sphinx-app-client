import axios      from "config/axios";
import * as types from "./types";


/**
 * Fetches the list of groups
 */
export const fetchGroupsList = () => dispatch => {

  dispatch({
    type: types.GROUPS_LIST_LOADING,
    payload: true
  })

  axios.get("groups")
    .then(response => {
      dispatch({
        type: types.GROUPS_LIST_SUCCESS,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: types.GROUPS_LIST_ERROR,
        payload: err.response
      })
    })

}

/**
 * Fetching the info about a single group
 * @param {Object} payload
 * @param {String} payload.code Group code
 */
export const fetchSingleGroup = payload => dispatch => {

  const { code } = payload;

  dispatch({
    type: types.GROUP_LOADING,
    payload: true
  })

  axios.get(`groups/${code}`)
    .then(response => {
      dispatch({
        type: types.GROUP_SUCCESS,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: types.GROUP_ERROR,
        payload: err.response
      })
    })

}

/**
 * Creating a new group
 * @param {Object} payload
 * @param {String} payload.code Group code
 * @param {String} payload.name Group name
 * @param {Array} payload.students List of students ids
 * @param {Function} payload.onSuccess callback 
 * @param {Function} payload.onError callback 
 */
export const addGroup = payload => (dispatch, getState) => {

  const { name, code, students, onError, onSuccess } = payload;

  const groupData = { name, code, students };

  axios.post("groups", groupData)
    .then(response => {

      // Adding the new group to the existing list
      const groups = getState().groups.list.data;
      const updatedGroups = [
        response.data,
        ...groups
      ];

      dispatch({
        type: types.GROUPS_LIST_SUCCESS,
        payload: updatedGroups
      })

      if (onSuccess) { onSuccess(); }

    })
    .catch(err => {
      if (onError) { onError(err.response); }
    })

}