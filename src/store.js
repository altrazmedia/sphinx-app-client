import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "reducers";

const middleware = [thunk];

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools({}) || compose
    : compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
