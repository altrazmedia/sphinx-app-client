import { combineReducers } from "redux";

import currentUserReducer  from "./currentUserReducer";
import leadCoursesReducer  from "./leadCoursesReducer";
import testsSchemasReducer from "./testsSchemasReducer";
import subjectsReducer     from "./subjectsReducer";

export default combineReducers({
  currentUser:  currentUserReducer,
  leadCourses:  leadCoursesReducer,
  subjects:     subjectsReducer,
  testsSchemas: testsSchemasReducer
});