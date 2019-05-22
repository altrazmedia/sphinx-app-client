import React from "react";
import { Link } from "react-router-dom";

import { Illustration } from "components/common";

// The 404 Page
const NotFound = () => {

  return (
    <Illustration 
      image="notfound" 
      header="Wygląda na to, że się zgubiłeś..." 
      description={
        <span>Nie znaleźliśmy szukanej przez Ciebie strony. <Link className="text-link" to="/">Powróć do strony głównej.</Link></span>
      }
    />
  )

}

export default NotFound;