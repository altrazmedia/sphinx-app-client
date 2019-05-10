import React from "react";
import { Switch, Route } from "react-router-dom";

import Sandbox from "components/pages/Sandbox";


const AppContainer = () => {


  return (
    <Switch>
      {
        process.env.NODE_ENV === "development" ? 
          <Route path="/sandbox" component={Sandbox} />
        : null
      }
    </Switch>
  )

}

export default AppContainer;