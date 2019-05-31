import axios from "config/axios";
import * as types  from "./types";


export const fetchCourse = payload => async (dispatch) => {

  const { code, loading = true } = payload;

  if (loading) {
    dispatch({
      type: types.COURSE_LOADING,
      payload: true
    })
  }

  try {
    const response = await axios.get(`courses/single/${code}`);
    const course = response.data;
    if (course.my_access === "teacher") {
      // Logged user is the teacher of this course - downloading the list of tests
      const tests = await axios.get(`tests/my-lead?course=${code}`);
      course.tests = tests.data;
    }

    if (course.my_access === "student") {
      // Logged user is taking part in this course as a student - downloading the list of 
      const tests = await axios.get(`tests/my?course=${code}`);
      course.tests = tests.data;
    }

    dispatch({
      type: types.COURSE_SUCCESS,
      payload: response.data
    })

  } catch(err) {
    dispatch({
      type: types.COURSE_ERROR,
      payload: err.response
    })
  }
}

/**
 * Creates the course assigned to currently open course (state.course)
 * @param {Object} payload 
 */
export const addTestToCourse = payload => (dispatch, getState) => {
  const { schema, start, end, onSuccess, onError } = payload;

  const { course } = getState();

  const testData = { schema, start, end, course: course.data.code };

  axios.post("tests", testData)
    .then(() => {
      dispatch(fetchCourse({ code: course.data.code, loading: false }))
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch(err => {
      console.log(err)
      if (onError) {
        onError(err.response || err)
      }
    })
}