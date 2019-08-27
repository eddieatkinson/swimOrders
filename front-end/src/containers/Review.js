import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forEach, map, find } from 'lodash';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import ReviewItem from '../components/ReviewItem';

import { emailCheck } from '../utilities';

import RestartFormAction from '../redux/actions/RestartFormAction';
import SubmitOrderAction from '../redux/actions/SubmitOrderAction';


class Review extends Component {
  state = {
    email: '',
    name: '',
    phone: '',
    submitDisabled: false,
  }
  getReviewItems() {
    const reviewItemsArray = [];
    forEach(this.props.order, (value, key) => {
      if (value.qty > 0) {
        const name = find(this.props.items, ['id', parseInt(key)]).item;
        const size = value.size && find(this.props.sizes, ['id', parseInt(value.size)]).name;
        reviewItemsArray.push(
          {id: key, order: value, name, size, special: value.special, color: value.color}
        );
      }
    });
    return reviewItemsArray;
  }
  handleChange(e, field) {
    const value = e.target.value;
    this.setState({
      [field]: value,
    });
  }
  handleRestart() {
    this.props.RestartFormAction();
  }
  getSwimmerName() {

  }
  async handleSubmit() {
    console.log(document.getElementById('exampleForm.ConrolInput4').checked);
    const noRefundCheckBox = document.getElementById('exampleForm.ConrolInput4').checked;
    const chargeAccountCheckBox = document.getElementById('exampleForm.ConrolInput5').checked;
    console.log(this.props.order);
    const order = this.getReviewItems();
    console.log(this.getReviewItems());
    const { email, name, phone } = this.state;
    const orderPacket = {
      ...this.state,
      swimmerId: this.props.swimmer.id,
      swimmerSize: this.props.size[0].name,
      swimmerName: this.props.swimmer.name,
      poolName: this.props.pool[0].name,
      groupName: this.props.swimmer.groupName,
      price: this.props.price,
      order,
    }
    if (name === '' || email === '' || phone === '') {
      alert('All fields must be filled.');
    } else if (!email.match(emailCheck)) {
      alert('Please enter a valid email address.');
    } else if (!noRefundCheckBox || !chargeAccountCheckBox) {
      alert('You must check the boxes.');
    } else {
      this.setState({
        submitDisabled: true,
      });
      // const response = await this.props.SubmitOrderAction(senderInfo, this.props.order);
      const response = await this.props.SubmitOrderAction(orderPacket);
      console.log(response);
      if (response.payload && response.payload.msg === 'orderSuccess') {
        alert('Your order has been placed!');
        document.location.reload(true); // reload page to start over
      } else {
        alert('An error has occurred.');
        this.setState({
          submitDisabled: false,
        });
      }
    }
  }
  render() {
    console.log(this.props.order);
    const reviewItemsArray = this.getReviewItems();
    return (
      <div>
        <div>
          {map(reviewItemsArray, (item, i) => {
            return (
              <ReviewItem key={i} itemId={parseInt(item.id)} orderInfo={item.order} name={item.name} size={item.size} special={item.special} color={item.color} />
            )
          })}
        </div>
        <div className='price-review'>
          Total to be charged to account: {this.props.price}
        </div>
        <Form className='review-form'>
          <Form.Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e) => this.handleChange(e, 'email')} type="email" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Your Name</Form.Label>
                <Form.Control onChange={(e) => this.handleChange(e, 'name')} type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="exampleForm.ControlInput3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control onChange={(e) => this.handleChange(e, 'phone')} type="text" />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group controlId="exampleForm.ConrolInput4">
            <Form.Check
              required
              label="I understand that there are no returns, refunds, or exchanges."
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ConrolInput5">
            <Form.Check
              required
              label="I agree to have my account charged for today's purchases."
            />
          </Form.Group>
        </Form>
        <div className='submit-button'>
          <Button onClick={this.handleRestart.bind(this)} variant='outline-primary'>Start Over</Button>
          <Button disabled={this.state.submitDisabled} onClick={this.handleSubmit.bind(this)} type='submit'>{this.state.submitDisabled ? 'Submitting...' : 'Submit'}</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    swimmer: state.data.swimmer,
    order: state.data.order,
    sizes: state.data.sizes,
    size: state.data.size,
    items: state.data.items,
    pool: state.data.pool,
    group: state.data.group,
    price: state.data.price,
  }
}

export default connect(mapStateToProps, {
  RestartFormAction,
  SubmitOrderAction,
})(Review);
