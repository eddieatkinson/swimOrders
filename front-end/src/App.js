import React, { Component } from 'react';
import { connect } from 'react-redux';
import Review from './components/Review';
import Form from './containers/Form';
import GetPoolsAction from './redux/actions/GetPoolsAction';
import Navbar from './components/Navbar';
import PoolSwimmer from './containers/PoolSwimmer';


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
    await this.props.GetPoolsAction(this.state);
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
        <div className='top-fields-wrapper'>
          <div className='top-fields'>
            <Navbar />
            <PoolSwimmer />
          </div>
        </div>
        {/* {this.getScreen()} */}
      </div>
    );
  }
}

export default connect(null, {
  GetPoolsAction,
})(App);
