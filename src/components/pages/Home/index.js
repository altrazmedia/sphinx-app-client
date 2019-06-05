import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { Illustration } from "components/common";

/** Simple homepage with `hello` message */
const Home = props => {

  const { t, currentUser } = props;


  return (
    <Illustration image="hello" header={t("hello.header", { label: currentUser.label })} description={t("hello.description")} />
  )
}

const READ = state => ({
  currentUser: state.currentUser.data
})

export default connect(READ)(withTranslation()(Home))