import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaRegUser } from 'react-icons/fa';

import LoginAction from '../redux/actions/LoginAction';
import { emailCheck, badLogin, badPassword } from '../utilities';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  }
  handleChange(value, field) {
    field === 'email' && 
    this.setState({
      isDisabled: !value.match(emailCheck),
    });
    this.setState({
      [field]: value,
    });
  }
  async handleSubmit() {
    const submit = await this.props.LoginAction(this.state);
    if (submit.payload === badLogin) {
      alert('Your email is incorrect.');
    } else if (submit.payload === badPassword) {
      alert('Your password is incorrect.');
    }
  }
  render() {
    return (
      <div className='login-form'>
        <div className='login-icon'>
          <FaRegUser
            size={'30px'}
            color={'#000000aa'}
          />
        </div>
        <Form>
          <Form.Row>
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={(e) => this.handleChange(e.target.value, 'email')} type="text" placeholder="email@example.com" />
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={(e) => this.handleChange(e.target.value, 'password')} type="password" placeholder="Password" />
            </Col>
          </Form.Row>
          <div className='submit-button'>
            <Button disabled={this.state.isDisabled} onClick={(e) => this.handleSubmit(e)}>Login</Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.auth.message,
  }
}

export default connect(mapStateToProps, {
  LoginAction,
})(Login);
