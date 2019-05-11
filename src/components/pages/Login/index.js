import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Modal, Input, Button } from "components/common";
import { login } from "actions/currentUserActions";


class Login extends PureComponent {
  state = {
    email: "",
    password: "",
    errors: {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, errors: {} })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    const onError = (response) => {
      if (response.status === 400) {
        // Wrong credentials
        this.setState({
          errors: {
            password: true,
            email: "Niepoprawne dane logowania"
          }
        })
      }
      else {
        // Server connection error
        this.setState({
          errors: {
            password: true,
            email: "Wystąpił błąd w trakcie połączenia."
          }
        })
      }
    }

    this.props.login({ email, password, onError })
  }


  render = () => {

    const { email, password, errors } = this.state;

    return (
      <Modal>
        <Modal.Content>
          <form onSubmit={this.handleSubmit}>
          <Input 
            fullWidth
            name="email"
            type="email"
            value={email}
            icon="envelope"
            onChange={this.handleChange}
            error={errors.email}
          />  
          <Input 
            fullWidth
            name="password"
            type="password"
            value={password}
            icon="key"
            onChange={this.handleChange}
            error={errors.password}
          />  
          <Button.Group align="center">
            <Button
              disabled={!email || !password}
              type="submit"
            >
              Zaloguj
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


export default connect(null, EMIT)(Login);