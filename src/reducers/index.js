import { combineReducers } from "redux";

import currentUserReducer  from "./currentUserReducer";
import coursesReducer      from "./coursesReducer";
import testsSchemasReducer from "./testsSchemasReducer";
import subjectsReducer     from "./subjectsReducer";
import testsReducer        from "./testsReducer";
import usersReducer        from "./usersReducer";

export default combineReducers({
  currentUser:  currentUserReducer,
  subjects:     subjectsReducer,
  testsSchemas: testsSchemasReducer,
  courses:      coursesReducer,
  tests:        testsReducer,
  users:        usersReducer
});