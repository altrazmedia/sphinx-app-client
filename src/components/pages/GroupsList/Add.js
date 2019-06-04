import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { Loader, Modal, Input, Button, ErrorMessage, Checkbox } from "components/common";

import { fetchUsersList } from "actions/usersActions";
import { addGroup } from "actions/groupsActions";

const FORM_ID = "new-group-form";

// Form to add a new group
class AddGroup extends PureComponent {

  state = {
    name: "", // new group name
    code: "", // new grooup code
    students: [], // ids of selected users
    errors: {}, // errors displayed on Inputs
    errorMsg: "" // additional error message
  }

  componentDidMount = () => {
    this.props.fetchUsers();
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Selecting/ deselecting the user
  toggleStudentSelect = studentId => {

    this.setState(state => {
      const students = [ ...state.students ];
      const studentIndex = students.indexOf(studentId);
      if (studentIndex === -1) {
        students.push(studentId)
      }
      else {
        students.splice(studentIndex, 1);
      }
      return { students }
    })

  }


  /**
   * Checking if all the fields are filled correctly, setting the state.errors object
   * @returns {Boolean} true => all fields have been filled correctly
   */
  validate = () => {

    const { name, code, students } = this.state;
    const { t } = this.props;

    const errors = {};
    let errorMsg = "";


    if (!name.trim()) {
      errors.name = t("emptyField");
    }
    if (!code.trim()) {
      errors.code = t("emptyField");
    }

    if (students.length === 0) {
      errorMsg = t("group.pickStudents");
    }

    this.setState({ errors, errorMsg });

    // Returning the info if somt errors occurred
    return Object.keys(errors).length === 0 && errorMsg.length === 0;


  }

  /** Sending the data to the server */
  addGroup = () => {

    const { name, code, students } = this.state;
    const { t, close } = this.props;

    const onError = response => {
      if (response.status === 409) {
        this.setState({
          errors: {
            code: t("group.code.duplicate")
          }
        })
      }
      else {
        this.setState({
          errorMsg: t("group.add.error")
        })
      }
    }

    const onSuccess = () => {
      close();
      // TODO: Displaying a toast notification
    }

    this.props.addGroup({ code, name, students, onError, onSuccess });

  }

  /** Form submittion */
  handleSubmit = e => {
    e.preventDefault();

    if (this.validate()) {
      this.addGroup();
    }

  }

  render = () => {

    const { users, t, close } = this.props;
    const { name, code, students, errors, errorMsg } = this.state;

    return (
      <Modal 
        close={close}
        title={t("groups.add")}
      >
        <Modal.Content>
          {
            users.loading ? 
              <Loader />
            : users.error ? 
              <ErrorMessage content={t("group.usersError")} fullWidth />
            : (
              <form className="group-form" onSubmit={this.handleSubmit} id={FORM_ID}>
                <b>{t("name")}</b>
                <Input 
                  value={name}
                  name="name"
                  error={errors.name}
                  onChange={this.handleInputChange}
                  fullWidth
                  required
                />
                <b>{t("group.code")}</b>
                <Input 
                  value={code}
                  name="code"
                  error={errors.code}
                  onChange={this.handleInputChange}
                  fullWidth
                  required
                />
                <b>{t("group.members")}</b>
                <div className="group-form__students">
                  {
                    users.data
                      .filter(user => user.role === "student")
                      .map(student => (
                        <Checkbox 
                          className="group-form__student" 
                          key={student._id}
                          label={student.label}
                          checked={students.includes(student._id)}
                          onChange={() => this.toggleStudentSelect(student._id) }
                        />
                      ))
                  }
                </div>
                <ErrorMessage content={errorMsg} fullWidth />
              </form>
            )
          }
        
        </Modal.Content>
        <Modal.Buttons>
          {
            users.loading ? null :
            users.error ? 
              <Button variant="text" onClick={close}>
                {t("cancel")}
              </Button>
            : (
              <>
                <Button variant="text" onClick={close}>
                  {t("cancel")}
                </Button>
                <Button form={FORM_ID} type="submit">
                  {t("save")}
                </Button>
              </>
            )
          }
        </Modal.Buttons>
      </Modal>
    )


  }


}


AddGroup.propTypes = {
  close: PropTypes.func.isRequired,
  // closing the window
}

const EMIT = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersList()),
  addGroup: payload => dispatch(addGroup(payload))
})

const READ = state => ({
  users: state.users
})


export default connect(READ, EMIT)(withTranslation()(AddGroup));
