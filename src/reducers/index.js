import { combineReducers } from "redux";

import subjectsReducer     from "./subjectsReducer";

export default combineReducers({
  subjects:     subjectsReducer,
});