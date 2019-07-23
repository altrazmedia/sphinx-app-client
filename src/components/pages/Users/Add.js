import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Input, Modal, ErrorMessage, Button, Select } from "components/common";
import { withTranslation } from "react-i18next";
import { addUser } from "actions/usersActions";

const FORM_ID = "new-user-form";

class AddUser extends PureComponent {
  state = {
    label: "",
    email: "",
    role: "student",
    password: "",
    passwordConfirm: "",
    errors: {}, // Errors messages to the inputs
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleRoleChange = role => {
    this.setState({ role });
  };

  /**
   * Validates the provided values before sending any requests to the server
   * @returns {Boolean} true => all fields have beeb filled correctly
   */
  validate = () => {
    const { label, email, password, passwordConfirm } = this.state;
    const { t } = this.props;
    const errors = {};

    if (password.length < 5) {
      // Password must be at least 5 chars long
      errors.password = t("password.chars");
    }

    if (passwordConfirm !== password) {
      errors.passwordConfirm = t("password.dontMatch");
    }

    if (!email || !isEmailValid(email)) {
      errors.email = t("email.provide");
    }

    if (label.length < 5) {
      // Label must be at least 5 chars long
      errors.label = t("label.chars");
    }

    this.setState({ errors });

    // returning the info if some errors occurred
    return Object.keys(errors).length === 0;
  };

  /** Sending the request to the server */
  addUser = () => {
    const { label, email, password, role } = this.state;
    const { t, close } = this.props;

    const onSuccess = () => {
      close();
      // TODO: displaying a Toast message
    };

    const onError = response => {
      if (response.status === 409) {
        // There already is a user with that email address
        this.setState({
          errors: {
            email: t("email.duplicate"),
          },
        });
      } else {
        this.setState({
          errorMsg: `${t("users.add.error")} (${response.status})`,
        });
      }
    };

    this.props.addUser({ label, email, password, role, onSuccess, onError });
  };

  /**
   * Form submittion
   */
  handleSubmit = e => {
    e.preventDefault();

    if (this.validate()) {
      this.addUser();
    }
  };

  render = () => {
    const {
      label,
      email,
      role,
      password,
      passwordConfirm,
      errors,
      errorMsg,
    } = this.state;
    const { t, close } = this.props;

    return (
      <Modal title={t("users.add")} close={close}>
        <Modal.Content>
          <form onSubmit={this.handleSubmit} id={FORM_ID}>
            <b>{t("users.label")}</b>
            <Input
              name="label"
              value={label}
              onChange={this.handleInputChange}
              error={errors.label}
              fullWidth
              required
            />
            <b>{t("users.email")}</b>
            <Input
              name="email"
              value={email}
              onChange={this.handleInputChange}
              type="email"
              error={errors.email}
              fullWidth
              required
            />
            <b>{t("users.role")}</b>
            <Select
              fullWidth
              value={role}
              onChange={this.handleRoleChange}
              options={[
                { value: "student", text: t("users.student") },
                { value: "teacher", text: t("users.teacher") },
                { value: "admin", text: t("users.admin") },
              ]}
            />
            <b>{t("users.password")}</b>
            <Input
              name="password"
              value={password}
              onChange={this.handleInputChange}
              type="password"
              error={errors.password}
              fullWidth
              required
            />
            <b>{t("users.passwordConfirm")}</b>
            <Input
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={this.handleInputChange}
              type="password"
              error={errors.passwordConfirm}
              fullWidth
              required
            />
            <ErrorMessage content={errorMsg} fullWidth />
          </form>
        </Modal.Content>
        <Modal.Buttons>
          <Button variant="text" onClick={close} type="button">
            {t("cancel")}
          </Button>
          <Button type="submit" form={FORM_ID}>
            {t("save")}
          </Button>
        </Modal.Buttons>
      </Modal>
    );
  };
}

AddUser.propTypes = {
  close: PropTypes.func.isRequired,
  // closing the window
};

const EMIT = dispatch => ({
  addUser: payload => dispatch(addUser(payload)),
});

export default connect(
  null,
  EMIT
)(withTranslation()(AddUser));

/**
 * Email address validation
 * @param {String} email Email address
 * @returns {Boolean} true -> email is valid
 */
const isEmailValid = email => {
  // eslint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
