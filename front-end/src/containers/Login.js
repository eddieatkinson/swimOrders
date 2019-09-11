import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginAction from '../redux/actions/LoginAction';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }
  handleChange(value, field) {
    this.setState({
      [field]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.LoginAction(this.state);
  }
  render() {
    console.log(this.props.message);
    return (
      <form>
        <input onChange={(e) => this.handleChange(e.target.value, 'email')} type='text' />
        <input onChange={(e) => this.handleChange(e.target.value, 'password')} type='text' />
        <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
      </form>
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
