import axios from "config/axios";
import * as types from "./types";

/**
 * Fetching the list of courses the user is leading
 */
export const fetchLeadCourses = () => dispatch => {
  dispatch({
    type: types.COURSES_LIST_LOADING,
    payload: true,
  });

  axios
    .get("courses/my-lead")
    .then(response => {
      dispatch({
        type: types.COURSES_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch(err => {
      dispatch({ type: types.COURSES_LIST_ERROR, payload: err.response });
    });
};

/**
 * Fetching the list of courses the user is taking part in
 */
export const fetchMyCourses = () => dispatch => {
  dispatch({
    type: types.COURSES_LIST_LOADING,
    payload: true,
  });

  axios
    .get("courses/my")
    .then(response => {
      dispatch({
        type: types.COURSES_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch(err => {
      dispatch({ type: types.COURSES_LIST_ERROR, payload: err.response });
    });
};

export const fetchCourse = payload => async dispatch => {
  const { code, loading = true } = payload;

  if (loading) {
    dispatch({
      type: types.COURSE_LOADING,
      payload: true,
    });
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
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: types.COURSE_ERROR,
      payload: err.response,
    });
  }
};

/**
 * Fetching the list of all courses
 */
export const fetchCoursesList = () => dispatch => {
  dispatch({
    type: types.COURSES_LIST_LOADING,
    payload: true,
  });

  axios
    .get("courses/list")
    .then(response => {
      dispatch({
        type: types.COURSES_LIST_SUCCESS,
        payload: response.data,
      });
    })
    .catch(err => {
      dispatch({
        type: types.COURSES_LIST_ERROR,
        payload: err.response,
      });
    });
};

/**
 * Creating a new course and adding it to the current courses list (state.courses.list.data) without additional data fetching
 * @param {Object} payload
 * @param {String} payload.code Course code
 * @param {String} payload.subject Subject code
 * @param {String} payload.teacher Teacher id
 * @param {String} payload.group Group code
 * @param {Function} payload.onSuccess callback
 * @param {Function} payload.onError callback
 */
export const addCourse = payload => (dispatch, getState) => {
  const { code, subject, teacher, group, onError, onSuccess } = payload;

  const courseData = { code, subject, teacher, group };

  axios
    .post("courses", courseData)
    .then(response => {
      const currentCourses = getState().courses.list.data; // current list of courses in reducer
      const updatedCourses = [
        // adding the created course
        response.data,
        ...currentCourses,
      ];

      // Saving updated list of courses
      dispatch({
        type: types.COURSES_LIST_SUCCESS,
        payload: updatedCourses,
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

/**
 * Creates the course assigned to currently open course (state.course)
 * @param {Object} payload
 */
export const addTestToCourse = payload => (dispatch, getState) => {
  const { schema, start, end, onSuccess, onError } = payload;

  const { courses } = getState();

  const testData = { schema, start, end, course: courses.single.data.code };

  axios
    .post("tests", testData)
    .then(() => {
      dispatch(fetchCourse({ code: courses.single.data.code, loading: false }));
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch(err => {
      console.log(err);
      if (onError) {
        onError(err.response || err);
      }
    });
};
