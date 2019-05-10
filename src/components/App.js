import React from "react";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux";

import AppContainer from "./AppContainer";

import store from "store";

import "styles/index.scss"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
