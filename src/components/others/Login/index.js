import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import { Input, Button, ErrorMessage, Icon } from "components/common";

import { login } from "actions/currentUserActions";

import logo from "images/logo.png";
import { ReactComponent as image } from "images/interface.svg";

class Login extends PureComponent {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { t } = this.props;

    const onError = response => {
      this.setState({
        error:
          response.status === 400
            ? t("login.wrongCredentials")
            : t("login.error"),
      });
    };

    this.props.login({ email, password, onError });
  };

  render = () => {
    const { email, password, error } = this.state;
    const { t, sessionExpired } = this.props;

    return (
      <div className="login">
        <div className="login__window">
          <div className="login__image-wrapper">
            {React.createElement(image, { className: "login__image" })}
          </div>
          <div className="login__form-wrapper">
            <form onSubmit={this.handleSubmit} className="login__form">
              <img src={logo} alt="SphinxApp" className="login__logo" />
              {sessionExpired && (
                <p className="login__session-expired">
                  <Icon name="exclamation-circle" size="small" color="error" />
                  {t("sessionExpired")}
                </p>
              )}
              <Input
                fullWidth
                name="email"
                type="email"
                value={email}
                icon="envelope"
                onChange={this.handleChange}
                placeholder={t("users.email")}
                required
              />
              <Input
                fullWidth
                name="password"
                type="password"
                value={password}
                icon="key"
                onChange={this.handleChange}
                placeholder={t("users.password")}
                required
              />
              <ErrorMessage fullWidth content={error} />
              <Button.Group align="center">
                <Button type="submit">{t("login")}</Button>
              </Button.Group>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

const READ = state => ({
  sessionExpired: state.currentUser.sessionExpired,
});

const EMIT = dispatch => ({
  login: payload => dispatch(login(payload)),
});

export default connect(
  READ,
  EMIT
)(withTranslation()(Login));
