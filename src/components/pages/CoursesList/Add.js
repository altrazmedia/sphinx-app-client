import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

import {
  Modal,
  ErrorMessage,
  Input,
  Select,
  Loader,
  Button,
} from "components/common";

import { fetchUsersList } from "actions/usersActions";
import { fetchSubjects } from "actions/subjectsActions";
import { fetchGroupsList } from "actions/groupsActions";
import { addCourse } from "actions/coursesActions";

const FORM_ID = "add-course-form";

class AddCourse extends PureComponent {
  state = {
    code: "", // Course code
    group: "", // Group code
    teacher: "", // teacher id
    subject: "", // Subject code,
    errors: {}, // inputs errors
    errorMsg: "", // additional error message
  };

  componentDidMount = () => {
    this.props.fetchUsers();
    this.props.fetchSubjects();
    this.props.fetchGroups();
  };

  handleCodeChange = e => {
    this.setState({
      code: e.target.value,
    });
  };

  handleDropdownChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  /**
   * Checking if all the fields are filled and setting the state.errorMsg
   * @returns {Boolean} true -> all fields are filled
   */
  validate = () => {
    let errorMsg = "";

    ["code", "group", "teacher", "subject"].forEach(field => {
      if (this.state[field].trim().length === 0) {
        errorMsg = this.props.t("course.fillFields");
      }
    });

    this.setState({ errorMsg });

    return errorMsg.length === 0;
  };

  /**
   * Sending the request to the server
   */
  addCourse = () => {
    const { code, subject, teacher, group } = this.state;
    const { t, close } = this.props;

    const onError = response => {
      if (response.status === 409) {
        // there is another course with that code
        this.setState({
          errors: {
            code: t("course.codeDuplicate"),
          },
        });
      } else {
        this.setState({ errorMsg: t("course.add.error") });
      }
    };

    const onSuccess = () => {
      // TODO: add a toast notification
      close();
    };

    this.props.addCourse({ code, subject, teacher, group, onSuccess, onError });
  };

  /**
   * Form submittion
   */
  handleSubmit = e => {
    e.preventDefault();
    if (this.validate()) {
      this.addCourse();
    }
  };

  render = () => {
    const { users, subjects, groups, close, t } = this.props;
    const { code, group, teacher, subject, errors, errorMsg } = this.state;

    const loading = users.loading || subjects.loading || groups.loading; // Some data is still loading
    const fetchError =
      Boolean(users.error) || Boolean(subjects.error) || Boolean(groups.error); // Errors occurred while downloading data

    return (
      <Modal title={t("course.add")} close={close}>
        <Modal.Content>
          {loading ? (
            <Loader />
          ) : fetchError ? (
            <ErrorMessage content={t("course.add.fetchError")} fullWidth />
          ) : (
            <form onSubmit={this.handleSubmit} id={FORM_ID}>
              <b>{t("course.code")}</b>
              <Input
                value={code}
                name="code"
                onChange={this.handleCodeChange}
                fullWidth
                error={errors.code}
                required
              />
              <b>{t("group")}</b>
              <Select
                value={group}
                onChange={this.handleDropdownChange("group")}
                fullWidth
                options={groups.data.map(group => ({
                  value: group.code,
                  text: group.name,
                }))}
              />
              <b>{t("users.teacher")}</b>
              <Select
                value={teacher}
                onChange={this.handleDropdownChange("teacher")}
                fullWidth
                options={users.data
                  .filter(user => user.role === "teacher")
                  .map(user => ({
                    value: user._id,
                    text: user.label,
                  }))}
              />
              <b>{t("subject")}</b>
              <Select
                value={subject}
                onChange={this.handleDropdownChange("subject")}
                fullWidth
                options={subjects.data.map(subject => ({
                  value: subject.code,
                  text: subject.name,
                }))}
              />
              {/* <div style={{ height: 80 }} /> */}
              <ErrorMessage content={errorMsg} fullWidth />
            </form>
          )}
        </Modal.Content>
        <Modal.Buttons>
          {loading ? null : fetchError ? (
            <Button variant="text" onClick={close}>
              {t("cancel")}
            </Button>
          ) : (
            <>
              <Button variant="text" onClick={close}>
                {t("cancel")}
              </Button>
              <Button type="submit" form={FORM_ID}>
                {t("save")}
              </Button>
            </>
          )}
        </Modal.Buttons>
      </Modal>
    );
  };
}

const EMIT = dispatch => ({
  fetchUsers: () => dispatch(fetchUsersList()),
  fetchSubjects: () => dispatch(fetchSubjects()),
  fetchGroups: () => dispatch(fetchGroupsList()),
  addCourse: payload => dispatch(addCourse(payload)),
});

const READ = state => ({
  users: state.users,
  subjects: state.subjects,
  groups: state.groups.list,
});

export default connect(
  READ,
  EMIT
)(withTranslation()(AddCourse));
