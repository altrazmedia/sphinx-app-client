import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { Modal, Input, Button, ErrorMessage } from "components/common";
import { login } from "actions/currentUserActions";

import logo from "images/logo.png";

class Login extends PureComponent {
  state = {
    email: "",
    password: "",
    error: ""
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: "" })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { t } = this.props;

    const onError = (response) => {
      this.setState({
        error: response.status === 400 ? 
          t("login.wrongCredentials")
        : t("login.error")
      })
    }

    this.props.login({ email, password, onError })
  }


  render = () => {

    const { email, password, error } = this.state;
    const { t } = this.props;

    return (
      <Modal className="login-modal">
        <Modal.Content>
          <form onSubmit={this.handleSubmit}>
            <img src={logo} className="login-modal__logo" />
            <Input 
              fullWidth
              name="email"
              type="email"
              value={email}
              icon="envelope"
              onChange={this.handleChange}
              placeholder={t("users.email")}
            />  
            <Input 
              fullWidth
              name="password"
              type="password"
              value={password}
              icon="key"
              onChange={this.handleChange}
              placeholder={t("users.password")}
            />  
            <ErrorMessage fullWidth content={error} />
            <Button.Group align="center">
              <Button
                disabled={!email || !password}
                type="submit"
              >
                {t("login")}
              </Button>
            </Button.Group>
          </form>
        </Modal.Content>
      </Modal>
    )

  }

}

const EMIT = dispatch => ({
  login: payload => dispatch(login(payload))
})


export default connect(null, EMIT)(withTranslation()(Login));