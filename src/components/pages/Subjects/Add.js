import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Input, Modal, ErrorMessage, Button } from "components/common";
import {  withTranslation } from "react-i18next";
import { addSubject } from "actions/subjectsActions";

const FORM_ID = "new-subject-form";

/** Displays a modal with new subject form and sends the redux action to save it on the server */
class AddSubject extends PureComponent {

  state = {
    code: "",
    name: "",
    errors: {}, // inputs errors
    errorMsg: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.validate()) {
      this.saveSubject();
    }
  }

  /**
   * Checking if all the fields have been filled
   * Setting the state.errors object
   * @returns {Boolean} true => all the fields have been filled correctly
   */
  validate = () => {
    const { code, name } = this.state;
    const { t } = this.props;
    const errors = {};

    if (!code) {
      errors.code = t("emptyField");
    }

    if (!name) {
      errors.name = t("emptyField");
    }

    this.setState({ errors })

    if (Object.keys(errors).length > 0) {
      return false
    }
    return true

  }

  /**
   * Sends the subject data to the server
   */
  saveSubject = () => {

    const { name, code } = this.state;
    const { t } = this.props;

    const onError = (response) => {
      // Error occured while saving the subject
      if (response.status === 409 && response.data.duplicate.includes("code")) {
        // There already is another subject with that code
        this.setState({
          errors: { code: t("subjects.codeDuplicate") }
        })
      }
      else {
        this.setState({ errorMsg: `${t("operationError")} (${response.status})` })
      }
    }

    const onSuccess = () => {
      // TODO: Add Toast notification
      this.props.close(); // closing the window
    }

    this.props.addSubject({ code, name, onSuccess, onError })

  }

  render = () => {

    const { close, t } = this.props;
    const { code, name, errors, errorMsg } = this.state;

    return (
      <Modal 
        title={t("subjects.addLong")}
        close={close}
      >
        <Modal.Content>
          <form onSubmit={this.handleSubmit} id={FORM_ID}>
            <b>{t("subjects.code")}</b>
            <Input 
              name="code"
              value={code}
              onChange={this.handleChange}
              fullWidth
              required
              error={errors.code}
            />
            <b>{t("name")}</b>
            <Input 
              name="name"
              value={name}
              onChange={this.handleChange}
              fullWidth
              required
              error={errors.name}
            />
            <ErrorMessage fullWidth content={errorMsg} />
          </form>
        </Modal.Content>
        <Modal.Buttons>
          <Button type="submit" form={FORM_ID}>
            {t("save")}
          </Button>
        </Modal.Buttons>
      </Modal>
    )

  }

}

AddSubject.propTypes = {
  close: PropTypes.func.isRequired, 
  // closing the window
}

const EMIT = dispatch => ({
  addSubject: payload => dispatch(addSubject(payload))
})

export default connect(null, EMIT)(withTranslation()(AddSubject));