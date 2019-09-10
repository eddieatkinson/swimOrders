import React, { Component } from 'react';

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
  render() {
    console.log(this.state);
    return (
      <form>
        <input onChange={(e) => this.handleChange(e.target.value, 'email')} type='text' />
        <input onChange={(e) => this.handleChange(e.target.value, 'password')} type='text' />
        <button>Submit</button>
      </form>
    );
  }
}

export default Login;
