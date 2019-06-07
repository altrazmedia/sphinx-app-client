import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, PageHeader, Illustration, Button, FAB } from "components/common";

import List from "./List";
import Add  from "./Add";

import { Trans, withTranslation } from "react-i18next";
import { fetchGroupsList } from "actions/groupsActions";

class Groups extends PureComponent {

  state = {
    loading: true,
    displayNewGroupForm: false
  }

  componentDidUpdate = () => {
    if (this.props.groups.loading !== this.state.loading) {
      this.setState({ loading: this.props.groups.loading })
    }
  }

  componentDidMount = () => {
    this.props.fetchGroups();
  }

  /** Opens a window with the new user form */
  openNewGroupForm = () => {
    this.setState({ displayNewGroupForm: true })
  }

  /** Closes the new Group form */
  closeNewGroupForm = () => {
    this.setState({ displayNewGroupForm: false })
  }



  render = () => {

    const { loading, displayNewGroupForm } = this.state;
    const { groups } = this.props;

    return (
      <div>
        <PageHeader 
          header={<Trans i18nKey="groups.header" /> } 
          description={<Trans i18nKey="groups.description" /> } 
        />
        {
          loading ? 
            <Loader />
          : groups.error ?  
            <Illustration variant="fetchError" />
          : groups.data.length === 0 ? 
            <>
              <Illustration variant="empty" description={<Trans i18nKey="groups.noGroups" />} />
              <Button.Group align="center">
                <Button variant="text" onClick={this.openNewGroupForm}>
                  <Trans i18nKey="groups.add" />
                </Button>
              </Button.Group>
            </>
          : <>
              <List groups={groups.data} />
              <FAB icon="plus" onClick={this.openNewGroupForm} />
            </>
        }
        { 
          displayNewGroupForm &&
            <Add close={this.closeNewGroupForm} />
        }
      </div>
    )

  }

}

const READ = state => ({
  groups: state.groups.list,
})

const EMIT = dispatch => ({
  fetchGroups: () => dispatch(fetchGroupsList())
})

export default connect(READ, EMIT)(withTranslation()(Groups));