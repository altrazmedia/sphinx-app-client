import React from "react";
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux";

import store from "store";

import "styles/index.scss"

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        
      </BrowserRouter>
    </Provider>
  );
}

export default App;
