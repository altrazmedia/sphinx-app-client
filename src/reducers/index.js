import { combineReducers } from "redux";

import currentUserReducer from "./currentUserReducer";

export default combineReducers({
  currentUser: currentUserReducer
});