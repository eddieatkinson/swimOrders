import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Form from './containers/Form';
import GetPoolsAction from './redux/actions/GetPoolsAction';
import Navbar from './components/Navbar';
import PoolSwimmer from './containers/PoolSwimmer';
import Merchandise from './containers/Merchandise';
import Review from './containers/Review';

import { secretName } from './utilities';
import Login from './containers/Login';

import tooLateGif from './assets/tooLateGif.gif';

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
    keystrokes: '',
    showLogin: false,
  }

  detectKeys(event) {
    const newKeystrokes = this.state.keystrokes + event.key;
    this.setState({
      keystrokes: newKeystrokes,
    });
    const name = secretName;
    if (this.state.keystrokes.toLowerCase().includes(name)) {
      this.setState({
        keystrokes: '',
        showLogin: true,
      });
    }
  }

  // componentDidMount(){
  //   document.addEventListener("keydown", this.detectKeys.bind(this));
  // }

  // componentWillUnmount(){
  //   document.removeEventListener("keydown", this.detectKeys.bind(this));
  // }

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

  getMain() {
    const now = moment();
    const isAfterTime = now.isSameOrAfter('2019-09-07');
    let main;
    if (this.state.showLogin) {
      main = 
        <div>
          <div className='top-fields'>
            <Navbar />
          </div>
          <Login />
        </div>;
    } else if (isAfterTime) {
      main =
        <div>
          <div className='top-fields'>
            <Navbar />
          </div>
          <div>
            <img className='too-late' src={tooLateGif} alt='too late' />
          </div>
      </div>;
    } else {
      main = 
        <div>
          <div>
            <div className='top-fields'>
              <Navbar />
              <PoolSwimmer />
            </div>
          </div>
          <div className='merchandise-wrapper wrapper'>
            {this.props.size && this.props.size[0] && !this.props.formComplete && <Merchandise />}
            {this.props.formComplete && <Review />}
          </div>
        </div>;
    }

    return main;
  }

  render() {
    return (
      this.getMain()
    );
  }
}

const mapStateToProps = state => {
  return {
    size: state.data.size,
    formComplete: state.data.formComplete,
    order: state.data.order,
  }
}

export default connect(mapStateToProps, {
  GetPoolsAction,
})(App);
