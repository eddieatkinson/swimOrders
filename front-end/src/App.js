import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Button from 'react-bootstrap/Button';

import Form from './containers/Form';
import GetPoolsAction from './redux/actions/GetPoolsAction';
import LogoutAction from './redux/actions/LogoutAction';
import Navbar from './components/Navbar';
import PoolSwimmer from './containers/PoolSwimmer';
import Merchandise from './containers/Merchandise';
import Review from './containers/Review';
import Orders from './containers/Orders';
import JumpStretchCaps from './containers/JumpStretchCaps';
import Login from './containers/Login';

import { secretName, signInSuccess, closingDate, secretOpen } from './utilities';

import tooLateGif from './assets/tooLateGif.gif';
import tooBadGif from './assets/tooBadGif.gif';
import OrdersPDF from './components/OrdersPDF';

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
    overrideClosed: false,
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
    } else if (this.state.keystrokes.toLowerCase().includes(secretOpen)) {
      this.setState({
        keystrokes: '',
        overrideClosed: true,
      });
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.detectKeys.bind(this));
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.detectKeys.bind(this));
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

  handleLogout() {
    this.props.LogoutAction();
    this.setState({
      showLogin: false,
    });
  }

  getMain() {
    const now = moment();
    const isAfterTime = now.isSameOrAfter(closingDate);
    let main;
    if (this.props.message === signInSuccess) {
    // if (1) {
      main =
        <div>
          {/* <JumpStretchCaps itemId={19} />
          <JumpStretchCaps itemId={20} />
          <JumpStretchCaps itemId={15} /> */}
          <Orders />
          <div className='submit-button'>
            <Button variant='danger' onClick={this.handleLogout.bind(this)}>Logout</Button>
          </div>
        </div>
    } else if (this.state.showLogin) {
      main = 
        <div>
          <Login />
        </div>;
    } else if (isAfterTime && !this.state.overrideClosed) {
      main =
        <div>
          <div>
            <img className='too-late' src={tooLateGif} alt='too late' />
          </div>
      </div>;
    } else {
      main = 
        <div>
          <div className='merchandise-wrapper wrapper'>
            {this.props.size && this.props.size[0] && !this.props.formComplete && <Merchandise />}
            {this.props.formComplete && <Review />}
          </div>
        </div>;
    }

    return main;
  }

  render() {
    const now = moment();
    const isAfterTime = now.isSameOrAfter(closingDate);
    return (
      <div>
        <div className='top-fields'>
          <Navbar />
          {(!isAfterTime || this.state.overrideClosed) && !this.props.isLoggedIn && !this.state.showLogin && <PoolSwimmer />}
        </div>
        {this.getMain()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    size: state.data.size,
    formComplete: state.data.formComplete,
    order: state.data.order,
    message: state.auth.message,
  }
}

export default connect(mapStateToProps, {
  GetPoolsAction,
  LogoutAction,
})(App);
