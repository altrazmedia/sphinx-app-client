import React from "react";
import { connect } from "react-redux";

import { Illustration } from "components/common";

/** Simple homepage with `hello` message */
const Home = props => {

  const { label } = props.currentUser;

  const header = label ? `Witaj, ${label}!` : `Witaj!`;

  return (
    <Illustration image="hello" header={header} description="Skorzystaj z nawigacji po lewej stronie, by rozpocząć pracę." />
  )
}

const READ = state => ({
  currentUser: state.currentUser.data
})

export default connect(READ)(Home)