import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import { PageHeader, Menu } from "components/common";

import Main from "./Main";
import Stats from "./Stats";

class SingleTestSchemaView extends PureComponent {

  state = {
    page: "main", // which page is displayed; "main" or "stats"
  }

  handlePageChange = page => {
    this.setState({ page })
  }


  render = () => {

    const { page } = this.state;
    const { testSchema, t } = this.props;
    
    return (
      <>
        <PageHeader header={testSchema.name} description={testSchema.description} />
        <Menu 
          value={page}
          items={[
            { value: "main", text: t("testSchema.page.main") },
            { value: "stats", text: t("testSchema.page.stats") }
          ]}
          onChange={this.handlePageChange}
        />
        {
          page === "main" ? <Main testSchema={testSchema} /> 
          : page === "stats" ? <Stats testSchema={testSchema} />
          : null
        }
      </>
    )
  }
  
}

SingleTestSchemaView.propTypes = {
  testSchema: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    subject: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
}

export default withTranslation()(SingleTestSchemaView);