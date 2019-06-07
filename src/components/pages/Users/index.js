import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Loader, PageHeader, Illustration, Button, Menu, FAB } from "components/common";

import List from "./List";
import Add  from "./Add";

import { Trans, withTranslation } from "react-i18next";
import { fetchUsersList } from "actions/usersActions";

class Users extends PureComponent {

  state = {
    loading: true,
    roleDisplayed: "student", // Filtering the list of users by their role
    displayNewUserForm: false
  }

  componentDidUpdate = () => {
    if (this.props.users.loading !== this.state.loading) {
      this.setState({ loading: this.props.users.loading })
    }
  }

  componentDidMount = () => {
    this.props.fetchUsers();
  }

  /** Opens a window with the new user form */
  openNewUserForm = () => {
    this.setState({ displayNewUserForm: true })
  }

  /** Closes the new user form */
  closeNewUserForm = () => {
    this.setState({ displayNewUserForm: false })
  }

  /** Changing the role by which displayed users are filtered */
  handleMenuChange = role => {
    this.setState({ roleDisplayed: role })
  }


  render = () => {

    const { loading, displayNewUserForm, roleDisplayed } = this.state;
    const { users, currentUserRole } = this.props;

    return (
      <div>
        <PageHeader 
          header={<Trans i18nKey="users.header" /> }
          description={<Trans i18nKey="users.description" /> }
        />
        {
          loading ? 
            <Loader />
          : users.error ?  
            <Illustration variant="fetchError" />
          : <>
              <Menu
                items={[
                  { value: "student", text: <Trans i18nKey="users.students" />  },
                  { value: "teacher", text: <Trans i18nKey="users.teachers" />  },
                  { value: "admin", text: <Trans i18nKey="users.admins" />  }
                ]}
                value={roleDisplayed}
                onChange={this.handleMenuChange}
              />
              <List users={users.data.filter(user => user.role === roleDisplayed)} />
              {
                // Adding new users available only for admins
                currentUserRole === "admin" && <FAB icon="plus" onClick={this.openNewUserForm} />
              }
            </>
        }
        {
          displayNewUserForm && 
            <Add 
              close={this.closeNewUserForm}
            />
        }
      </div>
    )

  }

}

const READ = state => ({
  users: state.users,
  currentUserRole: state.currentUser.data.role
})

const EMIT = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersList())
})

export default connect(READ, EMIT)(withTranslation()(Users));