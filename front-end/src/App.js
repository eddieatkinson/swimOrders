import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Review from './components/Review';
import Form from './containers/Form';
import GetPoolsAction from './redux/actions/GetPoolsAction';
import Navbar from './components/Navbar';
import PoolSwimmer from './containers/PoolSwimmer';
import Merchandise from './containers/Merchandise';
import Review from './containers/Review';


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
    review: false,
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
    // console.log(this.props.order);
    console.log(this.props.editForm);

    return (
      <div>
        <div className='top-fields-wrapper'>
          <div className='top-fields'>
            <Navbar />
            <PoolSwimmer />
          </div>
        </div>
        <div className='merchandise-wrapper wrapper'>
          {this.props.size[0] && !this.props.formComplete && <Merchandise />}
          {this.props.formComplete && <Review />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    size: state.data.size,
    formComplete: state.data.formComplete,
    order: state.data.order,
    editForm: state.data.editForm,
  }
}

export default connect(mapStateToProps, {
  GetPoolsAction,
})(App);
