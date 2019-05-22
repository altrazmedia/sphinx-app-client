import { combineReducers } from "redux";

import currentUserReducer from "./currentUserReducer";
import leadCoursesReducer from "./leadCoursesReducer";

export default combineReducers({
  currentUser: currentUserReducer,
  leadCourses: leadCoursesReducer
});