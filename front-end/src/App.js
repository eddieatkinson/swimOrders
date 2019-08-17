import React, { Component } from 'react';
import Review from './screens/Review';
import Form from './screens/Form';
import axios from 'axios';

class App extends Component {
  state = {
    name: '',
    email: '',
    pool: '',
    swimmer: '',
    size: '',
    signature: '',
    agreeToTerms: '',
    next: false,
    submitted: false,
  }

  getScreen() {
    const screen = this.state.next ? <Review handleSubmit={this.handleSubmit.bind(this)} /> : <Form handleReview={this.handleReview.bind(this)} />;
    return screen;
  }

  handleReview() {
    this.setState({
      next: true,
    });
  }

  async handleSubmit() {
    const url = `${window.apiHost}/getpools`;
    await axios({
      url,
      method: 'POST',
      data: this.state,
    })
    .catch((error) => {
      alert(error);
    });
    this.setState({
      name: '',
      email: '',
      pool: '',
      swimmer: '',
      size: '',
      signature: '',
      agreeToTerms: '',
      next: false,
      submitted: false,
    });
  }

  render() {
    return (
      <div>
        {this.getScreen()}
      </div>
    );
  }
}

export default App;
